import { NextResponse } from "next/server"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Creating ticket:', body)

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

    // Create ticket
    const response = await fetch(`${backendUrl}/api/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seatId: Number(body.seatId),
        tripId: Number(body.tripId),
        passengerName: body.passengerName,
        passengerPhone: body.passengerPhone,
        passengerEmail: body.passengerEmail,
        amount: Number(body.amount)
      })
    })

    const data = await response.json()
    console.log('Backend ticket response:', {
      status: response.status,
      ok: response.ok,
      data: data
    })
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || data.error || 'Failed to create ticket' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Ticket creation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create ticket' },
      { status: 500 }
    )
  }
} 