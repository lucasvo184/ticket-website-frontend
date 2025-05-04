import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingForm } from "@/components/booking-form"
import { PopularRoutes } from "@/components/popular-routes"
import { Promotions } from "@/components/promotions"
import { CompanyStats } from "@/components/company-stats"
import { ServiceLinks } from "@/components/service-links"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
          <Image
            src="/images/trangchu.png"
            alt="FUTA Bus Lines - 24 năm vững tin & phát triển"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
          </div>
        </div>

        <div className="container -mt-16 relative z-10 px-4 sm:px-6 lg:px-8">
          <BookingForm />
        </div>

        <Promotions />
        <PopularRoutes />
        <CompanyStats />
        <ServiceLinks />
      </main>
      <Footer />
    </div>
  )
}

