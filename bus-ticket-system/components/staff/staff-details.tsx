"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface StaffDetailsProps {
  staff: any
}

export function StaffDetails({ staff }: StaffDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center space-y-3">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/placeholder.svg" alt={staff.name} />
          <AvatarFallback>
            {staff.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h3 className="text-lg font-medium">{staff.name}</h3>
          <p className="text-sm text-muted-foreground">{staff.role}</p>
          <Badge variant={staff.status === "active" ? "default" : "secondary"} className="mt-1">
            {staff.status === "active" ? "Hoạt động" : "Đã khóa"}
          </Badge>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Email:</Label>
              <div className="col-span-3">{staff.email}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Số điện thoại:</Label>
              <div className="col-span-3">{staff.phone}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Vai trò:</Label>
              <div className="col-span-3">{staff.role}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Trạng thái:</Label>
              <div className="col-span-3">
                <Badge variant={staff.status === "active" ? "default" : "secondary"}>
                  {staff.status === "active" ? "Hoạt động" : "Đã khóa"}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Ngày tạo:</Label>
              <div className="col-span-3">01/04/2023</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Đăng nhập cuối:</Label>
              <div className="col-span-3">19/04/2023 08:45</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
