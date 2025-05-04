"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface RevenueChartProps {
  timeRange: string
}

export function RevenueChart({ timeRange }: RevenueChartProps) {
  // Sample data - in a real app, this would come from an API
  const todayData = [
    { time: "06:00", revenue: 1200000 },
    { time: "08:00", revenue: 2500000 },
    { time: "10:00", revenue: 3800000 },
    { time: "12:00", revenue: 5100000 },
    { time: "14:00", revenue: 6400000 },
    { time: "16:00", revenue: 8200000 },
    { time: "18:00", revenue: 10500000 },
    { time: "20:00", revenue: 12800000 },
    { time: "22:00", revenue: 14500000 },
  ]

  const weekData = [
    { time: "T2", revenue: 14500000 },
    { time: "T3", revenue: 12800000 },
    { time: "T4", revenue: 16500000 },
    { time: "T5", revenue: 18200000 },
    { time: "T6", revenue: 21500000 },
    { time: "T7", revenue: 24800000 },
    { time: "CN", revenue: 22500000 },
  ]

  const monthData = [
    { time: "01/04", revenue: 14500000 },
    { time: "05/04", revenue: 16800000 },
    { time: "10/04", revenue: 18500000 },
    { time: "15/04", revenue: 21200000 },
    { time: "20/04", revenue: 23500000 },
    { time: "25/04", revenue: 24800000 },
    { time: "30/04", revenue: 28500000 },
  ]

  const data = timeRange === "today" ? todayData : timeRange === "week" ? weekData : monthData

  const formatRevenue = (value: number) => {
    return `${(value / 1000000).toFixed(1)}M`
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatRevenue} />
          <Tooltip
            formatter={(value: number) => [`${value.toLocaleString()}đ`, "Doanh thu"]}
            labelFormatter={(label) => `Thời gian: ${label}`}
          />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
