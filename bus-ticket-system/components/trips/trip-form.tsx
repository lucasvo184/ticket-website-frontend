"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

interface TripFormProps {
  trip?: any
  onSubmit: () => void
}

export function TripForm({ trip, onSubmit }: TripFormProps) {
  const isEditing = !!trip

  const [formData, setFormData] = useState({
    id: trip?.id || "",
    busId: trip?.busId || "",
    busType: trip?.busType || "",
    seats: trip?.seats || "",
    departure: trip?.departure || "",
    destination: trip?.destination || "",
    date: trip ? new Date(trip.departureTime) : new Date(),
    time: trip ? format(new Date(trip.departureTime), "HH:mm") : "08:00",
    price: trip?.price || "",
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (
      !formData.id ||
      !formData.busId ||
      !formData.busType ||
      !formData.seats ||
      !formData.departure ||
      !formData.destination ||
      !formData.price
    ) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would call an API to save the trip
    console.log("Saving trip:", formData)

    toast({
      title: isEditing ? "Cập nhật thành công" : "Thêm mới thành công",
      description: `Chuyến đi ${formData.id} đã được ${isEditing ? "cập nhật" : "thêm"} vào hệ thống`,
    })

    onSubmit()
  }

  // Sample data for dropdowns
  const busTypes = ["Limousine", "Giường nằm", "Ghế ngồi"]
  const locations = ["Hà Nội", "Hải Phòng", "Nam Định", "Thanh Hóa", "Ninh Bình", "Quảng Ninh"]

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="id">Mã chuyến xe</Label>
            <Input
              id="id"
              value={formData.id}
              onChange={(e) => handleChange("id", e.target.value)}
              disabled={isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="busId">Mã xe</Label>
            <Input id="busId" value={formData.busId} onChange={(e) => handleChange("busId", e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="busType">Loại xe</Label>
            <Select value={formData.busType} onValueChange={(value) => handleChange("busType", value)}>
              <SelectTrigger id="busType">
                <SelectValue placeholder="Chọn loại xe" />
              </SelectTrigger>
              <SelectContent>
                {busTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seats">Số chỗ</Label>
            <Input
              id="seats"
              type="number"
              value={formData.seats}
              onChange={(e) => handleChange("seats", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="departure">Bến đi</Label>
            <Select value={formData.departure} onValueChange={(value) => handleChange("departure", value)}>
              <SelectTrigger id="departure">
                <SelectValue placeholder="Chọn bến đi" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Bến đến</Label>
            <Select value={formData.destination} onValueChange={(value) => handleChange("destination", value)}>
              <SelectTrigger id="destination">
                <SelectValue placeholder="Chọn bến đến" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Ngày khởi hành</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(formData.date, "dd/MM/yyyy", { locale: vi }) : <span>Chọn ngày</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => handleChange("date", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Giờ khởi hành</Label>
            <div className="relative">
              <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="time"
                type="time"
                className="pl-8"
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Giá vé (VNĐ)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit">{isEditing ? "Cập nhật" : "Thêm mới"}</Button>
      </DialogFooter>
    </form>
  )
}
