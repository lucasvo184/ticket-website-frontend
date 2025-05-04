import { NextResponse } from "next/server"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const seatId = params.id;
    console.log('Checking seat availability:', seatId);

    // Get seat status from backend
    const response = await fetch(`${backendUrl}/api/seats/check/${seatId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Disable caching to always get fresh data
    });

    const data = await response.json();
    console.log('Backend seat check response:', data);

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to check seat' },
        { status: response.status }
      );
    }

    // Return the seat availability status and details
    return NextResponse.json({
      available: data.available,
      status: data.seat?.status || 'BOOKED', // Default to BOOKED if status is missing
      seat: data.seat
    });
  } catch (error) {
    console.error('Seat check error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to check seat' },
      { status: 500 }
    );
  }
} 