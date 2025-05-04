import { NextResponse } from "next/server"

// Define Trip interface based on the database schema
export interface Trip {
  id: number
  arrival_time: string
  available_seats: number
  bus_type: string
  departure_time: string
  destination: string
  origin: string
  price: number
  trip_id: string
  bus_id: number
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'

export async function GET() {
  try {
    const response = await fetch(`${backendUrl}/api/trips`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch trips')
    }

    const trips: Trip[] = await response.json()
    return NextResponse.json(trips)
  } catch (error) {
    console.error('Error fetching trips:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trips' },
      { status: 500 }
    )
  }
}

