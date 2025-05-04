"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/quen-mat-khau/xac-thuc")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-orange-50">
        <div className="container py-12">
          <div className="max-w-md mx-auto">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex justify-center mb-6">
                  <div className="relative w-full max-w-[300px] h-[120px]">
                    <Image
                      src="/placeholder.svg?height=120&width=300"
                      alt="FUTA Bus Lines"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <h1 className="text-xl font-bold text-center mb-6">Quên mật khẩu</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-futa-orange hover:bg-futa-orange/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Đang xử lý..." : "Gửi mã xác thực"}
                  </Button>

                  <div className="text-center">
                    <Link href="/dang-nhap" className="text-sm text-futa-orange hover:underline">
                      Quay lại
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

