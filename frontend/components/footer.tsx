import Link from "next/link"
import Image from "next/image"
import { Facebook, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <div className="flex flex-col gap-2">
              <h3 className="text-futa-green font-bold">TRUNG TÂM TỔNG ĐÀI & CSKH</h3>
              <p className="text-futa-orange text-2xl font-bold">1900 6067</p>
            </div>

            <div className="mt-4">
              <h4 className="font-bold text-sm">CÔNG TY CỔ PHẦN XE KHÁCH PHƯƠNG TRANG - FUTA BUS LINES</h4>
              <p className="text-sm mt-2">
                Địa chỉ: Số 01 Tô Hiến Thành, Phường 3, Thành phố Đà Lạt, Tỉnh Lâm Đồng, Việt Nam.
              </p>
              <p className="text-sm mt-2">
                Email:{" "}
                <Link href="mailto:hotro@futa.vn" className="text-futa-orange">
                  hotro@futa.vn
                </Link>
              </p>
              <p className="text-sm mt-2">Điện thoại: 02838386852</p>
              <p className="text-sm mt-2">Fax: 02838386853</p>
            </div>

            <div className="mt-4">
              <h4 className="font-bold text-sm">TẢI APP FUTA</h4>
              <div className="flex gap-2 mt-2">
                <Link href="#" className="bg-green-600 text-white px-3 py-1 rounded text-xs">
                  CH Play
                </Link>
                <Link href="#" className="bg-black text-white px-3 py-1 rounded text-xs">
                  App Store
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/bocongthuong.png"
                alt="Bộ Công Thương"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-xs">
                ĐÃ THÔNG BÁO
                <br />
                BỘ CÔNG THƯƠNG
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-sm">FUTA Bus Lines</h4>
                <ul className="mt-2 space-y-2">
                  <li className="text-xs flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <Link href="/ve-chung-toi">Về chúng tôi</Link>
                  </li>
                  <li className="text-xs flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <Link href="/lich-trinh">Lịch trình</Link>
                  </li>
                  <li className="text-xs flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <Link href="#">Tuyển dụng</Link>
                  </li>
                  <li className="text-xs flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <Link href="/tin-tuc">Tin tức & Sự kiện</Link>
                  </li>
                  <li className="text-xs flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <Link href="#">Mạng lưới văn phòng</Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-sm">Hỗ trợ</h4>
                <ul className="mt-2 space-y-2">
                  <li className="text-xs flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <Link href="/tra-cuu-ve">Tra cứu thông tin đặt vé</Link>
                  </li>
                  <li className="text-xs flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <Link href="#">Điều khoản sử dụng</Link>
                  </li>
                  <li className="text-xs flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <Link href="#">Câu hỏi thường gặp</Link>
                  </li>
                  <li className="text-xs flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <Link href="/huong-dan-dat-ve">Hướng dẫn đặt vé trên Web</Link>
                  </li>
                  <li className="text-xs flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <Link href="#">Hướng dẫn nạp tiền trên App</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-bold text-sm">KẾT NỐI CHÚNG TÔI</h4>
              <div className="flex gap-2 mt-2">
                <Link href="#" className="text-blue-600">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-red-600">
                  <Youtube className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link href="#">
              <Image
                src="/images/logo-futa.png"
                alt="FUTA Bus Lines"
                width={150}
                height={60}
                className="object-contain"
              />
            </Link>
            <Link href="#">
              <Image
                src="/images/logo-futa.png"
                alt="FUTA Express"
                width={150}
                height={60}
                className="object-contain"
              />
            </Link>
            <Link href="#">
              <Image
                src="/images/logo-futa.png"
                alt="FUTA Advertising"
                width={150}
                height={60}
                className="object-contain"
              />
            </Link>
            <Link href="#">
              <Image
                src="/images/logo-futa.png"
                alt="Phúc Lộc Rest Stop"
                width={150}
                height={60}
                className="object-contain"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-futa-green text-white py-3 text-center text-xs">
        © 2023 | Bản quyền thuộc về Công ty Cổ Phần Xe khách Phương Trang - FUTA Bus Lines 2023 | Chịu trách nhiệm quản
        lý nội dung: Ông Võ Duy Thành
      </div>
    </footer>
  )
}

