"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SalesOverview() {
  // Sample data - in a real app, this would come from an API
  const data = [
    { date: "01/04", sold: 120, canceled: 8 },
    { date: "05/04", sold: 145, canceled: 12 },
    { date: "10/04", sold: 185, canceled: 15 },
    { date: "15/04", sold: 212, canceled: 18 },
    { date: "20/04", sold: 235, canceled: 20 },
    { date: "25/04", sold: 248, canceled: 22 },
    { date: "30/04", sold: 285, canceled: 25 },
  ]

  return (
    <div className="space-y-6">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="sold" name="Vé bán" fill="#8884d8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="canceled" name="Vé hủy" fill="#ff8042" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Phân tích vé bán</CardTitle>
            <CardDescription>Chi tiết về vé bán theo loại</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded bg-primary mr-2"></div>
                  <span>Vé thường</span>
                </div>
                <span className="font-medium">7,850 (76.7%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded bg-blue-500 mr-2"></div>
                  <span>Vé VIP</span>
                </div>
                <span className="font-medium">1,560 (15.2%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded bg-green-500 mr-2"></div>
                  <span>Vé khuyến mãi</span>
                </div>
                <span className="font-medium">830 (8.1%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Phân tích vé hủy</CardTitle>
            <CardDescription>Chi tiết về vé hủy theo lý do</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded bg-red-500 mr-2"></div>
                  <span>Khách hàng hủy</span>
                </div>
                <span className="font-medium">85 (70.8%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded bg-orange-500 mr-2"></div>
                  <span>Hủy do thay đổi lịch</span>
                </div>
                <span className="font-medium">25 (20.8%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded bg-yellow-500 mr-2"></div>
                  <span>Lý do khác</span>
                </div>
                <span className="font-medium">10 (8.4%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
