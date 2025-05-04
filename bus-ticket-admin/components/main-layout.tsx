"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useSidebar } from "@/components/sidebar-provider"
import { cn } from "@/lib/utils"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div
        className={cn(
          "flex flex-col flex-1 overflow-hidden transition-all duration-300",
          isOpen ? "md:ml-64" : "md:ml-20",
        )}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  )
}
