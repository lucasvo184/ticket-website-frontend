import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ticketId = params.id
    const apiUrl = `${backendUrl}/api/bookings/${ticketId}/cancel`
    
    console.log('=== Starting ticket cancellation process ===')
    console.log('Ticket ID:', ticketId)
    console.log('Backend API URL:', apiUrl)

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
    
    console.log('Using userId for cancellation API call:', userId);

    // Call backend API to cancel the ticket
    console.log('Sending request to backend...')
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-User-ID': userId // Thêm userId vào header để backend có thể sử dụng
      },
    })

    console.log('Backend response received')
    console.log('Status:', response.status)
    console.log('Status Text:', response.statusText)
    console.log('Headers:', Object.fromEntries(response.headers.entries()))
    
    const responseText = await response.text()
    console.log('Raw response body:', responseText)
    
    let data
    try {
      data = JSON.parse(responseText)
      console.log('Parsed response data:', data)
    } catch (e) {
      console.error('Failed to parse JSON response:', e)
      console.error('Raw response was:', responseText)
      throw new Error('Invalid JSON response from backend')
    }

    if (!response.ok) {
      console.error('Backend error response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        userId: userId,
        data
      })
      
      return NextResponse.json(
        { 
          error: 'Failed to cancel ticket',
          details: data?.message || data?.error || `Backend request failed: ${response.status} ${response.statusText}`,
          timestamp: new Date().toISOString()
        },
        { status: response.status }
      )
    }

    console.log('=== Ticket cancellation successful ===')
    return NextResponse.json({
      message: 'Ticket cancelled successfully',
      data
    })
  } catch (error) {
    console.error('=== Ticket cancellation failed ===')
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown error',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })
    
    return NextResponse.json(
      { 
        error: 'Failed to cancel ticket',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
} 