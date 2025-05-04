"use client"

import { useState } from "react"
import { Search, Filter, Plus, Edit, Trash, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

type Promotion = {
  id: string
  name: string
  description: string
  discountRate: number
  code: string
  startDate: string
  endDate: string
  status: "active" | "upcoming" | "expired"
}

const mockPromotions: Promotion[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `PROMO${10000 + i}`,
  name: `Khuyến mãi ${i + 1}`,
  description: i % 3 === 0 ? "Giảm giá cho khách hàng mới" : i % 3 === 1 ? "Khuyến mãi dịp lễ" : "Ưu đãi đặc biệt",
  discountRate: ((i % 5) + 1) * 5,
  code: `SAVE${i * 5 + 10}`,
  startDate: `01/0${(i % 9) + 1}/2025`,
  endDate: `30/0${(i % 9) + 1}/2025`,
  status: i < 3 ? "upcoming" : i < 7 ? "active" : "expired",
}))

const statusMap = {
  active: { label: "Đang hoạt động", variant: "success" },
  upcoming: { label: "Sắp diễn ra", variant: "warning" },
  expired: { label: "Đã hết hạn", variant: "destructive" },
}

export default function PromotionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    discountRate: "",
    code: "",
    startDate: "",
    endDate: "",
  })

  const filteredPromotions = mockPromotions.filter((promotion) => {
    // Search filter
    if (
      searchQuery &&
      !promotion.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !promotion.code.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Status filter
    if (statusFilter !== "all" && promotion.status !== statusFilter) {
      return false
    }

    return true
  })

  const handleAddPromotion = () => {
    // Validate form
    if (!formData.name || !formData.discountRate || !formData.code || !formData.startDate || !formData.endDate) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin.",
        variant: "destructive",
      })
      return
    }

    // Validate discount rate
    const discountRate = Number(formData.discountRate)
    if (isNaN(discountRate) || discountRate <= 0 || discountRate > 100) {
      toast({
        title: "Lỗi",
        description: "Tỷ lệ giảm giá phải là số từ 1 đến 100.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Thêm khuyến mãi thành công",
      description: `Khuyến mãi "${formData.name}" đã được thêm.`,
    })

    setFormData({
      name: "",
      description: "",
      discountRate: "",
      code: "",
      startDate: "",
      endDate: "",
    })

    setShowAddDialog(false)
  }

  const handleEditPromotion = () => {
    if (!selectedPromotion) return

    toast({
      title: "Cập nhật khuyến mãi thành công",
      description: `Khuyến mãi "${selectedPromotion.name}" đã được cập nhật.`,
    })

    setShowEditDialog(false)
    setSelectedPromotion(null)
  }

  const handleDeletePromotion = (promotion: Promotion) => {
    toast({
      title: "Xóa khuyến mãi thành công",
      description: `Khuyến mãi "${promotion.name}" đã được xóa.`,
    })
  }

  const openEditDialog = (promotion: Promotion) => {
    setSelectedPromotion(promotion)
    setFormData({
      name: promotion.name,
      description: promotion.description,
      discountRate: promotion.discountRate.toString(),
      code: promotion.code,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
    })
    setShowEditDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý khuyến mãi</h1>
          <p className="text-muted-foreground">Tạo và quản lý các chương trình khuyến mãi</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm khuyến mãi
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full items-center gap-2 md:w-auto">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm theo tên hoặc mã khuyến mãi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[300px]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Đang hoạt động</SelectItem>
                  <SelectItem value="upcoming">Sắp diễn ra</SelectItem>
                  <SelectItem value="expired">Đã hết hạn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên CT</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Tỷ lệ giảm</TableHead>
                  <TableHead>Mã KM</TableHead>
                  <TableHead>Thời gian áp dụng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromotions.length > 0 ? (
                  filteredPromotions.map((promotion) => (
                    <TableRow key={promotion.id}>
                      <TableCell className="font-medium">{promotion.name}</TableCell>
                      <TableCell>
                        <p className="max-w-[200px] truncate">{promotion.description}</p>
                      </TableCell>
                      <TableCell>{promotion.discountRate}%</TableCell>
                      <TableCell>
                        <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">{promotion.code}</code>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            {promotion.startDate} - {promotion.endDate}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            statusMap[promotion.status].variant as
                              | "default"
                              | "secondary"
                              | "destructive"
                              | "outline"
                              | "success"
                              | "warning"
                          }
                        >
                          {statusMap[promotion.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(promotion)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Chỉnh sửa</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeletePromotion(promotion)}>
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Xóa</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Không tìm thấy khuyến mãi nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Thêm khuyến mãi mới</DialogTitle>
            <DialogDescription>Tạo chương trình khuyến mãi mới cho khách hàng</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên chương trình</Label>
                <Input
                  id="name"
                  placeholder="Nhập tên chương trình"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="code">Mã khuyến mãi</Label>
                <Input
                  id="code"
                  placeholder="Ví dụ: SUMMER2025"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                placeholder="Mô tả chi tiết về chương trình khuyến mãi"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="discount-rate">Tỷ lệ giảm (%)</Label>
                <Input
                  id="discount-rate"
                  type="number"
                  min="1"
                  max="100"
                  placeholder="10"
                  value={formData.discountRate}
                  onChange={(e) => setFormData({ ...formData, discountRate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="start-date">Ngày bắt đầu</Label>
                <Input
                  id="start-date"
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end-date">Ngày kết thúc</Label>
                <Input
                  id="end-date"
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddPromotion}>Thêm khuyến mãi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa khuyến mãi</DialogTitle>
            <DialogDescription>Cập nhật thông tin chương trình khuyến mãi</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Tên chương trình</Label>
                <Input
                  id="edit-name"
                  placeholder="Nhập tên chương trình"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-code">Mã khuyến mãi</Label>
                <Input
                  id="edit-code"
                  placeholder="Ví dụ: SUMMER2025"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-description">Mô tả</Label>
              <Textarea
                id="edit-description"
                placeholder="Mô tả chi tiết về chương trình khuyến mãi"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-discount-rate">Tỷ lệ giảm (%)</Label>
                <Input
                  id="edit-discount-rate"
                  type="number"
                  min="1"
                  max="100"
                  placeholder="10"
                  value={formData.discountRate}
                  onChange={(e) => setFormData({ ...formData, discountRate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-start-date">Ngày bắt đầu</Label>
                <Input
                  id="edit-start-date"
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-end-date">Ngày kết thúc</Label>
                <Input
                  id="edit-end-date"
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleEditPromotion}>Cập nhật</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
