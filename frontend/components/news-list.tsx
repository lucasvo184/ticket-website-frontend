import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const newsCategories = [
  { id: "all", name: "Tin tức tổng hợp", active: true },
  { id: "futa-bus", name: "FUTA Bus Lines", active: false },
  { id: "futa-city", name: "FUTA City Bus", active: false },
  { id: "promotions", name: "Khuyến mãi", active: false },
  { id: "awards", name: "Giải thưởng", active: false },
  { id: "stations", name: "Trạm Dừng", active: false },
]

const newsItems = [
  {
    id: 1,
    title: "FUTA ĐỒNG HÀNH CÙNG SHB - X3 QUÀ TẶNG",
    image: "/images/khuyenmai1.jpg",
    date: "14:35 26/07/2023",
    category: "promotions",
  },
  {
    id: 2,
    title: "CÔNG TY PHƯƠNG TRANG THÔNG BÁO THAY ĐỔI ĐẦU SỐ TỔNG ĐÀI CHI NHÁNH CÀ MAU",
    image: "/images/tintuc1.png",
    date: "15:56 28/03/2025",
    category: "futa-bus",
  },
  {
    id: 3,
    title: "CÔNG TY PHƯƠNG TRANG TƯNG BỪNG KHAI TRƯƠNG VĂN PHÒNG BA HÒN - KIÊN GIANG",
    image: "/images/tintuc2.jpg",
    date: "11:04 28/03/2025",
    category: "futa-bus",
  },
  {
    id: 4,
    title: "MỞ RỘNG HÀNH TRÌNH, KHÁM PHÁ TUYẾN MỚI BẾN XE MIỀN ĐÔNG MỚI - ĐÀ LẠT",
    image: "/images/tintuc3.png",
    date: "15:31 27/03/2025",
    category: "futa-bus",
  },
  {
    id: 5,
    title: "CÔNG TY PHƯƠNG TRANG TƯNG BỪNG KHAI TRƯƠNG TUYẾN XE BẾN XE HÀ TIÊN - BẾN XE CẦN THƠ",
    image: "/images/tintuc4.png",
    date: "15:23 27/03/2025",
    category: "futa-bus",
  },
]

export function NewsList() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex overflow-x-auto pb-4 gap-4">
          {newsCategories.map((category) => (
            <Link
              key={category.id}
              href={`/tin-tuc?category=${category.id}`}
              className={`whitespace-nowrap px-4 py-2 rounded-md ${
                category.active ? "bg-futa-orange text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-futa-green mb-6">Tin tức nổi bật</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <Card key={item.id} className="overflow-hidden border-none shadow-md">
            <div className="relative h-48">
              <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <Link href={`/tin-tuc/${item.id}`}>
                <h3 className="font-semibold line-clamp-2 h-12 hover:text-futa-orange transition-colors">
                  {item.title}
                </h3>
              </Link>
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">{item.date}</p>
                <Link href={`/tin-tuc/${item.id}`} className="text-futa-orange font-medium flex items-center">
                  Chi tiết <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline" className="border-futa-orange text-futa-orange hover:bg-futa-orange hover:text-white">
          Xem tất cả
        </Button>
      </div>
    </div>
  )
}

