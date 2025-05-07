import { NextResponse } from 'next/server';

const backendUrl = 'https://ticket-website-backend-production.up.railway.app';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const seatId = params.id;
    
    console.log('Fetching seat details for ID:', seatId, 'from:', backendUrl);
    
    const response = await fetch(`${backendUrl}/api/seats/${seatId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      cache: 'no-store',
      next: { revalidate: 0 }
    }).catch(error => {
      console.error('Network error:', error);
      throw new Error('Không thể kết nối đến máy chủ');
    });

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      console.error('Invalid content type:', contentType);
      return NextResponse.json(
        { error: 'Phản hồi không hợp lệ từ máy chủ' },
        { status: 500 }
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching seat:', errorText);
      return NextResponse.json(
        { error: 'Không thể lấy thông tin ghế' },
        { status: response.status }
      );
    }

    const seatData = await response.json();
    console.log('Seat data:', seatData);

    return NextResponse.json(seatData);
  } catch (error) {
    console.error('Error getting seat details:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Có lỗi xảy ra khi lấy thông tin ghế' },
      { status: 500 }
    );
  }
} 