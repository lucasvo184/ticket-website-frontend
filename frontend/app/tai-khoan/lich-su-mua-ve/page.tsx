'use client'

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface TicketHistory {
  id: number
  bookingCode: string
  bookingDateTime: string
  cost: number
  status: string
  seat: {
    seatNumber: string
  }
  trip: {
    origin: string
    destination: string
    departureTime: string
  }
}

export default function TicketHistoryPage() {
  const [tickets, setTickets] = useState<TicketHistory[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchTicketHistory()
  }, [])

  const fetchTicketHistory = async () => {
    try {
      setLoading(true);
      console.log('=== Fetching ticket history ===');
      
      const response = await fetch('/api/tickets/history');
      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to fetch ticket history');
      }
      
      if (Array.isArray(data)) {
        console.log('Setting tickets:', data);
        setTickets(data);
      } else if (data.error) {
        throw new Error(data.details || data.error);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error in fetchTicketHistory:', error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: error instanceof Error 
          ? `Không thể tải lịch sử vé: ${error.message}`
          : "Không thể tải lịch sử vé. Vui lòng thử lại sau.",
      });
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (ticketId: string) => {
    try {
      console.log('Cancelling booking with ID:', ticketId);
      const response = await fetch(`/api/bookings/${ticketId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Cancellation response status:', response.status);
      const data = await response.json();
      console.log('Cancellation response:', data);

      if (!response.ok) {
        console.error('Failed to cancel booking:', data);
        toast({
          title: 'Lỗi',
          description: data.details || data.error || 'Không thể hủy vé. Vui lòng thử lại sau.',
          variant: 'destructive',
        });
        return;
      }

      // Refresh ticket list after successful cancellation
      await fetchTicketHistory();
      
      toast({
        title: 'Thành công',
        description: 'Đã hủy vé thành công.',
      });
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast({
        title: 'Lỗi',
        description: error instanceof Error ? error.message : 'Đã xảy ra lỗi khi hủy vé.',
        variant: 'destructive',
      });
    }
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Lịch sử mua vé</CardTitle>
        <p className="text-sm text-gray-500">Theo dõi và quản lý quá trình lịch sử mua vé của bạn</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="ticket-id">Mã vé</Label>
              <Input id="ticket-id" placeholder="Nhập Mã vé" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="date">Thời gian</Label>
              <Input id="date" type="date" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="route">Tuyến đường</Label>
              <Input id="route" placeholder="Nhập tuyến đường" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="status">Trạng thái</Label>
              <Select>
                <SelectTrigger id="status" className="mt-1">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="CONFIRMED">Đã hoàn thành</SelectItem>
                  <SelectItem value="WAITING">Đang xử lý</SelectItem>
                  <SelectItem value="CANCELED">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="bg-futa-orange hover:bg-futa-orange/90 gap-2">
              <Search className="h-4 w-4" />
              Tìm
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium">Mã vé</th>
                  <th className="text-left py-2 px-4 font-medium">Số ghế</th>
                  <th className="text-left py-2 px-4 font-medium">Tuyến đường</th>
                  <th className="text-left py-2 px-4 font-medium">Ngày đi</th>
                  <th className="text-left py-2 px-4 font-medium">Số tiền</th>
                  <th className="text-left py-2 px-4 font-medium">Trạng thái</th>
                  <th className="text-left py-2 px-4 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4">Đang tải...</td>
                  </tr>
                ) : tickets.length === 0 ? (
                  <tr className="text-center">
                    <td colSpan={7} className="py-8">
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-gray-400 mb-2">
                          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 9V15"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 12H16"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-500">Không có dữ liệu</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  tickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{ticket.bookingCode}</td>
                      <td className="py-2 px-4">{ticket.seat.seatNumber}</td>
                      <td className="py-2 px-4">{`${ticket.trip.origin} - ${ticket.trip.destination}`}</td>
                      <td className="py-2 px-4">{formatDateTime(ticket.trip.departureTime)}</td>
                      <td className="py-2 px-4">{formatCurrency(ticket.cost)}</td>
                      <td className="py-2 px-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          ticket.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                          ticket.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                          ticket.status === 'WAITING' ? 'bg-yellow-100 text-yellow-800' :
                          ticket.status === 'CANCELLED' || ticket.status === 'CANCELED' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {ticket.status === 'CONFIRMED' ? 'Đã hoàn thành' :
                           ticket.status === 'ACTIVE' ? 'Đã hoàn thành' :
                           ticket.status === 'WAITING' ? 'Đang xử lý' :
                           ticket.status === 'CANCELLED' || ticket.status === 'CANCELED' ? 'Đã hủy' :
                           ticket.status}
                        </span>
                      </td>
                      <td className="py-2 px-4">
                        {(ticket.status === 'WAITING' || ticket.status === 'CONFIRMED' || ticket.status === 'ACTIVE') && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              console.log('Ticket details for cancel:', {
                                id: ticket.id,
                                bookingCode: ticket.bookingCode,
                                status: ticket.status
                              });
                              if (confirm(`Bạn có chắc chắn muốn hủy vé ${ticket.bookingCode} không?`)) {
                                handleCancel(ticket.id.toString());
                              }
                            }}
                          >
                            Hủy vé
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" className="bg-futa-orange text-white hover:bg-futa-orange/90">
              Đặt vé
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

