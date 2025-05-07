import { NextResponse } from 'next/server';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ticket-website-backend-production.up.railway.app';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received booking request:', body);

    // Validate required fields
    if (!body.seatId || !body.tripId || !body.passengerName || !body.passengerPhone || !body.passengerEmail) {
      return NextResponse.json(
        { 
          result: "error",
          error: "Vui lòng điền đầy đủ thông tin đặt vé"
        },
        { status: 400 }
      );
    }

    // Format the request body according to the backend API requirements
    const bookingRequest = {
      seatId: Number(body.seatId),
      tripId: Number(body.tripId),
      passengerName: body.passengerName,
      passengerPhone: body.passengerPhone,
      passengerEmail: body.passengerEmail
    };

    console.log('Sending booking request to backend:', bookingRequest);

    const response = await fetch(`${backendUrl}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingRequest)
    });

    const data = await response.json();
    console.log('Backend booking response:', data);

    if (!response.ok) {
      // Check if the error is about seat availability
      if (data.error && data.error.includes('đã được đặt')) {
        return NextResponse.json(
          { 
            result: "seat_not_available",
            error: data.error
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { 
          result: "error",
          error: data.error || 'Không thể đặt vé. Vui lòng thử lại sau.'
        },
        { status: response.status }
      );
    }

    return NextResponse.json({ 
      result: "ok", 
      booking: data,
      message: "Đặt vé thành công"
    });
  } catch (error) {
    console.error('Error booking ticket:', error);
    return NextResponse.json(
      { 
        result: "error",
        error: 'Không thể kết nối với máy chủ. Vui lòng thử lại sau.'
      },
      { status: 500 }
    );
  }
} 