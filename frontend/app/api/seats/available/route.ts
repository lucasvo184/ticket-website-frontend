import { NextResponse } from "next/server"
import { fetchApi } from '@/lib/api'

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

export async function GET() {
  try {
    const seats = await fetchApi('/seats/available')
    return NextResponse.json(seats)
  } catch (error) {
    console.error("Error fetching available seats:", error)
    return NextResponse.json(
      { error: 'Failed to fetch available seats' },
      { status: 500 }
    )
  }
}

