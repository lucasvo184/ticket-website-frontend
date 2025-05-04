"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function RecentTrips() {
  // Sample data - in a real app, this would come from an API
  const trips = [
    {
      id: "TX001",
      route: "Hà Nội - Hải Phòng",
      departureTime: "2023-04-19T08:00:00",
      status: "upcoming",
      busId: "XE001",
      busType: "Limousine",
      seats: 16,
      price: 250000,
    },
    {
      id: "TX002",
      route: "Hà Nội - Nam Định",
      departureTime: "2023-04-19T09:30:00",
      status: "upcoming",
      busId: "XE005",
      busType: "Giường nằm",
      seats: 32,
      price: 180000,
    },
    {
      id: "TX003",
      route: "Hà Nội - Thanh Hóa",
      departureTime: "2023-04-19T10:15:00",
      status: "upcoming",
      busId: "XE008",
      busType: "Ghế ngồi",
      seats: 45,
      price: 150000,
    },
    {
      id: "TX004",
      route: "Hà Nội - Ninh Bình",
      departureTime: "2023-04-19T07:00:00",
      status: "completed",
      busId: "XE003",
      busType: "Limousine",
      seats: 16,
      price: 200000,
    },
    {
      id: "TX005",
      route: "Hà Nội - Quảng Ninh",
      departureTime: "2023-04-19T06:30:00",
      status: "completed",
      busId: "XE010",
      busType: "Giường nằm",
      seats: 32,
      price: 220000,
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Mã chuyến</TableHead>
          <TableHead>Tuyến đường</TableHead>
          <TableHead>Mã xe - Loại xe</TableHead>
          <TableHead>Số chỗ</TableHead>
          <TableHead>Thời gian khởi hành</TableHead>
          <TableHead>Giá vé</TableHead>
          <TableHead>Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips.map((trip) => (
          <TableRow key={trip.id}>
            <TableCell className="font-medium">{trip.id}</TableCell>
            <TableCell>{trip.route}</TableCell>
            <TableCell>
              {trip.busId} - {trip.busType}
            </TableCell>
            <TableCell>{trip.seats}</TableCell>
            <TableCell>{formatDate(trip.departureTime)}</TableCell>
            <TableCell>{trip.price.toLocaleString()}đ</TableCell>
            <TableCell>
              <Badge variant={trip.status === "upcoming" ? "default" : "secondary"}>
                {trip.status === "upcoming" ? "Sắp khởi hành" : "Đã hoàn thành"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
