import { supabase } from './supabase'
import { addDays, startOfDay, endOfDay, format } from 'date-fns'

import type { MeetingData } from '@/types';

async function checkAvailability(date: Date, timeSlot: string) {
  try {
    if (!supabase) {
      console.warn('Supabase not available; proceeding optimistically');
      return;
    }
    
    const { data, error } = await supabase
      .from('meetings')
      .select('id')
      .eq('date', format(date, 'yyyy-MM-dd'))
      .eq('time_slot', timeSlot)
      .limit(1);

    if (error) {
      console.warn('Availability check failed; proceeding optimistically:', error);
      return;
    }

    if (data && data.length > 0) {
      throw new Error('This time slot is already booked');
    }
  } catch (err) {
    if (err instanceof Error && err.message.includes('already booked')) {
      throw err;
    }
    console.warn('Availability check threw; proceeding optimistically:', err);
  }
}

function createMeetingPayload(data: MeetingData) {
  const payload: any = {
    name: data.name,
    email: data.email,
    company: data.company,
    message: data.message,
    date: format(data.date, 'yyyy-MM-dd'),
    time_slot: data.timeSlot,
    status: 'scheduled',
    created_at: new Date().toISOString(),
  };
  if (typeof data.timezone === 'string') {
    payload.timezone = data.timezone;
  }
  return payload;
}

async function insertMeeting(payload: any) {
  if (!supabase) {
    throw new Error('Database not available. Please check your configuration.');
  }
  
  const { data, error } = await supabase.from('meetings').insert([payload]).select().single();

  if (error) {
    const msg = String(error?.message || '');
    if (/Could find the|Could not find the|timezone/.test(msg) || error?.code === 'PGRST204') {
      console.warn('Supabase insert failed due to schema mismatch; retrying without optional fields', error);
      const minimal = { ...payload };
      delete minimal.timezone;
      const retry = await supabase.from('meetings').insert([minimal]).select().single();
      if (retry.error) {
        handleInsertError(retry.error);
      }
      return retry.data;
    }
    handleInsertError(error);
  }

  return data;
}

function handleInsertError(error: any) {
  console.error('Supabase insert error when scheduling meeting:', error);
  const msg = String(error?.message || error);
  if (/Failed to fetch|TypeError: Failed to fetch|network/i.test(msg)) {
    throw new Error('Network error while scheduling. Please check your connection and try again.');
  }
  throw new Error('Failed to schedule meeting: ' + (error.message ?? String(error)));
}

async function sendEmailNotification(data: MeetingData) {
  try {
    const origin = (typeof window !== 'undefined' && window.location?.origin) ? window.location.origin : 'http://localhost:3000';
    const apiUrl = new URL('/api/schedule', origin).toString();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const apiRes = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        date: format(data.date, 'yyyy-MM-dd'),
        timeSlot: data.timeSlot,
        message: data.message,
        timezone: data.timezone ?? null,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    let emailResult: any = null;
    try {
      emailResult = await apiRes.json();
    } catch {
      emailResult = { ok: apiRes.ok };
    }

    return { ok: apiRes.ok, body: emailResult };
  } catch (err: any) {
    const isAbort = err && (err.name === 'AbortError' || String(err).includes('AbortError'));
    if (isAbort) {
      console.warn('Email API request timed out (15s) — emails may have been sent by the server.');
      return { ok: false, error: 'timeout' };
    }
    console.error('Failed to trigger email notifications:', err);
    return { ok: false, error: String(err) };
  }
}

export async function scheduleMeeting(data: MeetingData) {
  try {
    await checkAvailability(data.date, data.timeSlot);
    const payload = createMeetingPayload(data);
    const newMeeting = await insertMeeting(payload);
    const email = await sendEmailNotification(data);

    return { success: true, meeting: newMeeting, email };
  } catch (error) {
    console.error('Error scheduling meeting:', error);
    throw error;
  }
}

export async function getBookedTimeSlots(date: Date) {
  const ymd = format(date, 'yyyy-MM-dd')
  try {
    if (!supabase) {
      console.warn('Database not available; returning empty slots');
      return []
    }
    
    // First, try with a status filter (preferred schema)
    const withStatus = await supabase
      .from('meetings')
      .select('time_slot, date')
      .eq('date', ymd)
      .eq('status', 'scheduled')

    if (!withStatus.error) {
      return withStatus.data ?? []
    }

    // Fallback: try without the status column (in case schema lacks it)
    console.warn('getBookedTimeSlots: falling back to query without status filter due to error:', withStatus.error)
    const withoutStatus = await supabase
      .from('meetings')
      .select('time_slot, date')
      .eq('date', ymd)

    if (!withoutStatus.error) {
      return withoutStatus.data ?? []
    }

    console.error('getBookedTimeSlots: both queries failed', withoutStatus.error)
    return []
  } catch (error) {
    console.error('Error getting booked time slots:', error)
    return []
  }
}

export type TimeSlotStatus = { time_slot: string; is_booked: boolean }

/**
 * Fetch canonical time slots and whether each is booked for the provided date.
 * This calls the `get_time_slots` RPC created in Supabase which returns
 * (time_slot text, is_booked boolean).
 */
export async function getTimeSlots(date: Date) {
  try {
    if (!supabase) {
      console.warn('Database not available; returning empty time slots');
      return []
    }
    
    const ymd = format(date, 'yyyy-MM-dd')
    const { data, error } = await supabase.rpc('get_time_slots', { p_date: ymd })
    if (error) {
      console.error('Supabase RPC error get_time_slots:', error)
      throw new Error('Failed to fetch time slots: ' + (error.message ?? String(error)))
    }

    // data is expected to be [{ time_slot: string, is_booked: boolean }, ...]
    return (data ?? []) as TimeSlotStatus[]
  } catch (error) {
    console.error('Error getting time slots via RPC:', error)
    throw error
  }
}
