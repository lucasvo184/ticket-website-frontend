import type { PreparePaymentRequest, Payment, ApiResponse as PaymentResponse } from "@/app/api/payments/prepare/route"
import type { BookTicketRequest, Ticket } from "@/app/api/tickets/book/route"

export type ApiResponse<T> = {
  result: "success" | "error";
  error?: string;
} & (
  | { result: "success"; payment: Payment }
  | { result: "success"; booking: Ticket }
  | { result: "error"; error: string }
);

export async function preparePayment(request: PreparePaymentRequest): Promise<ApiResponse<Payment>> {
  const response = await fetch("/api/payments/prepare", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    return {
      result: "error",
      error: "Failed to prepare payment"
    }
  }

  const data = await response.json()
  return {
    result: "success",
    payment: data
  }
}

export async function bookTicket(request: BookTicketRequest): Promise<ApiResponse<Ticket>> {
  const response = await fetch("/api/tickets/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    return {
      result: "error",
      error: "Failed to book ticket"
    }
  }

  const data = await response.json()
  return {
    result: "success",
    booking: data
  }
}

// ... rest of the file ... 