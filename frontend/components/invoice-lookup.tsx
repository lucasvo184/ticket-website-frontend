"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RefreshCcw } from "lucide-react"
import Image from "next/image"

export function InvoiceLookup() {
  const [secretCode, setSecretCode] = useState("")
  const [captcha, setCaptcha] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({ secretCode, captcha })
    // Reset form or show results
  }

  return (
    <Card className="max-w-md mx-auto border-none shadow-md">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-xl text-futa-orange text-center">Tra cứu hóa đơn</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="secret-code">Mã số bí mật</Label>
            <Input
              id="secret-code"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
              placeholder="Nhập mã số bí mật"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="relative h-12 flex-1 bg-gray-100 rounded overflow-hidden">
                <Image
                  src="/placeholder.svg?height=50&width=200"
                  alt="Captcha"
                  width={200}
                  height={50}
                  className="object-contain"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  // Refresh captcha logic
                }}
              >
                <RefreshCcw className="h-4 w-4" />
                <span className="sr-only">Làm mới mã xác thực</span>
              </Button>
            </div>

            <Input
              id="captcha"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              placeholder="Nhập mã xác thực"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Tra cứu
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

