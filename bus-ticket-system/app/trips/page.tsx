"use client"

import { useState } from "react"
import { CalendarIcon, Edit, Plus, Search, Trash } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { TripForm } from "@/components/trips/trip-form"

export default function TripsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined)
  const [filterDeparture, setFilterDeparture] = useState("")
  const [filterDestination, setFilterDestination] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState<any>(null)

  // Sample data - in a real app, this would come from an API
  const trips = [
    {
      id: "TX001",
      route: "Hà Nội - Hải Phòng",
      departure: "Hà Nội",
      destination: "Hải Phòng",
      departureTime: "2023-04-20T08:00:00",
      busId: "XE001",
      busType: "Limousine",
      seats: 16,
      price: 250000,
    },
    {
      id: "TX002",
      route: "Hà Nội - Nam Định",
      departure: "Hà Nội",
      destination: "Nam Định",
      departureTime: "2023-04-20T09:30:00",
      busId: "XE005",
      busType: "Giường nằm",
      seats: 32,
      price: 180000,
    },
    {
      id: "TX003",
      route: "Hà Nội - Thanh Hóa",
      departure: "Hà Nội",
      destination: "Thanh Hóa",
      departureTime: "2023-04-21T10:15:00",
      busId: "XE008",
      busType: "Ghế ngồi",
      seats: 45,
      price: 150000,
    },
    {
      id: "TX004",
      route: "Hà Nội - Ninh Bình",
      departure: "Hà Nội",
      destination: "Ninh Bình",
      departureTime: "2023-04-22T07:00:00",
      busId: "XE003",
      busType: "Limousine",
      seats: 16,
      price: 200000,
    },
    {
      id: "TX005",
      route: "Hà Nội - Quảng Ninh",
      departure: "Hà Nội",
      destination: "Quảng Ninh",
      departureTime: "2023-04-23T06:30:00",
      busId: "XE010",
      busType: "Giường nằm",
      seats: 32,
      price: 220000,
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "HH:mm - dd/MM/yyyy", { locale: vi })
  }

  const handleEdit = (trip: any) => {
    setSelectedTrip(trip)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (tripId: string) => {
    // In a real app, this would call an API to delete the trip
    console.log(`Deleting trip ${tripId}`)
    // Then refresh the data
  }

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.busId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDate = !filterDate || new Date(trip.departureTime).toDateString() === filterDate.toDateString()

    const matchesDeparture = !filterDeparture || trip.departure === filterDeparture

    const matchesDestination = !filterDestination || trip.destination === filterDestination

    return matchesSearch && matchesDate && matchesDeparture && matchesDestination
  })

  // Get unique departure and destination locations for filters
  const departureLocations = Array.from(new Set(trips.map((trip) => trip.departure)))
  const destinationLocations = Array.from(new Set(trips.map((trip) => trip.destination)))

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý chuyến đi</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm chuyến đi
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Thêm chuyến đi mới</DialogTitle>
              <DialogDescription>Điền đầy đủ thông tin để tạo chuyến đi mới</DialogDescription>
            </DialogHeader>
            <TripForm onSubmit={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm và lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="search">Tìm kiếm</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Mã chuyến, tuyến đường..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ngày khởi hành</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filterDate ? format(filterDate, "dd/MM/yyyy", { locale: vi }) : <span>Chọn ngày</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={filterDate} onSelect={setFilterDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Bến đi</Label>
              <Select value={filterDeparture} onValueChange={setFilterDeparture}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  {departureLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Bến đến</Label>
              <Select value={filterDestination} onValueChange={setFilterDestination}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  {destinationLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã chuyến</TableHead>
                <TableHead>Mã xe - Loại xe - Số chỗ</TableHead>
                <TableHead>Bến đi - Bến đến</TableHead>
                <TableHead>Thời gian khởi hành</TableHead>
                <TableHead>Giá vé</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell className="font-medium">{trip.id}</TableCell>
                  <TableCell>
                    {trip.busId} - {trip.busType} - {trip.seats} chỗ
                  </TableCell>
                  <TableCell>
                    {trip.departure} - {trip.destination}
                  </TableCell>
                  <TableCell>{formatDate(trip.departureTime)}</TableCell>
                  <TableCell>{trip.price.toLocaleString()}đ</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(trip)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Sửa</span>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(trip.id)}>
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Xóa</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa chuyến đi</DialogTitle>
            <DialogDescription>Cập nhật thông tin chuyến đi</DialogDescription>
          </DialogHeader>
          {selectedTrip && <TripForm trip={selectedTrip} onSubmit={() => setIsEditDialogOpen(false)} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
