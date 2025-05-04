"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function LogoutPage() {
  const router = useRouter()

  const handleCancel = () => {
    router.back()
  }

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userToken")
    localStorage.removeItem("userName")

    console.log("Logging out")
    router.push("/")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-orange-50 flex items-center justify-center">
        <div className="container py-12 max-w-md">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <AlertCircle className="h-16 w-16 text-futa-orange mb-4" />
                <h1 className="text-xl font-bold mb-2">Bạn có chắc chắn muốn đăng xuất?</h1>
                <p className="text-gray-500 mb-6">
                  Bạn sẽ cần đăng nhập lại để tiếp tục sử dụng dịch vụ của FUTA Bus Lines
                </p>

                <div className="flex gap-4 w-full">
                  <Button variant="outline" className="flex-1" onClick={handleCancel}>
                    Hủy
                  </Button>
                  <Button className="flex-1 bg-futa-orange hover:bg-futa-orange/90" onClick={handleLogout}>
                    Xác Nhận
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

