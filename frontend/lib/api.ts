import type { Seat } from "@/app/api/seats/available/route"
import type { Ticket, BookTicketRequest } from "@/app/api/tickets/book/route"
import type { Payment, PreparePaymentRequest } from "@/app/api/payments/prepare/route"
import type { Trip } from "@/app/api/trips/route"

// Function to fetch available seats
export async function getAvailableSeats(): Promise<Seat[]> {
  const response = await fetch("/api/seats/available")
  if (!response.ok) {
    throw new Error("Failed to fetch available seats")
  }
  return response.json()
}

// Function to check seat availability
export async function checkSeatAvailability(seatId: number): Promise<boolean> {
  const response = await fetch(`/api/seats/check/${seatId}`)
  if (!response.ok) {
    throw new Error("Failed to check seat availability")
  }
  const data = await response.json()
  return data.available
}

// Function to book a ticket
export async function bookTicket(request: BookTicketRequest): Promise<Ticket> {
  const response = await fetch("/api/tickets/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error("Failed to book ticket")
  }

  return response.json()
}

// Function to prepare payment
export async function preparePayment(request: PreparePaymentRequest): Promise<Payment> {
  const response = await fetch("/api/payments/prepare", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error("Failed to prepare payment")
  }

  return response.json()
}

// Function to process payment
export async function processPayment(paymentId: number): Promise<Payment> {
  const response = await fetch(`/api/payments/process/${paymentId}`, {
    method: "POST",
  })

  if (!response.ok) {
    throw new Error("Failed to process payment")
  }

  return response.json()
}

// Function to fetch trips with optional filters
export async function getTrips(filters?: {
  origin?: string
  destination?: string
  date?: string
}): Promise<Trip[]> {
  let url = "/api/trips"

  if (filters) {
    const params = new URLSearchParams()
    if (filters.origin) params.append("origin", filters.origin)
    if (filters.destination) params.append("destination", filters.destination)
    if (filters.date) params.append("date", filters.date)

    if (params.toString()) {
      url += `?${params.toString()}`
    }
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch trips")
  }

  return response.json()
}

// Function to fetch a specific trip by ID
export async function getTripById(tripId: string): Promise<Trip> {
  const response = await fetch(`/api/trips/${tripId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch trip details")
  }

  return response.json()
}

