import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const promotions = [
  {
    id: 1,
    title: "FUTA ĐỒNG HÀNH CÙNG SHB - X3 QUÀ TẶNG",
    image: "/images/khuyenmai1.jpg",
    date: "08/12/2023",
  },
  {
    id: 2,
    title: "CÔNG TY PHƯƠNG TRANG THÔNG BÁO THAY ĐỔI ĐẦU SỐ TỔNG ĐÀI CHI NHÁNH CÀ MAU",
    image: "/images/khuyenmai2.png",
    date: "28/03/2025",
  },
  {
    id: 3,
    title: "CÔNG TY PHƯƠNG TRANG TƯNG BỪNG KHAI TRƯƠNG VĂN PHÒNG BA HÒN - KIÊN GIANG",
    image: "/images/khuyenmai3.jpg",
    date: "28/03/2025",
  },
]

export function Promotions() {
  return (
    <section className="py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-futa-green">KHUYẾN MÃI NỔI BẬT</h2>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {promotions.map((promo) => (
              <Card key={promo.id} className="overflow-hidden border-none shadow-md">
                <div className="relative h-48">
                  <Image src={promo.image || "/placeholder.svg"} alt={promo.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-2 h-12">{promo.title}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">{promo.date}</p>
                    <Link href={`/tin-tuc/${promo.id}`} className="text-futa-orange font-medium flex items-center">
                      Chi tiết <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-2">
            <Button variant="outline" size="icon" className="rounded-full h-8 w-8 bg-futa-orange text-white">
              <span className="sr-only">Trang trước</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-8 w-8 border-gray-300">
              <span className="sr-only">Trang 1</span>
              <span>1</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-8 w-8 border-gray-300">
              <span className="sr-only">Trang 2</span>
              <span>2</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-8 w-8 border-gray-300">
              <span className="sr-only">Trang 3</span>
              <span>3</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-8 w-8 border-gray-300">
              <span className="sr-only">Trang tiếp</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

