import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, date, timeSlot, message, timezone } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS
      }
    });

    // Send confirmation email to the user
    const userMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: `Meeting Confirmation: ${name}`,
      html: `
        <h1>Meeting Confirmed</h1>
        <p>Hi ${name},</p>
        <p>Your meeting has been successfully scheduled. Here are the details:</p>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${timeSlot}</li>
          <li><strong>Timezone:</strong> ${timezone || 'Not specified'}</li>
          <li><strong>Message:</strong> ${message || 'No message provided'}</li>
        </ul>
        <p>We look forward to speaking with you!</p>
      `
    };

    // Send notification email to admin
    const adminMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New Meeting Booking: ${name}`,
      html: `
        <h1>New Meeting Booking</h1>
        <p>A new meeting has been scheduled. Here are the details:</p>
        <ul>
          <li><strong>Client Name:</strong> ${name}</li>
          <li><strong>Client Email:</strong> ${email}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${timeSlot}</li>
          <li><strong>Timezone:</strong> ${timezone || 'Not specified'}</li>
          <li><strong>Message:</strong> ${message || 'No message provided'}</li>
        </ul>
        <p>Please make sure to prepare for this meeting accordingly.</p>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error handling schedule request:', error);
    return new Response('Error processing request', { status: 500 });
  }
}