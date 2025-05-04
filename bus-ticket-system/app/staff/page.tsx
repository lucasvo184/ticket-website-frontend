"use client"

import { useState } from "react"
import { Eye, Lock, Plus, Search, Trash, Unlock, UserCog } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { StaffForm } from "@/components/staff/staff-form"
import { StaffDetails } from "@/components/staff/staff-details"

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<any>(null)

  // Sample data - in a real app, this would come from an API
  const staffMembers = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0987654321",
      role: "Quản lý",
      status: "active",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0987654322",
      role: "Nhân viên bán vé",
      status: "active",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@example.com",
      phone: "0987654323",
      role: "Lái xe",
      status: "active",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      phone: "0987654324",
      role: "Nhân viên bán vé",
      status: "locked",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      email: "hoangvane@example.com",
      phone: "0987654325",
      role: "Lái xe",
      status: "active",
    },
  ]

  const handleView = (staff: any) => {
    setSelectedStaff(staff)
    setIsViewDialogOpen(true)
  }

  const handleEdit = (staff: any) => {
    setSelectedStaff(staff)
    setIsEditDialogOpen(true)
  }

  const handleToggleLock = (staffId: number) => {
    // In a real app, this would call an API to lock/unlock the staff
    console.log(`Toggling lock for staff ${staffId}`)
    // Then refresh the data
  }

  const handleDelete = (staffId: number) => {
    // In a real app, this would call an API to delete the staff
    console.log(`Deleting staff ${staffId}`)
    // Then refresh the data
  }

  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.phone.includes(searchTerm)

    const matchesStatus = !statusFilter || staff.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý nhân viên</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm nhân viên
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Thêm nhân viên mới</DialogTitle>
              <DialogDescription>Điền đầy đủ thông tin để tạo tài khoản nhân viên mới</DialogDescription>
            </DialogHeader>
            <StaffForm onSubmit={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm và lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="search">Tìm kiếm</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Tên, email, số điện thoại..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Trạng thái</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="locked">Đã khóa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium">{staff.name}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.phone}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>
                    <Badge variant={staff.status === "active" ? "default" : "secondary"}>
                      {staff.status === "active" ? "Hoạt động" : "Đã khóa"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleView(staff)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Xem</span>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleEdit(staff)}>
                        <UserCog className="h-4 w-4" />
                        <span className="sr-only">Sửa</span>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleToggleLock(staff.id)}>
                        {staff.status === "active" ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                        <span className="sr-only">{staff.status === "active" ? "Khóa" : "Mở khóa"}</span>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(staff.id)}>
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Xóa</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Thông tin nhân viên</DialogTitle>
          </DialogHeader>
          {selectedStaff && <StaffDetails staff={selectedStaff} />}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa nhân viên</DialogTitle>
            <DialogDescription>Cập nhật thông tin nhân viên</DialogDescription>
          </DialogHeader>
          {selectedStaff && <StaffForm staff={selectedStaff} onSubmit={() => setIsEditDialogOpen(false)} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
