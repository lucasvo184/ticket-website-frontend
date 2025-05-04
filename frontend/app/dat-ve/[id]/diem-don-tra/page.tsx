"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface PickupDropoffProps {
  params: {
    tripId: string
  }
}

export default function PickupDropoffPage({ params }: PickupDropoffProps) {
  const router = useRouter()
  const { tripId } = params

  const [pickupType, setPickupType] = useState("station")
  const [dropoffType, setDropoffType] = useState("station")
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropoffLocation, setDropoffLocation] = useState("")
  const [passengerInfo, setPassengerInfo] = useState<{
    name: string
    phone: string
    email: string
  } | null>(null)
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Mock trip data
  const tripData = {
    id: tripId,
    route: "An Khê - Miền Tây",
    departureTime: "15:30 03/04/2025",
    price: "290.000đ",
    busType: "Limousine",
    seat: "B11",
  }

  // Load passenger info and selected seat from session storage
  useEffect(() => {
    const storedPassengerInfo = sessionStorage.getItem("passengerInfo")
    const storedSelectedSeat = sessionStorage.getItem("selectedSeat")

    if (storedPassengerInfo) {
      setPassengerInfo(JSON.parse(storedPassengerInfo))
    }

    if (storedSelectedSeat) {
      setSelectedSeat(storedSelectedSeat)
    }
  }, [])

  // Mock pickup locations
  const pickupLocations = [{ id: "ankhe1", name: "AN KHÊ - GIA LAI" }]

  const dropoffLocations = [{ id: "mientay1", name: "BX Miền Tây" }]

  const handleCancel = () => {
    router.back()
  }

  const handlePayment = () => {
    if (!pickupLocation) {
      setError("Vui lòng chọn điểm đón")
      return
    }

    if (!dropoffLocation) {
      setError("Vui lòng chọn điểm trả")
      return
    }

    // Store pickup and dropoff locations in session storage
    sessionStorage.setItem(
      "pickupLocation",
      pickupLocations.find((loc) => loc.id === pickupLocation)?.name || pickupLocation,
    )
    sessionStorage.setItem(
      "dropoffLocation",
      dropoffLocations.find((loc) => loc.id === dropoffLocation)?.name || dropoffLocation,
    )

    // Navigate to payment page
    router.push(`/dat-ve/${tripId}/thanh-toan`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-futa-orange py-4 text-white">
          <div className="container">
            <h1 className="text-2xl font-bold text-center">An Khê (Gia Lai) - TP.Hồ Chí Minh</h1>
            <p className="text-center text-sm">Thứ 5, 03/04</p>
          </div>
        </div>

        <div className="container py-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Lỗi</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="p-4">
                <h2 className="font-medium mb-4">Thông tin khách hàng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label>Họ và tên</Label>
                    <div className="mt-1 p-2 border rounded-md bg-gray-50">{passengerInfo?.name || "Đặng Khoa"}</div>
                  </div>
                  <div>
                    <Label>Số điện thoại</Label>
                    <div className="mt-1 p-2 border rounded-md bg-gray-50">{passengerInfo?.phone || "0773914830"}</div>
                  </div>
                  <div className="md:col-span-2">
                    <Label>Email</Label>
                    <div className="mt-1 p-2 border rounded-md bg-gray-50">
                      {passengerInfo?.email || "donguyendangkhoa0403@gmail.com"}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="font-medium mb-4">Thông tin đón trả</h2>

                  <div className="mb-6">
                    <h3 className="font-medium mb-2">BẾN XE/VP</h3>
                    <RadioGroup value={pickupType} onValueChange={setPickupType} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="station" id="station" />
                        <Label htmlFor="station">Bến xe/VP</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="transfer" id="transfer" />
                        <Label htmlFor="transfer">Trung chuyển</Label>
                      </div>
                    </RadioGroup>

                    <div className="mt-2">
                      <Select value={pickupLocation} onValueChange={setPickupLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn điểm đón" />
                        </SelectTrigger>
                        <SelectContent>
                          {pickupLocations.map((location) => (
                            <SelectItem key={location.id} value={location.id}>
                              {location.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="mt-4 p-3 bg-orange-50 text-sm border border-orange-200 rounded-md">
                      <p>Quý khách vui lòng có mặt tại Bến xe/Văn Phòng</p>
                      <p className="font-medium text-futa-orange">AN KHÊ - GIA LAI Trước 15:15 03/04/2025</p>
                      <p>để được trung chuyển hoặc kiểm tra thông tin trước khi lên xe.</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">BẾN XE/VP</h3>
                    <RadioGroup value={dropoffType} onValueChange={setDropoffType} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="station" id="dropoff-station" />
                        <Label htmlFor="dropoff-station">Bến xe/VP</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="transfer" id="dropoff-transfer" />
                        <Label htmlFor="dropoff-transfer">Trung chuyển</Label>
                      </div>
                    </RadioGroup>

                    <div className="mt-2">
                      <Select value={dropoffLocation} onValueChange={setDropoffLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn điểm trả" />
                        </SelectTrigger>
                        <SelectContent>
                          {dropoffLocations.map((location) => (
                            <SelectItem key={location.id} value={location.id}>
                              {location.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">ĐIỀU KHOẢN & LƯU Ý</h3>
                  <div className="text-sm space-y-4">
                    <p>
                      (*) Quý khách vui lòng có mặt tại bến xuất phát của xe trước ít nhất 30 phút giờ xe khởi hành,
                      mang theo thông báo đã thanh toán vé thành công có chứa mã vé được gửi từ hệ thống FUTA BUS LINES.
                      Vui lòng liên hệ Tổng tâm tổng đài <span className="text-futa-orange">1900 6067</span> để được hỗ
                      trợ.
                    </p>
                    <p>
                      (*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ Tổng đài trung chuyển{" "}
                      <span className="text-futa-orange">1900 6918</span> trước khi đặt vé. Chúng tôi không đón/trung
                      chuyển tại những điểm xe trung chuyển không thể tới được.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-4">
                <div className="bg-green-600 text-white p-2 rounded-md text-center mb-4">
                  <span className="font-bold">FUTAPAY</span>
                </div>
                <div className="text-2xl font-bold text-center mb-4">290.000đ</div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1" onClick={handleCancel}>
                    Hủy
                  </Button>
                  <Button className="flex-1 bg-futa-orange hover:bg-futa-orange/90" onClick={handlePayment}>
                    Thanh toán
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

