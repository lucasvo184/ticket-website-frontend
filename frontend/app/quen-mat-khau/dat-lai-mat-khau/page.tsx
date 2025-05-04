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
import { Eye, EyeOff } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [passwordError, setPasswordError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))

    if (name === "confirmPassword" && passwordData.password !== value) {
      setPasswordError("Mật khẩu không khớp")
    } else {
      setPasswordError("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.password !== passwordData.confirmPassword) {
      setPasswordError("Mật khẩu không khớp")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/dang-nhap")
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

                <h1 className="text-xl font-bold text-center mb-6">Đặt lại mật khẩu</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Mật khẩu mới</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu mới"
                        value={passwordData.password}
                        onChange={handleChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Nhập lại mật khẩu mới</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu mới"
                        value={passwordData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-futa-orange hover:bg-futa-orange/90"
                    disabled={!!passwordError || isSubmitting}
                  >
                    {isSubmitting ? "Đang xử lý..." : "Xác nhận"}
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

