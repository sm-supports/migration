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

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email, // Send the confirmation to the user who booked the meeting
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

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error handling schedule request:', error);
    return new Response('Error processing request', { status: 500 });
  }
}