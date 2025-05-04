"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface BookingInfo {
  bookingId: string
  tripId: string
  seatNumber: string
  passengerName: string
  price: number
  paymentMethod: string
}

export default function PaymentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null)

  useEffect(() => {
    // Get booking info from session storage
    const storedBooking = sessionStorage.getItem("currentBooking")
    if (!storedBooking) {
      setError("Không tìm thấy thông tin đặt vé")
      return
    }

    try {
      const parsedBooking = JSON.parse(storedBooking)
      if (parsedBooking.bookingId !== params.id) {
        setError("Thông tin đặt vé không hợp lệ")
        return
      }
      setBookingInfo(parsedBooking)
    } catch (err) {
      setError("Không thể đọc thông tin đặt vé")
    }
  }, [params.id])

  const handlePayment = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!bookingInfo) {
        throw new Error("Không tìm thấy thông tin đặt vé")
      }

      // Process payment directly
      const paymentResponse = await fetch(`/api/payment/process/${bookingInfo.bookingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: bookingInfo.price,
          paymentMethod: bookingInfo.paymentMethod || "TRANSFER"
        }),
      })

      const paymentData = await paymentResponse.json()

      if (!paymentResponse.ok) {
        throw new Error(paymentData.error || "Không thể xử lý thanh toán")
      }

      // Clear the current booking from session storage
      sessionStorage.removeItem("currentBooking")

      // Store completed booking info
      sessionStorage.setItem("lastBooking", JSON.stringify({
        ...bookingInfo,
        paymentId: paymentData.id,
        status: "COMPLETED"
      }))

      // Redirect to booking history
      router.push("/booking-history")
    } catch (error) {
      console.error("Payment error:", error)
      setError(error instanceof Error ? error.message : "Có lỗi xảy ra khi thanh toán")
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Lỗi</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    )
  }

  if (!bookingInfo) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-6">
          <div>Đang tải...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Mã đặt vé:</span>
              <span className="font-medium">{bookingInfo.bookingId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Số ghế:</span>
              <span className="font-medium">{bookingInfo.seatNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tên hành khách:</span>
              <span className="font-medium">{bookingInfo.passengerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Số tiền:</span>
              <span className="font-medium text-futa-orange">
                {new Intl.NumberFormat("vi-VN").format(bookingInfo.price)}đ
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Quay lại
            </Button>
            <Button
              onClick={handlePayment}
              disabled={loading}
              className="bg-futa-orange hover:bg-futa-orange/90"
            >
              {loading ? "Đang xử lý..." : "Xác nhận thanh toán"}
            </Button>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  )
} 