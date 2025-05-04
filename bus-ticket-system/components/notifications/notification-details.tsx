"use client"

import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Bell } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface NotificationDetailsProps {
  notification: any
}

export function NotificationDetails({ notification }: NotificationDetailsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "HH:mm - dd/MM/yyyy", { locale: vi })
  }

  const getTargetLabel = (target: string) => {
    switch (target) {
      case "staff":
        return "Nhân viên"
      case "customer":
        return "Khách hàng"
      case "all":
        return "Tất cả"
      default:
        return target
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-primary/10 p-2">
          <Bell className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">{notification.title}</h3>
          <p className="text-sm text-muted-foreground">
            Gửi đến: {getTargetLabel(notification.target)} • {formatDate(notification.createdAt)}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Nội dung thông báo:</Label>
              <div className="mt-2 whitespace-pre-wrap rounded-md bg-muted p-4">{notification.content}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
