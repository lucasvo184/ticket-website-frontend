"use client"

import { Bell } from "lucide-react"

export function Notifications() {
  // Sample data - in a real app, this would come from an API
  const notifications = [
    {
      id: 1,
      title: "Cập nhật lịch trình",
      content: "Các chuyến xe đi Hải Phòng sẽ thay đổi lịch trình từ ngày 20/04/2023",
      time: "10 phút trước",
    },
    {
      id: 2,
      title: "Khuyến mãi mới",
      content: "Giảm 10% cho tất cả các chuyến xe vào cuối tuần",
      time: "2 giờ trước",
    },
    {
      id: 3,
      title: "Nhân viên mới",
      content: "Nguyễn Văn A đã được thêm vào hệ thống",
      time: "1 ngày trước",
    },
  ]

  return (
    <div className="space-y-4">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id} className="flex flex-col space-y-1 border-b pb-3 last:border-0">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{notification.title}</h4>
              <span className="text-xs text-muted-foreground">{notification.time}</span>
            </div>
            <p className="text-sm text-muted-foreground">{notification.content}</p>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Bell className="mb-2 h-8 w-8 text-muted-foreground" />
          <h4 className="text-sm font-medium">Không có thông báo mới</h4>
        </div>
      )}
    </div>
  )
}
