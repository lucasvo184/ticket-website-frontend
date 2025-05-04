"use client"

import { useState } from "react"
import { Eye, Search, Filter, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

type CancelRequest = {
  id: string
  ticketId: string
  customerName: string
  route: string
  datetime: string
  reason: string
  requestTime: string
  status: "pending" | "approved" | "rejected"
}

const mockCancelRequests: CancelRequest[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `CR${10000 + i}`,
  ticketId: `BT${20000 + i}`,
  customerName: `Nguyễn Văn ${String.fromCharCode(65 + i)}`,
  route: i % 2 === 0 ? "Hà Nội - Hồ Chí Minh" : "Đà Nẵng - Hà Nội",
  datetime: `${(i % 12) + 1}:00 ${20 + i}/04/2025`,
  reason: i % 3 === 0 ? "Có việc đột xuất không thể đi được" : i % 3 === 1 ? "Thay đổi lịch trình" : "Lý do cá nhân",
  requestTime: `${(i % 12) + 1}:${(i * 5) % 60} ${20 + i}/04/2025`,
  status: i < 3 ? "pending" : i < 7 ? "approved" : "rejected",
}))

const statusMap = {
  pending: { label: "Đang chờ", variant: "warning" },
  approved: { label: "Đã chấp nhận", variant: "success" },
  rejected: { label: "Đã từ chối", variant: "destructive" },
}

export default function CanceledTicketsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<CancelRequest | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  const filteredRequests = mockCancelRequests.filter((request) => {
    // Search filter
    if (
      searchQuery &&
      !request.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Status filter
    if (statusFilter !== "all" && request.status !== statusFilter) {
      return false
    }

    return true
  })

  const handleApprove = () => {
    if (!selectedRequest) return

    toast({
      title: "Yêu cầu đã được chấp nhận",
      description: `Vé ${selectedRequest.ticketId} đã được hủy thành công.`,
    })

    setSelectedRequest(null)
  }

  const handleReject = () => {
    if (!selectedRequest) return

    toast({
      title: "Yêu cầu đã bị từ chối",
      description: `Vé ${selectedRequest.ticketId} vẫn được giữ nguyên.`,
    })

    setRejectReason("")
    setShowRejectDialog(false)
    setSelectedRequest(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Danh sách hủy vé</h1>
        <p className="text-muted-foreground">Xem và xử lý các yêu cầu hủy vé</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full items-center gap-2 md:w-auto">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm theo mã vé hoặc tên khách hàng..."
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
                  <SelectItem value="pending">Đang chờ</SelectItem>
                  <SelectItem value="approved">Đã chấp nhận</SelectItem>
                  <SelectItem value="rejected">Đã từ chối</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã yêu cầu</TableHead>
                  <TableHead>Mã vé</TableHead>
                  <TableHead>Tên KH</TableHead>
                  <TableHead>Thông tin chuyến</TableHead>
                  <TableHead>Lý do hủy</TableHead>
                  <TableHead>Thời gian yêu cầu</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.ticketId}</TableCell>
                      <TableCell>{request.customerName}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{request.route}</p>
                          <p className="text-xs text-muted-foreground">{request.datetime}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="max-w-[200px] truncate text-sm">{request.reason}</p>
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
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedRequest(request)}
                          disabled={request.status !== "pending"}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Xem chi tiết</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Không tìm thấy yêu cầu nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chi tiết yêu cầu hủy vé</DialogTitle>
            <DialogDescription>Xem xét yêu cầu hủy vé và quyết định chấp nhận hoặc từ chối</DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="mb-2 font-medium">Thông tin yêu cầu</h3>
                  <p className="text-sm">Mã yêu cầu: {selectedRequest.id}</p>
                  <p className="text-sm">Mã vé: {selectedRequest.ticketId}</p>
                  <p className="text-sm">Thời gian yêu cầu: {selectedRequest.requestTime}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Thông tin hành khách</h3>
                  <p className="text-sm">Tên: {selectedRequest.customerName}</p>
                </div>
              </div>

              <div className="mt-2">
                <h3 className="mb-2 font-medium">Thông tin chuyến xe</h3>
                <p className="text-sm">Tuyến: {selectedRequest.route}</p>
                <p className="text-sm">Thời gian: {selectedRequest.datetime}</p>
              </div>

              <div className="mt-2">
                <h3 className="mb-2 font-medium">Lý do hủy vé</h3>
                <div className="rounded-md border p-2">
                  <p className="text-sm">{selectedRequest.reason}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowRejectDialog(true)}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Từ chối
                </Button>
                <Button onClick={handleApprove}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Chấp nhận
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Từ chối yêu cầu hủy vé</DialogTitle>
            <DialogDescription>Vui lòng nhập lý do từ chối để thông báo cho khách hàng</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Nhập lý do từ chối..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleReject} disabled={!rejectReason.trim()}>
              Xác nhận từ chối
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
