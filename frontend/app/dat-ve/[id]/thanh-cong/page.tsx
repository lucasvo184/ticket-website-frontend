"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { CheckCircle, Download, Share2 } from "lucide-react"
import type { Ticket } from "@/app/api/tickets/book/route"
import type { Payment } from "@/app/api/payments/prepare/route"

interface SuccessProps {
  params: {
    tripId: string
  }
}

export default function SuccessPage({ params }: SuccessProps) {
  const router = useRouter()
  const { tripId } = params
  const [ticketInfo, setTicketInfo] = useState<Ticket | null>(null)
  const [paymentInfo, setPaymentInfo] = useState<Payment | null>(null)
  const [passengerInfo, setPassengerInfo] = useState<{
    name: string
    phone: string
    email: string
  } | null>(null)
  const [pickupLocation, setPickupLocation] = useState<string>("AN KHÊ - GIA LAI")
  const [dropoffLocation, setDropoffLocation] = useState<string>("BX Miền Tây")

  // Generate a random ticket number if not available from API
  const ticketNumber =
    ticketInfo?.bookingCode ||
    `FT${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`

  // Mock trip data
  const tripData = {
    id: tripId,
    route: "An Khê - Miền Tây",
    departureTime: "15:30 03/04/2025",
    arrivalTime: "04:30 04/04/2025",
    price: "290.000đ",
    busType: "Limousine",
    seat: ticketInfo?.seat?.seatNumber || "B11",
  }

  useEffect(() => {
    // Load data from session storage
    const storedTicketInfo = sessionStorage.getItem("ticketInfo")
    const storedPaymentInfo = sessionStorage.getItem("paymentInfo")
    const storedPassengerInfo = sessionStorage.getItem("passengerInfo")
    const storedPickupLocation = sessionStorage.getItem("pickupLocation")
    const storedDropoffLocation = sessionStorage.getItem("dropoffLocation")

    if (storedTicketInfo) {
      setTicketInfo(JSON.parse(storedTicketInfo))
    }

    if (storedPaymentInfo) {
      setPaymentInfo(JSON.parse(storedPaymentInfo))
    }

    if (storedPassengerInfo) {
      setPassengerInfo(JSON.parse(storedPassengerInfo))
    }

    if (storedPickupLocation) {
      setPickupLocation(storedPickupLocation)
    }

    if (storedDropoffLocation) {
      setDropoffLocation(storedDropoffLocation)
    }
  }, [])

  const handleDownload = () => {
    alert("Tính năng tải vé đang được phát triển")
  }

  const handleShare = () => {
    alert("Tính năng chia sẻ vé đang được phát triển")
  }

  const handleBackToHome = () => {
    // Clear session storage
    sessionStorage.removeItem("ticketInfo")
    sessionStorage.removeItem("paymentInfo")
    sessionStorage.removeItem("passengerInfo")
    sessionStorage.removeItem("selectedSeat")
    sessionStorage.removeItem("pickupLocation")
    sessionStorage.removeItem("dropoffLocation")

    router.push("/")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-2" />
              <h1 className="text-2xl font-bold text-green-600">Đặt vé thành công!</h1>
              <p className="text-gray-600">Thông tin vé đã được gửi đến email {passengerInfo?.email || "của bạn"}</p>
            </div>

            <Card className="p-6 mb-6">
              <div className="border-b pb-4 mb-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Mã vé: {ticketNumber}</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-1" />
                      Tải về
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-1" />
                      Chia sẻ
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-500">Thông tin hành trình</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Tuyến xe</p>
                      <p className="font-medium">{tripData.route}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Loại xe</p>
                      <p className="font-medium">{tripData.busType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Thời gian đi</p>
                      <p className="font-medium">{tripData.departureTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Thời gian đến (dự kiến)</p>
                      <p className="font-medium">{tripData.arrivalTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Số ghế</p>
                      <p className="font-medium">{tripData.seat}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Giá vé</p>
                      <p className="font-medium text-futa-orange">{tripData.price}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-500">Thông tin hành khách</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Họ và tên</p>
                      <p className="font-medium">{passengerInfo?.name || "Đặng Khoa"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Số điện thoại</p>
                      <p className="font-medium">{passengerInfo?.phone || "0773914830"}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{passengerInfo?.email || "donguyendangkhoa0403@gmail.com"}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-500">Thông tin đón trả</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Điểm đón</p>
                      <p className="font-medium">{pickupLocation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Điểm trả</p>
                      <p className="font-medium">{dropoffLocation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
              <h3 className="font-medium text-yellow-800 mb-2">Lưu ý quan trọng</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-yellow-700">
                <li>Quý khách vui lòng có mặt tại bến xuất phát trước ít nhất 30 phút giờ xe khởi hành</li>
                <li>Mang theo thông báo đã thanh toán vé thành công có chứa mã vé</li>
                <li>Nếu cần hỗ trợ, vui lòng liên hệ tổng đài 1900 6067</li>
              </ul>
            </div>

            <div className="text-center">
              <Button className="bg-futa-orange hover:bg-futa-orange/90" onClick={handleBackToHome}>
                Về trang chủ
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

