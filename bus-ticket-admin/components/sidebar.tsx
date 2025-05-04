"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Ticket, XCircle, Users, Tag, HeadphonesIcon, Bell, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/sidebar-provider"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Quản lý vé",
    href: "/tickets",
    icon: Ticket,
  },
  {
    title: "Danh sách hủy vé",
    href: "/canceled-tickets",
    icon: XCircle,
  },
  {
    title: "Quản lý khách hàng",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Quản lý khuyến mãi",
    href: "/promotions",
    icon: Tag,
  },
  {
    title: "Hỗ trợ khách hàng",
    href: "/support",
    icon: HeadphonesIcon,
  },
  {
    title: "Thông báo",
    href: "/notifications",
    icon: Bell,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isOpen, toggle } = useSidebar()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
        isOpen ? "w-64" : "w-20",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2 font-semibold text-xl transition-opacity",
            isOpen ? "opacity-100" : "opacity-0 md:hidden",
          )}
        >
          <Ticket className="h-6 w-6 text-primary" />
          <span className="text-gray-900 dark:text-gray-100">BusTicket</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={toggle} className="hidden md:flex">
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>
      <div className="py-4">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                !isOpen && "justify-center",
              )}
            >
              <item.icon className={cn("h-5 w-5", !isOpen && "mx-auto")} />
              {isOpen && <span className="ml-3">{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
