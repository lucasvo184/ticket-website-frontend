"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, ReplaceIcon as SwapIcon, Clock, MapPin, Info } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function BookingForm() {
  const [tripType, setTripType] = useState("one-way")
  const [date, setDate] = useState<Date>(new Date())
  const [showResults, setShowResults] = useState(false)
  const [departureCity, setDepartureCity] = useState("ANMINH")
  const [destinationCity, setDestinationCity] = useState("TP. Hồ Chí Minh")
  const [passengers, setPassengers] = useState("1")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setShowResults(true)
  }

  const handleSwapCities = () => {
    const temp = departureCity
    setDepartureCity(destinationCity)
    setDestinationCity(temp)
  }

  return (
    <>
      <Card className="border-none shadow-lg rounded-lg overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <RadioGroup defaultValue="one-way" className="flex gap-4" onValueChange={setTripType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-way" id="one-way" className="text-futa-orange" />
                <Label htmlFor="one-way" className="font-medium">
                  Một chiều
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="round-trip" id="round-trip" className="text-futa-orange" />
                <Label htmlFor="round-trip" className="font-medium">
                  Khứ hồi
                </Label>
              </div>
            </RadioGroup>

            <Link href="/huong-dan-dat-ve" className="text-futa-orange text-sm">
              Hướng dẫn mua vé
            </Link>
          </div>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departure">Điểm đi</Label>
                <div className="relative">
                  <Input
                    id="departure"
                    placeholder="Chọn điểm đi"
                    className="h-12"
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="arrival">Điểm đến</Label>
                <div className="relative">
                  <Input
                    id="arrival"
                    placeholder="Chọn điểm đến"
                    className="h-12"
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    className="absolute right-0 top-0 h-12"
                    onClick={handleSwapCities}
                  >
                    <SwapIcon className="h-4 w-4 rotate-90" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ngày đi</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-12 w-full justify-start text-left font-normal">
                      {date ? format(date, "dd/MM/yyyy", { locale: vi }) : <span>Chọn ngày</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Số vé</Label>
                <Select defaultValue="1" value={passengers} onValueChange={setPassengers}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Chọn số lượng vé" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {tripType === "round-trip" && (
              <div className="mt-4">
                <div className="space-y-2">
                  <Label>Ngày về</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-12 w-full sm:w-[240px] justify-start text-left font-normal"
                      >
                        <span>Chọn ngày</span>
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-center">
              <Button
                type="submit"
                className="bg-futa-orange hover:bg-futa-orange/90 text-white px-8 py-6 rounded-full"
              >
                Tìm chuyến xe
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {showResults && (
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">
                {departureCity} - {destinationCity} (1)
              </h2>
              <div className="flex gap-6 mt-2">
                <div className="flex items-center gap-1 text-sm">
                  <Info className="h-4 w-4 text-futa-orange" />
                  <span>Giá rẻ bất ngờ</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4 text-futa-orange" />
                  <span>Giờ khởi hành</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="h-4 w-4 text-futa-orange" />
                  <span>Ghế trống</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-b">
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="text-xl font-bold">22:00</div>
                    <div className="mx-2 text-gray-400">•</div>
                    <div className="text-sm text-gray-500">7 giờ</div>
                    <div className="mx-2 text-gray-400">•</div>
                    <div className="text-xl font-bold">05:00</div>
                  </div>
                  <div className="flex mt-1">
                    <div className="text-sm">An Minh - Kiên Giang</div>
                    <div className="mx-2 text-gray-400">→</div>
                    <div className="text-sm">Bến Xe Miền Tây</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <div className="text-sm">Limousine</div>
                    <div className="text-sm">•</div>
                    <div className="text-sm text-futa-green">18 chỗ trống</div>
                  </div>
                  <div className="text-xl font-bold text-futa-orange mt-1">200.000đ</div>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <Button variant="outline" className="text-sm">
                  Chọn ghế
                </Button>
                <Button variant="outline" className="text-sm">
                  Lịch trình
                </Button>
                <Button variant="outline" className="text-sm">
                  Trung chuyển
                </Button>
                <Button variant="outline" className="text-sm">
                  Chính sách
                </Button>
                <Button className="bg-futa-orange hover:bg-futa-orange/90 text-white ml-auto">Chọn chuyến</Button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md m-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-medium">Đăng nhập ngay để nhận được nhiều quyền lợi dành cho thành viên</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Khi đăng nhập và tải App, bạn sẽ dễ dàng quản lý đặt chỗ, hoặc nhận thông tin khuyến mãi khi mua vé,
                    và còn nhiều ưu đãi khác. v.v...
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <img src="/placeholder.svg?height=80&width=80" alt="Login" className="w-20 h-20" />
                </div>
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white mt-2">Đăng nhập ngay</Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">BỘ LỌC TÌM KIẾM</h2>
            </div>
            <div className="p-4">
              <Tabs defaultValue="time">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="time">Giờ đi</TabsTrigger>
                  <TabsTrigger value="type">Loại xe</TabsTrigger>
                  <TabsTrigger value="seat">Hạng ghế</TabsTrigger>
                  <TabsTrigger value="floor">Tầng</TabsTrigger>
                </TabsList>
                <TabsContent value="time" className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="morning" />
                      <label htmlFor="morning" className="text-sm">
                        Sáng sớm 00:00 - 06:00 (0)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="day" />
                      <label htmlFor="day" className="text-sm">
                        Buổi sáng 06:00 - 12:00 (0)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="afternoon" />
                      <label htmlFor="afternoon" className="text-sm">
                        Buổi chiều 12:00 - 18:00 (0)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="evening" />
                      <label htmlFor="evening" className="text-sm">
                        Buổi tối 18:00 - 24:00 (1)
                      </label>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="type" className="pt-4">
                  <div className="flex gap-2">
                    <Button variant="outline" className="rounded-full">
                      Ghế
                    </Button>
                    <Button variant="outline" className="rounded-full">
                      Giường
                    </Button>
                    <Button variant="outline" className="rounded-full">
                      Limousine
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="seat" className="pt-4">
                  <div className="flex gap-2">
                    <Button variant="outline" className="rounded-full">
                      Hàng đầu
                    </Button>
                    <Button variant="outline" className="rounded-full">
                      Hàng giữa
                    </Button>
                    <Button variant="outline" className="rounded-full">
                      Hàng cuối
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="floor" className="pt-4">
                  <div className="flex gap-2">
                    <Button variant="outline" className="rounded-full">
                      Tầng trên
                    </Button>
                    <Button variant="outline" className="rounded-full">
                      Tầng dưới
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

