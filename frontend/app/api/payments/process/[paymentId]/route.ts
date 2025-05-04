import { NextResponse } from "next/server"
import type { Payment } from "../../payments/prepare/route"

export async function POST(request: Request, { params }: { params: { paymentId: string } }) {
  try {
    const paymentId = params.paymentId

    // Call the Spring Boot API to process payment
    const response = await fetch(`http://localhost:8080/api/payments/process/${paymentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Error processing payment: ${response.statusText}`)
    }

    const payment: Payment = await response.json()
    return NextResponse.json(payment)
  } catch (error) {
    console.error("Error processing payment:", error)
    return NextResponse.json({ error: "Failed to process payment" }, { status: 500 })
  }
}

