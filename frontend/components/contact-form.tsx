"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [formData, setFormData] = useState({
    title: "male",
    name: "",
    email: "",
    phone: "",
    helpType: "booking",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
    // Reset form or show success message
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-futa-orange text-white text-center">
        <CardTitle className="text-xl">Quý khách vui lòng cho chúng tôi thông tin để thuận tiện hỗ trợ.</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Quý danh</Label>
            <RadioGroup
              defaultValue="male"
              className="flex gap-6"
              onValueChange={(value) => handleRadioChange("title", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Ông/Anh</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Bà/Chị</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">* Họ và Tên</Label>
            <Input
              id="name"
              name="name"
              placeholder="Nhập họ và tên"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Nhập email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">* Điện thoại</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Nhập số điện thoại"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Bạn cần trợ giúp?</Label>
            <RadioGroup
              defaultValue="booking"
              className="space-y-2"
              onValueChange={(value) => handleRadioChange("helpType", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="booking" id="booking" />
                <Label htmlFor="booking">Đặt vé</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="feedback" id="feedback" />
                <Label htmlFor="feedback">Phản hồi góp ý dịch vụ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="locations" id="locations" />
                <Label htmlFor="locations">Thông tin các điểm giao dịch</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="schedules" id="schedules" />
                <Label htmlFor="schedules">Thông tin khởi hành và giá vé</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Yêu cầu hỗ trợ khác</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Nội dung</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Nhập nội dung cần hỗ trợ"
              rows={4}
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full bg-futa-orange hover:bg-futa-orange/90">
            Gửi
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

