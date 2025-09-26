import { dbClient } from './database'
import { format } from 'date-fns'
import type { MeetingData } from '@/types';

// Meeting record interface for D1
export interface MeetingRecord {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string;
  date: string; // YYYY-MM-DD
  time_slot: string; // HH:MM
  status: string;
  timezone: string | null;
  created_at: string;
}

async function checkAvailability(date: Date, timeSlot: string) {
  try {
    const db = dbClient.getDatabase();
    if (!db) {
      console.warn('Database not available; proceeding optimistically');
      return;
    }

    const dateStr = format(date, 'yyyy-MM-dd');
    const result = await db
      .prepare('SELECT id FROM meetings WHERE date = ? AND time_slot = ? AND status = ? LIMIT 1')
      .bind(dateStr, timeSlot, 'scheduled')
      .first();

    if (result) {
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
  return {
    name: data.name,
    email: data.email,
    company: data.company || null,
    message: data.message,
    date: format(data.date, 'yyyy-MM-dd'),
    time_slot: data.timeSlot,
    status: 'scheduled',
    timezone: data.timezone || null,
    created_at: new Date().toISOString(),
  };
}

async function insertMeeting(payload: any): Promise<MeetingRecord> {
  const db = dbClient.getDatabase();
  if (!db) {
    throw new Error('Database not available. Please check your configuration.');
  }

  try {
    const result = await db
      .prepare(`
        INSERT INTO meetings (name, email, company, message, date, time_slot, status, timezone, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        payload.name,
        payload.email,
        payload.company,
        payload.message,
        payload.date,
        payload.time_slot,
        payload.status,
        payload.timezone,
        payload.created_at
      )
      .run();

    if (!result.success) {
      throw new Error(`Failed to insert meeting: ${result.error}`);
    }

    // Get the inserted record
    const insertedRecord = await db
      .prepare('SELECT * FROM meetings WHERE id = ?')
      .bind(result.meta.last_row_id)
      .first<MeetingRecord>();

    if (!insertedRecord) {
      throw new Error('Failed to retrieve inserted meeting');
    }

    return insertedRecord;
  } catch (error) {
    console.error('D1 insert error when scheduling meeting:', error);
    throw error;
  }
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
  const dateStr = format(date, 'yyyy-MM-dd');
  try {
    const db = dbClient.getDatabase();
    if (!db) {
      console.warn('Database not available; returning empty slots');
      return [];
    }

    const result = await db
      .prepare('SELECT time_slot, date FROM meetings WHERE date = ? AND status = ?')
      .bind(dateStr, 'scheduled')
      .all<{ time_slot: string; date: string }>();

    return result.results || [];
  } catch (error) {
    console.error('Error getting booked time slots:', error);
    return [];
  }
}

export type TimeSlotStatus = { time_slot: string; is_booked: boolean }

// Available time slots
const TIME_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

export async function getTimeSlots(date: Date): Promise<TimeSlotStatus[]> {
  try {
    const bookedSlots = await getBookedTimeSlots(date);
    const bookedTimes = bookedSlots.map(slot => slot.time_slot);

    return TIME_SLOTS.map(timeSlot => ({
      time_slot: timeSlot,
      is_booked: bookedTimes.includes(timeSlot)
    }));
  } catch (error) {
    console.error('Error getting time slots:', error);
    // Return all slots as available on error
    return TIME_SLOTS.map(timeSlot => ({
      time_slot: timeSlot,
      is_booked: false
    }));
  }
}