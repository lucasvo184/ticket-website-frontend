import { NextResponse } from 'next/server';
import crypto from 'crypto';

const VNP_HASH_SECRET = process.env.VNP_HASH_SECRET || 'YOUR_HASH_SECRET';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());
    
    const secureHash = params['vnp_SecureHash'];
    delete params['vnp_SecureHash'];
    delete params['vnp_SecureHashType'];

    // Sắp xếp các tham số theo thứ tự alphabet
    const sortedParams = sortObject(params);
    
    // Tạo chuỗi ký tự cần kiểm tra
    const signData = Object.entries(sortedParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    // Tạo chữ ký để so sánh
    const hmac = crypto.createHmac('sha512', VNP_HASH_SECRET);
    const signed = hmac.update(signData).digest('hex');

    // So sánh chữ ký
    if (secureHash !== signed) {
      return NextResponse.redirect(new URL('/payment-failed', request.url));
    }

    const vnp_ResponseCode = params['vnp_ResponseCode'];
    if (vnp_ResponseCode === '00') {
      // Thanh toán thành công
      return NextResponse.redirect(new URL('/payment-success', request.url));
    } else {
      // Thanh toán thất bại
      return NextResponse.redirect(new URL('/payment-failed', request.url));
    }
  } catch (error) {
    console.error('Error processing payment return:', error);
    return NextResponse.redirect(new URL('/payment-failed', request.url));
  }
}

// Hàm sắp xếp object theo key
function sortObject(obj: Record<string, any>) {
  const sorted: Record<string, any> = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sorted[key] = obj[key];
    });
  return sorted;
} 