"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    fullName: "Đặng Khoa",
    phone: "0773914830",
    gender: "",
    email: "donguyendangkhoa0403@gmail.com",
    birthDate: "",
    address: "",
    occupation: "",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [tempProfileData, setTempProfileData] = useState({ ...profileData })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTempProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setTempProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = () => {
    setTempProfileData({ ...profileData })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleSave = () => {
    setProfileData({ ...tempProfileData })
    setIsEditing(false)
    console.log("Saving profile:", tempProfileData)
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-white border-b">
        <CardTitle className="text-xl">Thông tin tài khoản</CardTitle>
        <p className="text-sm text-gray-500">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input id="fullName" name="fullName" value={tempProfileData.fullName} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" name="phone" value={tempProfileData.phone} disabled className="bg-gray-100" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Giới tính</Label>
                    <Select
                      value={tempProfileData.gender}
                      onValueChange={(value) => handleSelectChange("gender", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn giới tính" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Nam</SelectItem>
                        <SelectItem value="female">Nữ</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={tempProfileData.email} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Ngày sinh</Label>
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={tempProfileData.birthDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occupation">Nghề nghiệp</Label>
                    <Input
                      id="occupation"
                      name="occupation"
                      value={tempProfileData.occupation}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input id="address" name="address" value={tempProfileData.address} onChange={handleChange} />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={handleCancel}>
                    Hủy
                  </Button>
                  <Button className="bg-futa-orange hover:bg-futa-orange/90" onClick={handleSave}>
                    Cập nhật
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Họ và tên</p>
                    <p className="font-medium">{profileData.fullName}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Số điện thoại</p>
                    <p className="font-medium">{profileData.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Giới tính</p>
                    <p className="font-medium">
                      {profileData.gender === "male"
                        ? "Nam"
                        : profileData.gender === "female"
                          ? "Nữ"
                          : profileData.gender === "other"
                            ? "Khác"
                            : ""}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{profileData.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Ngày sinh</p>
                    <p className="font-medium">{profileData.birthDate || "Invalid date"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Nghề nghiệp</p>
                    <p className="font-medium">{profileData.occupation || ""}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Địa chỉ</p>
                  <p className="font-medium">{profileData.address || ""}</p>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-futa-orange hover:bg-futa-orange/90" onClick={handleEdit}>
                    Cập nhật
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100">
              <Image src="/placeholder.svg?height=128&width=128" alt="Profile" fill className="object-cover" />
            </div>
            <Button variant="outline" className="mb-2">
              Chọn ảnh
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Dung lượng file tối đa 1 MB
              <br />
              Định dạng: JPEG, PNG
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

