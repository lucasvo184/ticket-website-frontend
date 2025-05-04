import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UserSidebar } from "@/components/user-sidebar"

export default function UserAccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <UserSidebar />
            </div>
            <div className="md:col-span-3">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

