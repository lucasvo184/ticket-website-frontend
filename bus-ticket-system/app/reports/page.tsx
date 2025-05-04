"use client"

import { useState } from "react"
import { CalendarIcon, Download } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RevenueChart } from "@/components/reports/revenue-chart"
import { RoutePerformance } from "@/components/reports/route-performance"
import { SalesOverview } from "@/components/reports/sales-overview"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  })

  const [routeFilter, setRouteFilter] = useState("")
  const [reportType, setReportType] = useState("revenue")

  // Sample data for routes
  const routes = [
    "Hà Nội - Hải Phòng",
    "Hà Nội - Nam Định",
    "Hà Nội - Thanh Hóa",
    "Hà Nội - Ninh Bình",
    "Hà Nội - Quảng Ninh",
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Báo cáo kinh doanh</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Xuất báo cáo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc báo cáo</CardTitle>
          <CardDescription>Chọn khoảng thời gian và tuyến xe để xem báo cáo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Khoảng thời gian</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd/MM/yyyy", { locale: vi })} -{" "}
                          {format(dateRange.to, "dd/MM/yyyy", { locale: vi })}
                        </>
                      ) : (
                        format(dateRange.from, "dd/MM/yyyy", { locale: vi })
                      )
                    ) : (
                      <span>Chọn khoảng thời gian</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="range" selected={dateRange} onSelect={setDateRange as any} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Tuyến xe / Khu vực</Label>
              <Select value={routeFilter} onValueChange={setRouteFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả tuyến" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả tuyến</SelectItem>
                  {routes.map((route) => (
                    <SelectItem key={route} value={route}>
                      {route}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Loại báo cáo</Label>
              <Tabs defaultValue="revenue" className="w-full" onValueChange={setReportType}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
                  <TabsTrigger value="tickets">Vé bán</TabsTrigger>
                  <TabsTrigger value="routes">Tuyến đường</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245,000,000đ</div>
            <p className="text-xs text-muted-foreground">+8% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tổng vé bán</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,240</div>
            <p className="text-xs text-muted-foreground">+12% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ hoàn tiền</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4%</div>
            <p className="text-xs text-muted-foreground">-0.5% so với tháng trước</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={reportType} className="w-full">
        <TabsContent value="revenue" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Biểu đồ doanh thu theo thời gian</CardTitle>
              <CardDescription>
                Doanh thu từ {dateRange.from ? format(dateRange.from, "dd/MM/yyyy", { locale: vi }) : ""}
                đến {dateRange.to ? format(dateRange.to, "dd/MM/yyyy", { locale: vi }) : ""}
                {routeFilter ? ` - Tuyến ${routeFilter}` : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tickets" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Tổng quan vé bán</CardTitle>
              <CardDescription>
                Thống kê vé bán từ {dateRange.from ? format(dateRange.from, "dd/MM/yyyy", { locale: vi }) : ""}
                đến {dateRange.to ? format(dateRange.to, "dd/MM/yyyy", { locale: vi }) : ""}
                {routeFilter ? ` - Tuyến ${routeFilter}` : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SalesOverview />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="routes" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Hiệu suất tuyến đường</CardTitle>
              <CardDescription>
                Thống kê hiệu suất các tuyến đường từ{" "}
                {dateRange.from ? format(dateRange.from, "dd/MM/yyyy", { locale: vi }) : ""}
                đến {dateRange.to ? format(dateRange.to, "dd/MM/yyyy", { locale: vi }) : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoutePerformance />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
