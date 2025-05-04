"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, User, MapPin, Lock, LogOut, History } from "lucide-react"
import { cn } from "@/lib/utils"

const userNavigation = [
  {
    name: "FUTAPay",
    href: "/tai-khoan/futa-pay",
    icon: CreditCard,
  },
  {
    name: "Thông tin tài khoản",
    href: "/tai-khoan/thong-tin-chung",
    icon: User,
  },
  {
    name: "Lịch sử mua vé",
    href: "/tai-khoan/lich-su-mua-ve",
    icon: History,
  },
  {
    name: "Địa chỉ của bạn",
    href: "/tai-khoan/dia-chi",
    icon: MapPin,
  },
  {
    name: "Đặt lại mật khẩu",
    href: "/tai-khoan/dat-lai-mat-khau",
    icon: Lock,
  },
  {
    name: "Đăng xuất",
    href: "/dang-xuat",
    icon: LogOut,
  },
]

export function UserSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-full">
      <div className="space-y-1">
        {userNavigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === item.href ? "bg-orange-100 text-futa-orange" : "hover:bg-orange-50",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

