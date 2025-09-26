// Cloudflare Pages Function for meeting scheduling
// This replaces the Next.js API route and uses D1 database

// D1 Database types for Cloudflare
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
  
  interface D1ExecResult {
    count: number;
    duration: number;
  }
}

interface Env {
  DB: D1Database;
  ADMIN_EMAIL: string;
  EMAIL_AUTH_USER: string;
  EMAIL_AUTH_PASS: string;
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  try {
    const body = await request.json();
    const { name, email, date, timeSlot, message, timezone } = body;

    // Check if time slot is available
    const existingBooking = await env.DB
      .prepare('SELECT id FROM meetings WHERE date = ? AND time_slot = ? AND status = ? LIMIT 1')
      .bind(date, timeSlot, 'scheduled')
      .first();

    if (existingBooking) {
      return new Response(JSON.stringify({ error: 'This time slot is already booked' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert new meeting
    const result = await env.DB
      .prepare(`
        INSERT INTO meetings (name, email, company, message, date, time_slot, status, timezone, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        name,
        email,
        '', // company - empty for now
        message,
        date,
        timeSlot,
        'scheduled',
        timezone,
        new Date().toISOString()
      )
      .run();

    if (!result.success) {
      throw new Error(`Failed to schedule meeting: ${result.error}`);
    }

    // Send emails
    try {
      await sendEmails(env, { name, email, date, timeSlot, message, timezone });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the meeting creation if email fails
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Meeting scheduled successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error scheduling meeting:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to schedule meeting' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function sendEmails(env: Env, data: any) {
  // This is a simplified email implementation
  // In a real scenario, you'd integrate with an email service like SendGrid, Resend, etc.
  // For now, we'll just log the email details
  console.log('Email would be sent to:', data.email);
  console.log('Admin notification would be sent to:', env.ADMIN_EMAIL);
  
  // TODO: Implement actual email sending
  // You can integrate with services like:
  // - SendGrid
  // - Resend
  // - Mailgun
  // - etc.
}