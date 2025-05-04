"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function UpdateProfilePage() {
  const router = useRouter()
  const [profileData, setProfileData] = useState({
    phone: "0773914830", // Pre-filled from registration
    fullName: "",
    email: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updating profile:", profileData)
    router.push("/tai-khoan/thong-tin-chung")
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

                <h1 className="text-xl font-bold text-center mb-6">Cập nhật thông tin</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={profileData.phone}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Nhập họ và tên"
                      value={profileData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Nhập email"
                      value={profileData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-futa-orange hover:bg-futa-orange/90">
                    Tiếp tục
                  </Button>
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

