import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://ipapi.co/json');
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return new Response('Error fetching IP data', { status: 500 });
  }
}
