"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Clock, MapPin, ArrowRight, Users } from "lucide-react"
import { Trip } from "@/services/api"
import { use } from "react"

interface Seat {
  id: number;
  seatNumber: string;
  status: string;
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function RouteDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tripDetails, setTripDetails] = useState<Trip | null>(null)
  const [seats, setSeats] = useState<Seat[]>([])

  useEffect(() => {
    const loadTripDetails = async () => {
      if (!resolvedParams?.id) return;
      
      try {
        setLoading(true)
        // Tải thông tin chuyến đi
        const tripResponse = await fetch(`/api/trips/${resolvedParams.id}`);
        if (!tripResponse.ok) {
          throw new Error('Failed to fetch trip details');
        }
        const tripData = await tripResponse.json();
        setTripDetails(tripData);

        // Tải thông tin ghế - sử dụng ID số từ response
        const seatsResponse = await fetch(`/api/trips/${tripData.id}/seats`);
        if (!seatsResponse.ok) {
          console.error('Failed to fetch seats:', await seatsResponse.text());
          throw new Error('Failed to fetch seats');
        }
        const seatsData = await seatsResponse.json();
        setSeats(seatsData);

        setError(null)
      } catch (err) {
        console.error("Error loading trip details:", err)
        setError("Không thể tải thông tin chuyến xe")
      } finally {
        setLoading(false)
      }
    }

    loadTripDetails()
  }, [resolvedParams?.id])

  const calculateDuration = (departure: string, arrival: string) => {
    const dep = new Date(departure);
    const arr = new Date(arrival);
    const diff = arr.getTime() - dep.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} giờ ${minutes} phút`;
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-futa-orange mx-auto"></div>
            <p className="mt-4">Đang tải thông tin chuyến xe...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !tripDetails) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="mt-2">{error || "Không tìm thấy tuyến đường này"}</p>
            <Button className="mt-4 bg-futa-orange hover:bg-futa-orange/90" onClick={() => router.push("/lich-trinh")}>
              Quay lại danh sách tuyến
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-5 bg-gray-100 p-4 text-sm font-medium border-b">
              <div>Tuyến xe</div>
              <div>Loại xe</div>
              <div>Thời gian di chuyển</div>
              <div>Thời gian khởi hành</div>
              <div>Giá vé</div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-5 items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-futa-orange">{tripDetails.origin}</span>
                  <ArrowRight className="h-3 w-3 text-gray-400" />
                  <span className="font-medium">{tripDetails.destination}</span>
                </div>
                <div>{tripDetails.busType}</div>
                <div>
                  {calculateDuration(tripDetails.departureTime, tripDetails.arrivalTime)}
                </div>
                <div>{formatDateTime(tripDetails.departureTime)}</div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{tripDetails.price.toLocaleString()}đ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium mb-4">Thông tin chi tiết</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Mã chuyến</p>
                  <p className="font-medium">{tripDetails.tripId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Thời gian khởi hành</p>
                  <p className="font-medium">{formatDateTime(tripDetails.departureTime)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Thời gian đến</p>
                  <p className="font-medium">{formatDateTime(tripDetails.arrivalTime)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Số xe</p>
                  <p className="font-medium">{tripDetails.bus?.busNumber || "Chưa có thông tin"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Loại xe</p>
                  <p className="font-medium">{tripDetails.busType}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium mb-4">Thông tin ghế</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Tổng số ghế</p>
                    <p className="font-medium">{seats.length} ghế</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Số ghế trống</p>
                    <p className="font-medium">{seats.filter(seat => seat.status === 'AVAILABLE').length} ghế</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Số ghế đã đặt</p>
                    <p className="font-medium">
                      {seats.filter(seat => seat.status !== 'AVAILABLE').length} ghế
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Danh sách ghế</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {seats.map((seat) => (
                      <div
                        key={seat.id}
                        className={`text-center p-2 rounded ${
                          seat.status === 'AVAILABLE'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {seat.seatNumber}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                className="w-full mt-6 bg-futa-orange hover:bg-futa-orange/90"
                onClick={() => router.push(`/dat-ve/${tripDetails.tripId}`)}
              >
                Đặt vé ngay
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

