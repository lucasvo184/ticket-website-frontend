import { NextResponse } from "next/server"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ticket-website-backend-production.up.railway.app'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Creating payment:', body)

    const response = await fetch(`${backendUrl}/api/payments/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookingId: body.bookingId,
        amount: body.amount,
        method: body.paymentMethod,
        status: body.paymentMethod === 'BY_CASH' ? 'WAITING_CASH' : 'WAITING_TRANSFER'
      })
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create payment')
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create payment' },
      { status: 500 }
    )
  }
} 