"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function RevenueChart() {
  // Sample data - in a real app, this would come from an API
  const data = [
    { date: "01/04", revenue: 14500000 },
    { date: "05/04", revenue: 16800000 },
    { date: "10/04", revenue: 18500000 },
    { date: "15/04", revenue: 21200000 },
    { date: "20/04", revenue: 23500000 },
    { date: "25/04", revenue: 24800000 },
    { date: "30/04", revenue: 28500000 },
  ]

  const formatRevenue = (value: number) => {
    return `${(value / 1000000).toFixed(1)}M`
  }

  return (
    <div className="h-[400px] w-full">
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
          <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatRevenue} />
          <Tooltip
            formatter={(value: number) => [`${value.toLocaleString()}đ`, "Doanh thu"]}
            labelFormatter={(label) => `Ngày: ${label}`}
          />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
