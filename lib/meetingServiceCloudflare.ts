import { format } from 'date-fns'
import type { MeetingData } from '@/types';

export type TimeSlotStatus = { time_slot: string; is_booked: boolean }

export async function scheduleMeeting(data: MeetingData) {
  try {
    const response = await fetch('/api/schedule', {
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
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to schedule meeting');
    }

    const result = await response.json();
    return { success: true, meeting: result, email: { ok: true } };
  } catch (error) {
    console.error('Error scheduling meeting:', error);
    throw error;
  }
}

export async function getBookedTimeSlots(date: Date) {
  try {
    const dateStr = format(date, 'yyyy-MM-dd');
    const response = await fetch(`/api/timeslots?date=${dateStr}`);
    
    if (!response.ok) {
      console.error('Failed to fetch booked slots');
      return [];
    }

    const timeSlots = await response.json() as TimeSlotStatus[];
    return timeSlots
      .filter(slot => slot.is_booked)
      .map(slot => ({ time_slot: slot.time_slot, date: dateStr }));
  } catch (error) {
    console.error('Error getting booked time slots:', error);
    return [];
  }
}

export async function getTimeSlots(date: Date): Promise<TimeSlotStatus[]> {
  try {
    const dateStr = format(date, 'yyyy-MM-dd');
    const response = await fetch(`/api/timeslots?date=${dateStr}`);
    
    if (!response.ok) {
      console.error('Failed to fetch time slots');
      // Return default slots as fallback
      const TIME_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
      return TIME_SLOTS.map(timeSlot => ({
        time_slot: timeSlot,
        is_booked: false
      }));
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting time slots:', error);
    // Return default slots as fallback
    const TIME_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
    return TIME_SLOTS.map(timeSlot => ({
      time_slot: timeSlot,
      is_booked: false
    }));
  }
}