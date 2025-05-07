import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tripId, seatId, userId, amount } = body;

    // Gọi API backend để cập nhật trạng thái
    const response = await fetch('https://ticket-website-backend-production.up.railway.app/api/payment/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tripId,
        seatId,
        userId,
        amount,
        status: 'SUCCEEDED'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to complete payment');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error completing payment:', error);
    return NextResponse.json(
      { error: 'Failed to complete payment' },
      { status: 500 }
    );
  }
} 