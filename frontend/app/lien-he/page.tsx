import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gray-50 py-8">
          <div className="container">
            <h1 className="text-3xl font-bold text-center text-futa-green mb-8">LIÊN HỆ VỚI CHÚNG TÔI</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold text-futa-orange mb-4">
                    CÔNG TY CỔ PHẦN XE KHÁCH PHƯƠNG TRANG - FUTA BUS LINES
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-futa-orange flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Địa chỉ:</p>
                        <p>Số 01 Tô Hiến Thành, Phường 3, Thành phố Đà Lạt, Tỉnh Lâm Đồng, Việt Nam</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-futa-orange flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Email:</p>
                        <Link href="mailto:hotro@futa.vn" className="text-futa-orange hover:underline">
                          hotro@futa.vn
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-futa-orange flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Điện thoại:</p>
                        <p>02838386852</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-futa-orange flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Fax:</p>
                        <p>02838386853</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-futa-orange flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Hotline:</p>
                        <p className="text-futa-orange font-bold">19006067</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-futa-orange flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Website:</p>
                        <Link href="https://futabus.vn" className="text-futa-orange hover:underline">
                          https://futabus.vn
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>

        <div className="py-8">
          <div className="container">
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.1583920826735!2d108.43946797469275!3d11.957662636690708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112d959f88991%3A0x9e7fab5c6edcf34!2zMSBUw7QgSGnhur9uIFRow6BuaCwgUGjGsOG7nW5nIDMsIFRow6BuaCBwaOG7kSDEkMOgIEzhuqF0LCBMw6JtIMSQ4buTbmcgNjYwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1711644000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

