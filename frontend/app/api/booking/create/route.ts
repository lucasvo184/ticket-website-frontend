import { NextResponse } from 'next/server';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Creating booking:', body);

    const response = await fetch(`${backendUrl}/api/bookings/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seatId: body.seatId,
        tripId: body.tripId,
        passengerName: body.passengerName,
        passengerPhone: body.passengerPhone,
        passengerEmail: body.passengerEmail
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create booking');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create booking' },
      { status: 500 }
    );
  }
} 