"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight } from "lucide-react"
import Link from "next/link"
import { tripApi, Trip } from "@/services/api"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function SchedulePage() {
  const router = useRouter()
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTrips()
  }, [])

  const loadTrips = async () => {
    try {
      setLoading(true)
      const data = await tripApi.getTrips()
      setTrips(data)
    } catch (err) {
      console.error("Error loading trips:", err)
      setError("Không thể tải danh sách chuyến xe")
    } finally {
      setLoading(false)
    }
  }

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
            <p className="mt-4">Đang tải danh sách chuyến xe...</p>
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
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Nhập điểm đi" className="pl-10" />
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Nhập điểm đến" className="pl-10" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-5 bg-gray-100 p-4 text-sm font-medium border-b">
              <div>Tuyến xe</div>
              <div>Loại xe</div>
              <div>Thời gian di chuyển</div>
              <div>Thời gian khởi hành</div>
              <div>Giá vé</div>
            </div>

            <div className="divide-y">
              {trips.map((trip) => (
                <div key={trip.id} className="grid grid-cols-5 p-4 items-center text-sm hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-futa-orange">{trip.origin}</span>
                    <ArrowRight className="h-3 w-3 text-gray-400" />
                    <span className="font-medium">{trip.destination}</span>
                  </div>
                  <div>{trip.busType}</div>
                  <div>
                    {calculateDuration(trip.departureTime, trip.arrivalTime)}
                  </div>
                  <div>{formatDateTime(trip.departureTime)}</div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{trip.price.toLocaleString()}đ</span>
                    <Button
                      className="rounded-full bg-orange-100 hover:bg-orange-200 text-futa-orange text-xs px-4 py-1 h-auto"
                      asChild
                    >
                      <Link href={`/lich-trinh/${trip.tripId}`}>Chi tiết</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

