import { NextResponse } from "next/server"

// Define types based on the Java models
export interface Seat {
  id: number
  seatNumber: string
  status: "AVAILABLE" | "BOOKED" | "RESERVED"
  bus?: {
    id: number
    busNumber: string
  }
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'

export async function GET() {
  try {
    // Call the Spring Boot API to get available seats
    const response = await fetch(`${backendUrl}/api/seats/available`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json(
        { error: error.message || 'Failed to fetch available seats' },
        { status: response.status }
      )
    }

    const seats: Seat[] = await response.json()
    return NextResponse.json(seats)
  } catch (error) {
    console.error("Error fetching available seats:", error)
    return NextResponse.json(
      { error: 'Failed to fetch available seats' },
      { status: 500 }
    )
  }
}

