import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InvoiceLookup } from "@/components/invoice-lookup"
import Link from "next/link"
import { FileText, Search } from "lucide-react"

export default function InvoicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-futa-orange py-4">
          <div className="container flex items-center gap-4">
            <Link href="/hoa-don" className="flex items-center gap-2 text-white">
              <Search className="h-5 w-5" />
              <span>Tra cứu hóa đơn</span>
            </Link>

            <Link href="/hoa-don/xac-thuc" className="flex items-center gap-2 text-white">
              <FileText className="h-5 w-5" />
              <span>Xác thực hóa đơn</span>
            </Link>
          </div>
        </div>

        <div className="container py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-futa-green mb-8">TRA CỨU HÓA ĐƠN</h1>

            <InvoiceLookup />

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Nếu bạn cần hỗ trợ thêm, vui lòng liên hệ hotline{" "}
                <span className="text-futa-orange font-bold">19006067</span>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

