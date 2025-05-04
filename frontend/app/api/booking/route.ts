import { NextResponse } from "next/server"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Creating booking:', body)

    // Validate required fields
    if (!body.seatId || !body.tripId) {
      return NextResponse.json(
        { error: 'Missing required fields: seatId or tripId' },
        { status: 400 }
      )
    }

    if (!body.passengerName || !body.passengerPhone || !body.passengerEmail) {
      return NextResponse.json(
        { error: 'Missing required passenger information' },
        { status: 400 }
      )
    }

    const response = await fetch(`${backendUrl}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seatId: Number(body.seatId),
        tripId: Number(body.tripId),
        passengerName: body.passengerName,
        passengerPhone: body.passengerPhone,
        passengerEmail: body.passengerEmail
      })
    })

    const data = await response.json()
    console.log('Backend booking response:', {
      status: response.status,
      ok: response.ok,
      data: data
    })
    
    if (!response.ok) {
      // Return the actual error from the backend with its status code
      return NextResponse.json(
        { error: data.message || data.error || 'Failed to create booking' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Booking creation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create booking' },
      { status: 500 }
    )
  }
} 