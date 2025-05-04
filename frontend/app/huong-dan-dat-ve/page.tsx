import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, CreditCard, Check, Smartphone, Users, ThumbsUp } from "lucide-react"

export default function BookingGuidePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-white">
        {/* Header Section */}
        <section className="py-8 text-center">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-futa-orange">HƯỚNG DẪN MUA VÉ XE TRÊN WEBSITE </span>
              <span className="text-futa-green">FUTABUS.VN</span>
            </h1>
          </div>
        </section>

        {/* QR Code Section */}
        <section className="py-6 bg-orange-50">
          <div className="container">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold uppercase">QUÉT MÃ QR TẢI APP DÀNH CHO KHÁCH HÀNG</h2>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="relative w-32 h-32">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="FUTA Bus Lines Logo"
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>
              <div className="relative w-32 h-32">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="QR Code"
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Link href="https://play.google.com/store/apps/details?id=vn.futabus.passenger" target="_blank">
                <Button className="bg-green-600 hover:bg-green-700 gap-2">
                  <Smartphone className="h-4 w-4" />
                  CH Play
                </Button>
              </Link>
              <Link href="https://apps.apple.com/vn/app/futa-bus/id1476713335" target="_blank">
                <Button className="bg-black hover:bg-gray-800 gap-2">
                  <Smartphone className="h-4 w-4" />
                  App Store
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Company Introduction */}
        <section className="py-8 bg-orange-50">
          <div className="container">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-center text-futa-orange uppercase mb-4">
                UY TÍN – CHẤT LƯỢNG – DANH DỰ
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Công Ty Cổ phần Xe Khách Phương Trang - FUTA Bus Lines xin gửi lời cảm ơn chân thành đến Quý Khách
                  hàng đã tin tưởng và sử dụng dịch vụ của chúng tôi. Chúng tôi luôn hoạt động với tôn chỉ "Chất lượng
                  là danh dự" và nỗ lực không ngừng để mang đến trải nghiệm dịch vụ tối ưu dành cho Khách hàng.
                </p>
                <p>
                  Chúng tôi không chỉ đảm bảo các chuyến xe an toàn, chất lượng và đúng hẹn, mà còn chú trọng đến trải
                  nghiệm mua vé của Khách hàng. Chúng tôi đã cải tiến website mua vé trực tuyến{" "}
                  <Link href="#" className="text-futa-orange font-medium">
                    Thông tin vé | Ticket Information | FUTA Bus Lines | Tổng Đài đặt vé và Chăm Sóc Khách Hàng 19006067
                  </Link>{" "}
                  để đảm bảo việc mua vé dễ dàng và tiện lợi hơn bao giờ hết.
                </p>
                <p>
                  Bên cạnh đó, chúng tôi tự hào giới thiệu ứng dụng mua vé FUTA Bus, giúp Khách hàng tiết kiệm thời gian
                  mua vé. Qua ứng dụng này, Khách hàng có thể tra cứu thông tin về lịch trình, chọn ghế/giường và thanh
                  toán nhanh chóng, thuận tiện trên điện thoại di động.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 1: Benefits */}
        <section className="py-8 bg-white">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">
              <span className="text-futa-green">Bước 1: Những trải nghiệm nổi bật mà Ứng Dụng Mua Vé </span>
              <span className="text-futa-orange">FUTA Bus</span>
              <span className="text-futa-green"> và Website </span>
              <span className="text-futa-orange">futabus.vn</span>
              <span className="text-futa-green"> mang lại</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border shadow-sm h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="text-futa-orange mb-4">
                    <Clock className="h-16 w-16" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Khách hàng chủ động về lịch trình của mình</h3>
                  <p className="text-gray-600">Từ điểm đón, điểm trả khách đến thời gian hành trình.</p>
                </CardContent>
              </Card>

              <Card className="border shadow-sm h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="text-futa-orange mb-4">
                    <MapPin className="h-16 w-16" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    Khách hàng được chọn và chủ động vị trí, số ghế ngồi trên xe
                  </h3>
                  <p className="text-gray-600">Tự do lựa chọn vị trí ngồi phù hợp với nhu cầu cá nhân.</p>
                </CardContent>
              </Card>

              <Card className="border shadow-sm h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="text-futa-orange mb-4">
                    <ThumbsUp className="h-16 w-16" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Không phải xếp hàng những dịp Lễ, Tết</h3>
                  <p className="text-gray-600">
                    Tiết kiệm thời gian và tránh tình trạng chen lấn trong các dịp cao điểm.
                  </p>
                </CardContent>
              </Card>

              <Card className="border shadow-sm h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="text-futa-orange mb-4">
                    <Users className="h-16 w-16" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    Dễ dàng kết hợp và nhận ưu đãi khi sử dụng dịch vụ khác của Phương Trang
                  </h3>
                  <p className="text-gray-600">Như Taxi, Trạm Dừng, Vận Chuyển Hàng Hoá...</p>
                </CardContent>
              </Card>

              <Card className="border shadow-sm h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="text-futa-orange mb-4">
                    <Check className="h-16 w-16" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    Khi đăng ký thành viên, khách hàng còn nhận nhiều ưu đãi
                  </h3>
                  <p className="text-gray-600">Cũng như nhiều phần quà hấp dẫn từ FUTA Bus Lines.</p>
                </CardContent>
              </Card>

              <Card className="border shadow-sm h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="text-futa-orange mb-4">
                    <CreditCard className="h-16 w-16" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Dễ dàng góp ý để nâng cao chất lượng dịch vụ</h3>
                  <p className="text-gray-600">Phản hồi trực tiếp giúp chúng tôi cải thiện liên tục.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Step 2: Booking Process Overview */}
        <section className="py-8 bg-orange-50">
          <div className="container">
            <h2 className="text-2xl font-bold text-center text-futa-green mb-8">
              Bước 2: Những bước để giúp khách hàng trải nghiệm mua vé nhanh
            </h2>

            <div className="relative max-w-4xl mx-auto mb-8">
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-futa-orange text-white flex items-center justify-center text-2xl font-bold mb-2">
                    01
                  </div>
                  <p className="text-sm">Truy cập vào địa chỉ futabus.vn</p>
                </div>
                <div className="hidden md:block h-0.5 flex-1 bg-gray-300 mx-2"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-2xl font-bold mb-2">
                    02
                  </div>
                  <p className="text-sm">Chọn thông tin hành trình</p>
                </div>
                <div className="hidden md:block h-0.5 flex-1 bg-gray-300 mx-2"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-2xl font-bold mb-2">
                    03
                  </div>
                  <p className="text-sm">Chọn ghế, điểm đón trả, thông tin hành khách</p>
                </div>
                <div className="hidden md:block h-0.5 flex-1 bg-gray-300 mx-2"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-2xl font-bold mb-2">
                    04
                  </div>
                  <p className="text-sm">Chọn phương thức thanh toán</p>
                </div>
                <div className="hidden md:block h-0.5 flex-1 bg-gray-300 mx-2"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-2xl font-bold mb-2">
                    05
                  </div>
                  <p className="text-sm">Mua vé xe thành công</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-center mb-6">
                Bước 1: Truy cập địa chỉ <span className="text-futa-orange">futabus.vn</span>
              </h3>

              <div className="relative max-w-4xl mx-auto">
                <Image
                  src="/images/booking-guide-step2.png"
                  alt="Truy cập website FUTA Bus"
                  width={1000}
                  height={500}
                  className="object-contain mx-auto"
                />
              </div>

              <div className="text-center mt-6">
                <p className="mb-4">
                  Tải ứng dụng tại <span className="text-futa-orange font-medium">futabus.vn</span> hoặc tìm ứng dụng
                  Futa Bus trên
                </p>
                <div className="flex justify-center gap-4">
                  <Link href="https://play.google.com/store/apps/details?id=vn.futabus.passenger" target="_blank">
                    <Button className="bg-green-600 hover:bg-green-700 gap-2">
                      <Smartphone className="h-4 w-4" />
                      Google Play
                    </Button>
                  </Link>
                  <Link href="https://apps.apple.com/vn/app/futa-bus/id1476713335" target="_blank">
                    <Button className="bg-black hover:bg-gray-800 gap-2">
                      <Smartphone className="h-4 w-4" />
                      Apple Store
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Booking Form */}
        <section className="py-8 bg-orange-50">
          <div className="container">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-center mb-6">Bước 2: Chọn thông tin hành trình</h3>

              <div className="mb-8">
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-futa-orange text-futa-orange flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-medium flex items-center">Chọn điểm khởi hành</h3>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-futa-orange text-futa-orange flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-medium flex items-center">Chọn điểm đến</h3>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-futa-orange text-futa-orange flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-medium flex items-center">Chọn ngày đi</h3>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-futa-orange text-futa-orange flex items-center justify-center text-xl font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-medium flex items-center">Chọn ngày về (nếu đặt vé khứ hồi)</h3>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-futa-orange text-futa-orange flex items-center justify-center text-xl font-bold">
                    5
                  </div>
                  <h3 className="text-xl font-medium flex items-center">Chọn số lượng vé</h3>
                </div>
              </div>

              <div className="relative max-w-4xl mx-auto">
                <Image
                  src="/images/search-results-page.png"
                  alt="Kết quả tìm kiếm chuyến xe"
                  width={1000}
                  height={500}
                  className="object-contain mx-auto"
                />
              </div>

              <div className="mt-8 text-gray-700">
                <p className="font-medium">
                  Sau khi nhấn nút "Tìm chuyến xe", hệ thống sẽ hiển thị các kết quả phù hợp với lịch trình của bạn:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Danh sách các chuyến xe phù hợp với lộ trình đã chọn</li>
                  <li>Thông tin về giờ khởi hành, giờ đến và thời gian di chuyển</li>
                  <li>Loại xe (Limousine, Ghế, Giường)</li>
                  <li>Số ghế trống</li>
                  <li>Giá vé</li>
                </ul>
                <p className="mt-4">Bạn có thể sử dụng bộ lọc bên trái để lọc kết quả theo:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Giờ đi (sáng sớm, buổi sáng, buổi chiều, buổi tối)</li>
                  <li>Loại xe (Ghế, Giường, Limousine)</li>
                  <li>Hạng ghế (hàng đầu, hàng giữa, hàng cuối)</li>
                  <li>Tầng (tầng trên, tầng dưới)</li>
                </ul>
                <p className="mt-4 text-futa-orange font-medium">
                  Sau khi tìm được chuyến xe phù hợp, bạn nhấn vào nút "Chọn chuyến" để tiếp tục quy trình đặt vé.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Seat Selection */}
        <section className="py-8 bg-orange-50">
          <div className="container">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-center text-futa-green mb-6">
                Bước 3: Chọn ghế, điểm đón trả, thông tin hành khách
              </h3>

              <div className="mb-8">
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-futa-orange text-futa-orange flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-medium flex items-center">Chọn giờ đi</h3>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-futa-orange text-futa-orange flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-medium flex items-center">Chọn loại xe</h3>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-futa-orange text-futa-orange flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-medium flex items-center">Chọn điểm đón</h3>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-futa-orange text-futa-orange flex items-center justify-center text-xl font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-medium flex items-center">Chọn chuyến đi</h3>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-futa-orange text-futa-orange flex items-center justify-center text-xl font-bold">
                    5
                  </div>
                  <h3 className="text-xl font-medium flex items-center">Chọn nhanh số ghế</h3>
                </div>
              </div>

              <div className="relative max-w-4xl mx-auto">
                <Image
                  src="/images/booking-guide-step3-seats.png"
                  alt="Chọn ghế và thông tin hành khách"
                  width={1000}
                  height={500}
                  className="object-contain mx-auto"
                />
                <div className="mt-4 text-gray-700">
                  <p>Tại bước này, bạn sẽ:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Chọn ghế trên sơ đồ xe (ghế màu xanh là ghế còn trống, màu xám là ghế đã bán)</li>
                    <li>Nhập thông tin hành khách: họ tên, số điện thoại, email</li>
                    <li>Xem thông tin lượt đi và chi tiết giá vé</li>
                  </ul>
                  <p className="mt-2 text-futa-orange font-medium">
                    Lưu ý quan trọng: Quý khách vui lòng có mặt tại bến xuất phát của xe trước ít nhất 30 phút giờ xe
                    khởi hành, mang theo thông báo đã thanh toán vé thành công có chứa mã vé được gửi từ hệ thống FUTA
                    BUS LINES.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 4: Payment */}
        <section className="py-8 bg-orange-50">
          <div className="container">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-center text-futa-green mb-6">
                Bước 4: Chọn phương thức thanh toán
              </h3>

              <div className="relative max-w-4xl mx-auto">
                <Image
                  src="/images/booking-guide-step4.png"
                  alt="Chọn phương thức thanh toán"
                  width={1000}
                  height={500}
                  className="object-contain mx-auto"
                />
                <div className="mt-4 text-gray-700">
                  <p>Tại bước này, bạn có thể chọn một trong các phương thức thanh toán sau:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>FUTAPay - Ví điện tử của FUTA Bus Lines</li>
                    <li>ZaloPay</li>
                    <li>Momo</li>
                    <li>VNPay</li>
                    <li>AirPay</li>
                    <li>Và các phương thức thanh toán khác</li>
                  </ul>
                  <p className="mt-2">
                    Sau khi chọn phương thức thanh toán, hãy làm theo hướng dẫn để hoàn tất giao dịch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 5: Success */}
        <section className="py-8 bg-orange-50">
          <div className="container">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-center text-futa-green mb-6">Bước 5: Mua vé thành công</h3>

              <div className="relative max-w-4xl mx-auto">
                <Image
                  src="/images/booking-guide-step5.png"
                  alt="Mua vé thành công"
                  width={1000}
                  height={500}
                  className="object-contain mx-auto"
                />
                <div className="mt-4 text-gray-700">
                  <p>Sau khi thanh toán thành công:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Hệ thống sẽ hiển thị thông báo mua vé thành công</li>
                    <li>Thông tin vé sẽ được hiển thị trên màn hình</li>
                    <li>Bạn có thể tải về hoặc chia sẻ thông tin vé</li>
                    <li>Vé xe sẽ được gửi về Email. Quý khách vui lòng kiểm tra Email để nhận vé</li>
                  </ul>
                  <p className="mt-4 text-futa-orange font-medium">
                    Lưu ý: Hãy lưu lại thông tin vé này và xuất trình khi lên xe. Bạn có thể in vé ra hoặc xuất trình vé
                    điện tử trên điện thoại.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-futa-orange text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Đặt vé xe Phương Trang ngay hôm nay!</h2>
              <p className="mb-8">Trải nghiệm dịch vụ đặt vé trực tuyến tiện lợi và nhanh chóng</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/">
                  <Button className="bg-white text-futa-orange hover:bg-gray-100 w-full sm:w-auto">Đặt vé ngay</Button>
                </Link>
                <Link href="/dang-nhap">
                  <Button className="bg-futa-green hover:bg-futa-green/90 w-full sm:w-auto">Đăng ký tài khoản</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

