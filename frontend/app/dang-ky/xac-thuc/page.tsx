"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function VerificationPage() {
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes in seconds
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0)
    }

    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const code = verificationCode.join("")
    console.log("Verification code:", code)
    router.push("/dang-ky/tao-mat-khau")
  }

  const handleResendCode = () => {
    // Reset timer and resend code logic
    setTimeLeft(120)
    console.log("Resending verification code")
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

                <h1 className="text-xl font-bold text-center mb-2">Nhập mã xác thực</h1>
                <p className="text-center text-gray-500 mb-6">Mã xác thực đã được gửi về số 0773914830</p>

                <form onSubmit={handleSubmit}>
                  <div className="flex justify-center gap-2 mb-6">
                    {verificationCode.map((digit, index) => (
                      <Input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        className="w-12 h-12 text-center text-lg"
                        value={digit}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        required
                      />
                    ))}
                  </div>

                  <Button type="submit" className="w-full bg-futa-orange hover:bg-futa-orange/90 mb-4">
                    Tiếp tục
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Thời gian còn lại: {formatTime(timeLeft)}</p>
                  {timeLeft === 0 ? (
                    <Button variant="link" className="text-futa-orange p-0 h-auto" onClick={handleResendCode}>
                      Gửi lại mã
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

