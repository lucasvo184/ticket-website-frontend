import { NextResponse } from "next/server"

export interface Seat {
  id: number
  seat_number: string
  status: "AVAILABLE" | "BOOKED"
  bus_id: number
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tripId = searchParams.get('tripId')

    if (!tripId) {
      return NextResponse.json(
        { error: 'Trip ID is required' },
        { status: 400 }
      )
    }

    const response = await fetch(`${backendUrl}/api/trips/${tripId}/seats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch seats')
    }

    const seats: Seat[] = await response.json()
    return NextResponse.json(seats)
  } catch (error) {
    console.error('Error fetching seats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch seats' },
      { status: 500 }
    )
  }
} 