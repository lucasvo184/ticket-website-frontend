import { NextResponse } from 'next/server';
import { fetchApi } from '@/lib/api';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Creating booking:', body);

    const data = await fetchApi('/bookings/create', {
      method: 'POST',
      body: JSON.stringify({
        seatId: body.seatId,
        tripId: body.tripId,
        passengerName: body.passengerName,
        passengerPhone: body.passengerPhone,
        passengerEmail: body.passengerEmail
      })
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create booking' },
      { status: 500 }
    );
  }
} 