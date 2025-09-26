// Cloudflare Pages Function for getting available time slots

// D1 Database types
declare global {
  interface D1Database {
    prepare: (query: string) => D1PreparedStatement;
    exec: (query: string) => Promise<D1ExecResult>;
  }
  
  interface D1PreparedStatement {
    bind: (...values: any[]) => D1PreparedStatement;
    first: <T = any>(colName?: string) => Promise<T | null>;
    run: () => Promise<D1Result>;
    all: <T = any>() => Promise<D1Result<T>>;
  }
  
  interface D1Result<T = any> {
    results: T[];
    success: boolean;
    error?: string;
    meta: any;
  }
}

interface Env {
  DB: D1Database;
}

const TIME_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

export async function onRequestGet({ request, env }: { request: Request; env: Env }) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    if (!date) {
      return new Response(JSON.stringify({ error: 'Date parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get booked slots for the date
    const bookedSlots = await env.DB
      .prepare('SELECT time_slot FROM meetings WHERE date = ? AND status = ?')
      .bind(date, 'scheduled')
      .all<{ time_slot: string }>();

    const bookedTimes = bookedSlots.results.map(slot => slot.time_slot);

    // Return all slots with availability status
    const timeSlots = TIME_SLOTS.map(timeSlot => ({
      time_slot: timeSlot,
      is_booked: bookedTimes.includes(timeSlot)
    }));

    return new Response(JSON.stringify(timeSlots), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error getting time slots:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to get time slots' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}