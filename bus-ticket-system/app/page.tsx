"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Bus, Calendar, DollarSign, Ticket, Users, Bell, BarChart3 } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dynamic imports để tránh hydration errors
const RevenueChart = dynamic(
  () => import("@/components/dashboard/revenue-chart").then((mod) => mod.RevenueChart),
  { 
    ssr: false,
    loading: () => <div className="h-[300px] flex items-center justify-center">Đang tải biểu đồ...</div>
  }
)

const RecentTrips = dynamic(
  () => import("@/components/dashboard/recent-trips").then((mod) => mod.RecentTrips),
  { 
    ssr: false,
    loading: () => <div className="h-[300px] flex items-center justify-center">Đang tải danh sách chuyến đi...</div>
  }
)

const Notifications = dynamic(
  () => import("@/components/dashboard/notifications").then((mod) => mod.Notifications),
  { 
    ssr: false,
    loading: () => <div className="h-[300px] flex items-center justify-center">Đang tải thông báo...</div>
  }
)

interface RevenueChartProps {
  timeRange: string;
}

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("today")
  const [currentDate, setCurrentDate] = useState("")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setCurrentDate(
      new Date().toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    )
  }, [])

  if (!isMounted) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="h-10 w-1/3 bg-gray-200 rounded animate-pulse" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
        <div className="h-96 bg-gray-200 rounded animate-pulse" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header với ngày tháng */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" suppressHydrationWarning>
            <Calendar className="mr-2 h-4 w-4" />
            {currentDate}
          </Button>
        </div>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tổng chuyến xe</CardTitle>
            <Bus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+6% so với tuần trước</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vé đã bán</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,024</div>
            <p className="text-xs text-muted-foreground">+12% so với tuần trước</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,500,000đ</div>
            <p className="text-xs text-muted-foreground">+8% so với tuần trước</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Khách hàng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">842</div>
            <p className="text-xs text-muted-foreground">+4% so với tuần trước</p>
          </CardContent>
        </Card>
      </div>

      {/* Biểu đồ và thông báo */}
      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-5">
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Doanh thu</CardTitle>
              <CardDescription>Biểu đồ doanh thu theo thời gian</CardDescription>
            </div>
            <Tabs defaultValue="today" className="ml-auto" onValueChange={setTimeRange}>
              <TabsList>
                <TabsTrigger value="today">Hôm nay</TabsTrigger>
                <TabsTrigger value="week">Tuần</TabsTrigger>
                <TabsTrigger value="month">Tháng</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <RevenueChart timeRange={timeRange} />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Thông báo mới nhất</CardTitle>
          </CardHeader>
          <CardContent>
            <Notifications />
          </CardContent>
        </Card>
      </div>

      {/* Danh sách chuyến đi gần đây */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Chuyến xe gần đây</CardTitle>
          <Button variant="ghost" size="sm" asChild suppressHydrationWarning>
            <Link href="/trips">
              Xem tất cả
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <RecentTrips />
        </CardContent>
      </Card>

      {/* Các nút điều hướng chính */}
      <div className="grid gap-6 md:grid-cols-4">
        <Button asChild className="md:col-span-1" suppressHydrationWarning>
          <Link href="/trips">
            <Bus className="mr-2 h-4 w-4" />
            Quản lý chuyến đi
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="md:col-span-1" suppressHydrationWarning>
          <Link href="/staff">
            <Users className="mr-2 h-4 w-4" />
            Quản lý nhân viên
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="md:col-span-1" suppressHydrationWarning>
          <Link href="/notifications">
            <Bell className="mr-2 h-4 w-4" />
            Quản lý thông báo
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="md:col-span-1" suppressHydrationWarning>
          <Link href="/reports">
            <BarChart3 className="mr-2 h-4 w-4" />
            Báo cáo chi tiết
          </Link>
        </Button>
      </div>
    </div>
  )
}