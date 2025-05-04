import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'

export interface BookTicketRequest {
  seatId: number;
  tripId: number;
  passengerName: string;
  passengerPhone: string;
  passengerEmail: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Booking ticket:', body)

    // Validate required fields
    if (!body.seatId || !body.tripId || !body.passengerName || !body.passengerPhone || !body.passengerEmail) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin đặt vé" },
        { status: 400 }
      )
    }

    // Lấy và log tất cả cookies để debug
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    console.log('All cookies:', allCookies.map(c => `${c.name}=${c.value}`).join('; '));
    
    // Lấy userId từ cookie
    const userIdCookie = cookieStore.get('userId');
    console.log('UserId cookie (từ Next.js cookies()):', userIdCookie);
    
    // Lấy userId từ header (nếu được gửi từ client)
    const userIdFromHeader = request.headers.get('X-User-ID');
    console.log('UserId from header:', userIdFromHeader);
    
    // Ưu tiên theo thứ tự: header > cookie > default
    let userId = userIdFromHeader || userIdCookie?.value || '3';
    
    // Nếu userId vẫn là 3 mặc định, thì kiểm tra xem có trong cookie của request không
    if (userId === '3') {
        const cookieHeader = request.headers.get('cookie');
        console.log('Cookie header:', cookieHeader);
        
        if (cookieHeader) {
            const cookies = cookieHeader.split(';').map(c => c.trim());
            const userIdCookieRaw = cookies.find(c => c.startsWith('userId='));
            
            if (userIdCookieRaw) {
                const potentialUserId = userIdCookieRaw.split('=')[1];
                console.log('UserId found in raw cookie header:', potentialUserId);
                if (potentialUserId && potentialUserId !== '3') {
                    userId = potentialUserId;
                }
            }
        }
    }
    
    console.log('Using userId for booking API call:', userId);

    // First, check seat availability
    const seatCheckResponse = await fetch(`${backendUrl}/api/seats/check/${body.seatId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Disable caching
    })

    const seatData = await seatCheckResponse.json()
    if (!seatCheckResponse.ok || !seatData.available) {
      return NextResponse.json(
        { error: "Ghế đã được đặt, vui lòng chọn ghế khác" },
        { status: 400 }
      )
    }

    // Format the request body according to the backend API requirements
    const bookingRequest = {
      seatId: Number(body.seatId),
      tripId: Number(body.tripId),
      passengerName: body.passengerName,
      passengerPhone: body.passengerPhone,
      passengerEmail: body.passengerEmail
    }

    // Create booking
    const bookingResponse = await fetch(`${backendUrl}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-ID': userId // Thêm userId vào header để backend có thể sử dụng
      },
      body: JSON.stringify(bookingRequest)
    })

    const bookingData = await bookingResponse.json()
    console.log('Booking response:', {
      status: bookingResponse.status,
      ok: bookingResponse.ok,
      userId: userId,
      data: bookingData
    })

    if (!bookingResponse.ok) {
      let errorMessage = "Không thể đặt vé. Vui lòng thử lại sau."
      if (bookingData.error) {
        errorMessage = bookingData.error
      } else if (bookingData.message) {
        errorMessage = bookingData.message
      }
      return NextResponse.json({ error: errorMessage }, { status: bookingResponse.status })
    }

    // Return success response with booking details
    return NextResponse.json({
      success: true,
      ticket: bookingData.data,
      message: bookingData.message || "Đặt vé thành công"
    })

  } catch (error) {
    console.error('Error booking ticket:', error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi đặt vé. Vui lòng thử lại sau." },
      { status: 500 }
    )
  }
}

