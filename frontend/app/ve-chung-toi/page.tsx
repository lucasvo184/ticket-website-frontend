import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutCompany } from "@/components/about-company"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AboutCompany />
      </main>
      <Footer />
    </div>
  )
}

