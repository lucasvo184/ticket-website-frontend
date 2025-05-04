"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

interface StaffFormProps {
  staff?: any
  onSubmit: () => void
}

export function StaffForm({ staff, onSubmit }: StaffFormProps) {
  const isEditing = !!staff

  const [formData, setFormData] = useState({
    name: staff?.name || "",
    email: staff?.email || "",
    phone: staff?.phone || "",
    role: staff?.role || "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when field is changed
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại"
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải có 10 chữ số"
    }

    if (!formData.role) {
      newErrors.role = "Vui lòng chọn vai trò"
    }

    if (!isEditing) {
      if (!formData.password) {
        newErrors.password = "Vui lòng nhập mật khẩu"
      } else if (formData.password.length < 6) {
        newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu"
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // In a real app, this would call an API to save the staff
    console.log("Saving staff:", formData)

    toast({
      title: isEditing ? "Cập nhật thành công" : "Thêm mới thành công",
      description: `Nhân viên ${formData.name} đã được ${isEditing ? "cập nhật" : "thêm"} vào hệ thống`,
    })

    onSubmit()
  }

  // Sample data for roles dropdown
  const roles = ["Quản lý", "Nhân viên bán vé", "Lái xe"]

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name">Họ tên</Label>
          <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input id="phone" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Vai trò</Label>
          <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Chọn vai trò" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
        </div>

        {!isEditing && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                />
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>
            </div>
          </>
        )}
      </div>

      <DialogFooter>
        <Button type="submit">{isEditing ? "Cập nhật" : "Thêm mới"}</Button>
      </DialogFooter>
    </form>
  )
}
