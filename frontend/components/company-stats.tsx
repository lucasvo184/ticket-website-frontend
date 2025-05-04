import Image from "next/image"

const stats = [
  {
    id: 1,
    title: "Hơn 20 Triệu",
    subtitle: "Lượt khách",
    description: "Phương Trang phục vụ hơn 20 triệu lượt khách bình quân 1 năm trên toàn quốc",
    icon: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    title: "Hơn 350",
    subtitle: "Phòng vé - Bưu cục",
    description: "Phương Trang có hơn 350 phòng vé, trạm trung chuyển, bến xe,... trên toàn hệ thống",
    icon: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    title: "Hơn 1,000",
    subtitle: "Chuyến xe",
    description: "Phương Trang phục vụ hơn 1,000 chuyến xe đường dài và liên tỉnh mỗi ngày",
    icon: "/placeholder.svg?height=80&width=80",
  },
]

export function CompanyStats() {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-futa-green">FUTA BUS LINES - CHẤT LƯỢNG LÀ DANH DỰ</h2>
          <p className="text-gray-600 mt-2">Được khách hàng tin tưởng và lựa chọn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            {stats.map((stat) => (
              <div key={stat.id} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                    <Image
                      src={stat.icon || "/placeholder.svg"}
                      alt={stat.title}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {stat.title} <span className="text-lg font-normal">{stat.subtitle}</span>
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative h-[300px] md:h-[400px]">
            <Image src="/images/chatluongladanhdu.png" alt="FUTA Bus Lines" fill className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  )
}

