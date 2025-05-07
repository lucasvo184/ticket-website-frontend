import { NextResponse } from "next/server"

export type PaymentMethod = "BY_CASH" | "TRANSFER"

export interface PreparePaymentRequest {
  bookingId: number
  amount: number
  paymentMethod: PaymentMethod
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ticket-website-backend-production.up.railway.app'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Payment preparation request:', body)

    // Validate required fields
    if (!body.bookingId || !body.amount || !body.paymentMethod) {
      return NextResponse.json(
        { error: 'Thiếu thông tin thanh toán' },
        { status: 400 }
      )
    }

    // Create payment record with appropriate status
    const paymentResponse = await fetch(`${backendUrl}/api/payments/create`, {
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

    if (!paymentResponse.ok) {
      const errorData = await paymentResponse.json()
      console.error('Payment creation failed:', errorData)
      return NextResponse.json(
        { error: errorData.error || 'Không thể tạo thanh toán' },
        { status: paymentResponse.status }
      )
    }

    const paymentData = await paymentResponse.json()
    console.log('Payment created:', paymentData)

    return NextResponse.json({ data: paymentData })
  } catch (error) {
    console.error('Error in payment preparation:', error)
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi chuẩn bị thanh toán' },
      { status: 500 }
    )
  }
}

