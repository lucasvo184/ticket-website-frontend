import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsList } from "@/components/news-list"

export default function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gray-50 py-8">
          <div className="container">
            <h1 className="text-3xl font-bold text-center text-futa-green mb-4">TIN TỨC</h1>
            <p className="text-center text-gray-600 mb-8">Được khách hàng tin tưởng và lựa chọn</p>
          </div>
        </div>

        <NewsList />
      </main>
      <Footer />
    </div>
  )
}

