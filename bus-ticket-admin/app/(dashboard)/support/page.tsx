"use client"

import { useState } from "react"
import { Search, Filter, Phone, Mail, MessageSquare, CheckCircle } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

type SupportRequest = {
  id: string
  customerName: string
  email: string
  phone: string
  subject: string
  message: string
  requestTime: string
  status: "pending" | "in-progress" | "resolved"
}

const mockSupportRequests: SupportRequest[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `SR${10000 + i}`,
  customerName: `Nguyễn Văn ${String.fromCharCode(65 + i)}`,
  email: `customer${i}@example.com`,
  phone: `098765432${i}`,
  subject: i % 3 === 0 ? "Vấn đề về thanh toán" : i % 3 === 1 ? "Không thể đặt vé" : "Câu hỏi về lịch trình",
  message:
    i % 3 === 0
      ? "Tôi đã thanh toán nhưng chưa nhận được vé. Vui lòng kiểm tra giúp tôi."
      : i % 3 === 1
        ? "Tôi không thể đặt vé trên ứng dụng. Luôn báo lỗi khi thanh toán."
        : "Tôi muốn biết thêm thông tin về lịch trình chuyến xe từ Hà Nội đến Hồ Chí Minh.",
  requestTime: `${(i % 12) + 1}:${(i * 5) % 60} ${20 + i}/04/2025`,
  status: i < 3 ? "pending" : i < 7 ? "in-progress" : "resolved",
}))

const statusMap = {
  pending: { label: "Chưa xử lý", variant: "warning" },
  "in-progress": { label: "Đang xử lý", variant: "default" },
  resolved: { label: "Đã xử lý", variant: "success" },
}

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<SupportRequest | null>(null)
  const [replyMessage, setReplyMessage] = useState("")
  const [showReplyDialog, setShowReplyDialog] = useState(false)

  const filteredRequests = mockSupportRequests.filter((request) => {
    // Search filter
    if (
      searchQuery &&
      !request.customerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Status filter
    if (statusFilter !== "all" && request.status !== statusFilter) {
      return false
    }

    return true
  })

  const handleCall = (phone: string) => {
    toast({
      title: "Gọi điện",
      description: `Đang gọi đến số điện thoại ${phone}`,
    })
  }

  const handleReply = () => {
    if (!selectedRequest) return

    toast({
      title: "Gửi phản hồi thành công",
      description: `Phản hồi đã được gửi đến ${selectedRequest.customerName}.`,
    })

    setReplyMessage("")
    setShowReplyDialog(false)
  }

  const handleMarkAsResolved = (request: SupportRequest) => {
    toast({
      title: "Đánh dấu đã xử lý",
      description: `Yêu cầu hỗ trợ từ ${request.customerName} đã được đánh dấu là đã xử lý.`,
    })
  }

  const openReplyDialog = (request: SupportRequest) => {
    setSelectedRequest(request)
    setShowReplyDialog(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hỗ trợ khách hàng</h1>
        <p className="text-muted-foreground">Xem và xử lý các yêu cầu hỗ trợ từ khách hàng</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full items-center gap-2 md:w-auto">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm theo tên, email hoặc chủ đề..."
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
                  <SelectItem value="pending">Chưa xử lý</SelectItem>
                  <SelectItem value="in-progress">Đang xử lý</SelectItem>
                  <SelectItem value="resolved">Đã xử lý</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Người gửi</TableHead>
                  <TableHead>Liên hệ</TableHead>
                  <TableHead>Chủ đề</TableHead>
                  <TableHead>Thời gian gửi</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id} className="cursor-pointer" onClick={() => setSelectedRequest(request)}>
                      <TableCell className="font-medium">{request.customerName}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="mr-2 h-3 w-3 text-muted-foreground" />
                            <span>{request.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="mr-2 h-3 w-3 text-muted-foreground" />
                            <span>{request.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="max-w-[200px] truncate font-medium">{request.subject}</p>
                        <p className="max-w-[200px] truncate text-xs text-muted-foreground">{request.message}</p>
                      </TableCell>
                      <TableCell>{request.requestTime}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            statusMap[request.status].variant as
                              | "default"
                              | "secondary"
                              | "destructive"
                              | "outline"
                              | "success"
                              | "warning"
                          }
                        >
                          {statusMap[request.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <Button variant="outline" size="sm" onClick={() => handleCall(request.phone)}>
                            <Phone className="mr-2 h-4 w-4" />
                            Gọi điện
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => openReplyDialog(request)}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Phản hồi
                          </Button>
                          {request.status !== "resolved" && (
                            <Button variant="outline" size="sm" onClick={() => handleMarkAsResolved(request)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Đánh dấu đã xử lý
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Không tìm thấy yêu cầu hỗ trợ nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedRequest && !showReplyDialog} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chi tiết yêu cầu hỗ trợ</DialogTitle>
            <DialogDescription>Thông tin chi tiết về yêu cầu hỗ trợ từ khách hàng</DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="mb-2 font-medium">Thông tin người gửi</h3>
                  <p className="text-sm">Tên: {selectedRequest.customerName}</p>
                  <p className="text-sm">Email: {selectedRequest.email}</p>
                  <p className="text-sm">SĐT: {selectedRequest.phone}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Thông tin yêu cầu</h3>
                  <p className="text-sm">Mã yêu cầu: {selectedRequest.id}</p>
                  <p className="text-sm">Thời gian gửi: {selectedRequest.requestTime}</p>
                  <p className="text-sm">
                    Trạng thái:
                    <Badge
                      variant={
                        statusMap[selectedRequest.status].variant as
                          | "default"
                          | "secondary"
                          | "destructive"
                          | "outline"
                          | "success"
                          | "warning"
                      }
                      className="ml-2"
                    >
                      {statusMap[selectedRequest.status].label}
                    </Badge>
                  </p>
                </div>
              </div>

              <div className="mt-2">
                <h3 className="mb-2 font-medium">Chủ đề</h3>
                <p className="text-sm font-medium">{selectedRequest.subject}</p>
              </div>

              <div className="mt-2">
                <h3 className="mb-2 font-medium">Nội dung</h3>
                <div className="rounded-md border p-3">
                  <p className="text-sm">{selectedRequest.message}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => handleCall(selectedRequest.phone)}>
                  <Phone className="mr-2 h-4 w-4" />
                  Gọi điện
                </Button>
                <Button onClick={() => openReplyDialog(selectedRequest)}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Phản hồi
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Phản hồi yêu cầu hỗ trợ</DialogTitle>
            <DialogDescription>Gửi phản hồi đến khách hàng qua email</DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Gửi đến:</p>
                  <p className="text-sm">{selectedRequest.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email:</p>
                  <p className="text-sm">{selectedRequest.email}</p>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-sm font-medium">Chủ đề:</p>
                <p className="text-sm">Phản hồi: {selectedRequest.subject}</p>
              </div>

              <div className="mt-2">
                <p className="text-sm font-medium">Nội dung phản hồi:</p>
                <Textarea
                  placeholder="Nhập nội dung phản hồi..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="min-h-[150px] mt-2"
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowReplyDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={handleReply} disabled={!replyMessage.trim()}>
                  Gửi phản hồi
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
