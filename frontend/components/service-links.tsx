import Image from "next/image"
import Link from "next/link"

const services = [
  {
    id: 1,
    title: "Xe Hợp Đồng",
    icon: "/images/ketnoifuta1-removebg-preview.png",
    href: "/xe-hop-dong",
  },
  {
    id: 2,
    title: "Mua vé Phương Trang",
    icon: "/images/ketnoifuta2-removebg-preview.png",
    href: "/lich-trinh",
    highlight: true,
  },
  {
    id: 3,
    title: "Giao Hàng",
    icon: "/images/ketnoifuta3-removebg-preview.png",
    href: "/giao-hang",
  },
  {
    id: 4,
    title: "Xe Buýt",
    icon: "/images/ketnoifuta4-removebg-preview.png",
    href: "/xe-buyt",
  },
]

export function ServiceLinks() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-futa-green">KẾT NỐI FUTA GROUP</h2>
          <p className="text-gray-600 mt-2">
            Kết nối đa dạng hệ sinh thái FUTA Group qua App FUTA: mua vé Xe Phương Trang, Xe Buýt, Xe Hợp Đồng, Giao
            Hàng,...
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-16">
          {services.map((service) => (
            <Link key={service.id} href={service.href} className="flex flex-col items-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                <Image
                  src={service.icon || "/placeholder.svg"}
                  alt={service.title}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className={`text-center font-medium ${service.highlight ? "text-futa-orange" : ""}`}>
                {service.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

