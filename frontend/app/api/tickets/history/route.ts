import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

function parseBackendDateTime(dateTimeStr: string): string {
    try {
        if (!dateTimeStr) return new Date().toISOString();
        
        // The backend sends dates in format: "yyyy-MM-dd HH:mm:ss.SSSSSS"
        // First, remove the microseconds part
        const withoutMicroseconds = dateTimeStr.split('.')[0];
        
        // Convert to ISO format without forcing UTC (no 'Z' suffix)
        const isoFormat = withoutMicroseconds.replace(' ', 'T');
        
        // Create date object in local timezone
        const date = new Date(isoFormat);
        
        console.log('Parsing date:', {
            input: dateTimeStr,
            withoutMicroseconds,
            isoFormat,
            localString: date.toString()
        });
        
        // Return ISO string but preserve the local timezone
        return isoFormat;
    } catch (e) {
        console.error('Error parsing date:', e, 'for input:', dateTimeStr);
        return new Date().toISOString();
    }
}

export async function GET(request: NextRequest) {
    try {
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
        
        // Lấy userId từ URL query string (nếu có - để test)
        const url = new URL(request.url);
        const userIdFromQuery = url.searchParams.get('userId');
        console.log('UserId from query:', userIdFromQuery);
        
        // Ưu tiên theo thứ tự: query > header > cookie > default
        let userId = userIdFromQuery || userIdFromHeader || userIdCookie?.value || '3';
        
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
        
        console.log('Using userId for API call:', userId);
        
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
        const apiUrl = `${backendUrl}/api/bookings/customer/${userId}`;
        
        console.log('Fetching booking history from:', apiUrl);
        
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': userId
            },
            cache: 'no-store'
        });
        
        if (!response.ok) {
            console.error('Error fetching booking history. Status:', response.status);
            const errorText = await response.text();
            console.error('Error response:', errorText);
            
            return NextResponse.json(
                { error: 'Không thể lấy lịch sử đặt vé', details: errorText },
                { status: response.status }
            );
        }
        
        const data = await response.json();
        console.log('Booking history fetched successfully, count:', Array.isArray(data) ? data.length : 'N/A');
        
        // Transform the data to match frontend structure
        const transformedData = Array.isArray(data) ? data.map((booking: any) => {
            console.log('Processing booking:', booking); // Log each booking for debugging
            
            // Parse dates using the helper function
            const bookingDateTime = parseBackendDateTime(booking.bookingTime);
            const departureTime = parseBackendDateTime(booking.departureTime);
            
            console.log('Parsed dates:', {
                original: {
                    bookingTime: booking.bookingTime,
                    departureTime: booking.departureTime
                },
                parsed: {
                    bookingDateTime,
                    departureTime
                }
            });

            return {
                id: booking.id,
                bookingCode: booking.id.toString(),
                bookingDateTime,
                cost: booking.price || 0,
                status: booking.status || 'UNKNOWN',
                seat: {
                    seatNumber: booking.seatNumber || 'N/A'
                },
                trip: {
                    origin: booking.origin || 'N/A',
                    destination: booking.destination || 'N/A',
                    departureTime
                }
            };
        }) : [];

        console.log('Transformed data:', transformedData);
        return NextResponse.json(transformedData);
    } catch (error) {
        console.error('Error in tickets history API:', error);
        return NextResponse.json(
            { error: 'Lỗi khi lấy lịch sử đặt vé', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
} 