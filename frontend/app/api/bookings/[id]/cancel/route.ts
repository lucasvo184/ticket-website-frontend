import { NextRequest, NextResponse } from "next/server"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://ticket-website-backend-production.up.railway.app"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("Cancelling booking with ID:", params.id)
    
    const url = `${backendUrl}/api/bookings/${params.id}/cancel`
    console.log("Backend URL:", url)
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    
    console.log("Response status:", response.status)
    
    const responseText = await response.text()
    console.log("Raw response:", responseText)
    
    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.error("Failed to parse JSON response:", e)
      throw new Error("Invalid JSON response from backend")
    }
    
    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to cancel booking",
          details: data?.message || data?.error || "Unknown error",
        },
        {
          status: response.status,
        }
      )
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error cancelling booking:", error)
    return NextResponse.json(
      {
        error: "Failed to cancel booking",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    )
  }
} 