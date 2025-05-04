import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const routes = [
  {
    id: 1,
    from: "Tp Hồ Chí Minh",
    to: "Đà Lạt",
    image: "/images/tuyenphobien1.png",
    price: "290.000đ",
    distance: "305km",
    duration: "8 giờ",
    date: "01/04/2025",
  },
  {
    id: 2,
    from: "Đà Lạt",
    to: "TP. Hồ Chí Minh",
    image: "/images/tuyenphobien2.png",
    price: "290.000đ",
    distance: "310km",
    duration: "8 giờ",
    date: "01/04/2025",
  },
  {
    id: 3,
    from: "Đà Nẵng",
    to: "Đà Lạt",
    image: "/images/tuyenphobien3.png",
    price: "410.000đ",
    distance: "666km",
    duration: "17 giờ",
    date: "01/04/2025",
  },
]

export function PopularRoutes() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-futa-green">TUYẾN PHỐ BIẾN</h2>
          <p className="text-gray-600 mt-2">Được khách hàng tin tưởng và lựa chọn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route) => (
            <Card key={route.id} className="overflow-hidden border-none shadow-md">
              <div className="relative h-48">
                <Image
                  src={route.image || "/placeholder.svg"}
                  alt={`${route.from} - ${route.to}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                  <div className="text-white">
                    <h3 className="text-lg font-semibold">Tuyến xe từ</h3>
                    <p className="text-xl font-bold">{route.from}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-futa-green">{route.to}</h4>
                    <p className="text-sm text-gray-500">
                      {route.distance} - {route.duration} - {route.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-futa-orange">{route.price}</p>
                  </div>
                </div>
                <Link
                  href={`/lich-trinh?from=${route.from}&to=${route.to}`}
                  className="block text-center bg-futa-orange hover:bg-futa-orange/90 text-white py-2 rounded-md"
                >
                  Xem chi tiết
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

