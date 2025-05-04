"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export function RoutePerformance() {
  // Sample data - in a real app, this would come from an API
  const routes = [
    {
      route: "Hà Nội - Hải Phòng",
      trips: 120,
      tickets: 1850,
      revenue: 462500000,
      occupancy: 92,
    },
    {
      route: "Hà Nội - Nam Định",
      trips: 90,
      tickets: 1450,
      revenue: 261000000,
      occupancy: 85,
    },
    {
      route: "Hà Nội - Thanh Hóa",
      trips: 75,
      tickets: 1200,
      revenue: 180000000,
      occupancy: 78,
    },
    {
      route: "Hà Nội - Ninh Bình",
      trips: 60,
      tickets: 950,
      revenue: 190000000,
      occupancy: 88,
    },
    {
      route: "Hà Nội - Quảng Ninh",
      trips: 45,
      tickets: 720,
      revenue: 158400000,
      occupancy: 82,
    },
  ]

  const formatCurrency = (value: number) => {
    return value.toLocaleString() + "đ"
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tuyến đường</TableHead>
          <TableHead>Số chuyến</TableHead>
          <TableHead>Vé bán</TableHead>
          <TableHead>Doanh thu</TableHead>
          <TableHead>Tỷ lệ lấp đầy</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {routes.map((route) => (
          <TableRow key={route.route}>
            <TableCell className="font-medium">{route.route}</TableCell>
            <TableCell>{route.trips}</TableCell>
            <TableCell>{route.tickets}</TableCell>
            <TableCell>{formatCurrency(route.revenue)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress value={route.occupancy} className="h-2 w-[100px]" />
                <span className="text-sm">{route.occupancy}%</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
