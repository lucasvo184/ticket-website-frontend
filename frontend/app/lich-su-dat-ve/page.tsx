"use client";

import { useEffect, useState } from "react";

interface Trip {
    origin: string;
    destination: string;
    departureTime: string;
}

interface Seat {
    seatNumber: string;
}

interface Ticket {
    id: number;
    bookingCode: string;
    bookingDateTime: string;
    cost: number;
    status: string;
    seat: Seat;
    trip: Trip;
}

function formatDateTime(isoString: string): string {
    try {
        if (!isoString) return 'Invalid date';
        
        // Parse the ISO string to a Date object
        const date = new Date(isoString);
        
        // Format for Vietnam timezone
        return new Intl.DateTimeFormat('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour12: false,
            timeZone: 'Asia/Ho_Chi_Minh'
        }).format(date);
    } catch (error) {
        console.error('Error formatting date:', error, 'for input:', isoString);
        return 'Invalid date';
    }
}

export default function BookingHistory() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookingHistory = async () => {
            try {
                // Lấy userId từ sessionStorage
                const userId = sessionStorage.getItem('userId');
                console.log('Using userId for history:', userId);

                // Gọi API lấy lịch sử đặt vé
                const response = await fetch('/api/tickets/history', {
                    cache: 'no-store'
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch booking history');
                }
                
                const data = await response.json();
                
                // Log để kiểm tra dữ liệu
                console.log('Received booking data:', data.map((ticket: Ticket) => ({
                    id: ticket.id,
                    bookingDateTime: ticket.bookingDateTime,
                    departureTime: ticket.trip?.departureTime,
                    formattedBookingTime: formatDateTime(ticket.bookingDateTime),
                    formattedDepartureTime: formatDateTime(ticket.trip?.departureTime)
                })));
                
                setTickets(data);
            } catch (err) {
                console.error('Error fetching booking history:', err);
                setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải lịch sử đặt vé');
            } finally {
                setLoading(false);
            }
        };
        
        fetchBookingHistory();
    }, []);

    const handleCancelTicket = async (ticketId: number, bookingCode: string) => {
        if (confirm(`Bạn có chắc chắn muốn hủy vé ${bookingCode} không?`)) {
            try {
                console.log('Cancelling ticket with ID:', ticketId);
                const response = await fetch(`/api/bookings/${ticketId}/cancel`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                console.log('Cancellation response status:', response.status);
                const data = await response.json();
                console.log('Cancellation response:', data);
                
                if (!response.ok) {
                    throw new Error(data.details || data.error || 'Có lỗi xảy ra khi hủy vé');
                }
                
                alert('Hủy vé thành công!');
                
                // Cập nhật danh sách vé
                setTickets(prevTickets => 
                    prevTickets.map(ticket => 
                        ticket.id === ticketId 
                            ? {...ticket, status: 'CANCELED'} 
                            : ticket
                    )
                );
            } catch (error) {
                console.error('Error cancelling ticket:', error);
                alert(error instanceof Error ? error.message : 'Có lỗi xảy ra khi hủy vé. Vui lòng thử lại sau.');
            }
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Lịch sử đặt vé</h1>
                <div className="flex justify-center items-center h-64">
                    <p>Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Lịch sử đặt vé</h1>
                <div className="flex justify-center items-center h-64">
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Lịch sử đặt vé</h1>
            
            {tickets.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    <p>Bạn chưa có lịch sử đặt vé nào.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mã đặt vé
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thời gian đặt
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thời gian khởi hành
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tổng tiền
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tickets.map((ticket: Ticket) => (
                                <tr key={ticket.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {ticket.bookingCode}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {formatDateTime(ticket.bookingDateTime)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {formatDateTime(ticket.trip.departureTime)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ticket.cost)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            ticket.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                            ticket.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                            ticket.status === 'WAITING' ? 'bg-yellow-100 text-yellow-800' :
                                            ticket.status === 'CANCELLED' || ticket.status === 'CANCELED' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {ticket.status === 'CONFIRMED' ? 'Hoạt động' :
                                             ticket.status === 'ACTIVE' ? 'Hoạt động' :
                                             ticket.status === 'WAITING' ? 'Chờ xử lý' :
                                             ticket.status === 'CANCELLED' || ticket.status === 'CANCELED' ? 'Đã hủy' :
                                             ticket.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {(ticket.status === 'CONFIRMED' || ticket.status === 'ACTIVE' || ticket.status === 'WAITING') && (
                                            <button
                                                onClick={() => handleCancelTicket(ticket.id, ticket.bookingCode)}
                                                className="text-red-600 hover:text-red-900 px-4 py-2 rounded-md border border-red-600 hover:bg-red-50"
                                            >
                                                Hủy vé
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
} 