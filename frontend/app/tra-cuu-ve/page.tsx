import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TicketLookupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-futa-green mb-8">TRA CỨU THÔNG TIN ĐẶT VÉ</h1>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" type="tel" placeholder="Vui lòng nhập số điện thoại" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ticket-code">Mã vé</Label>
                    <Input id="ticket-code" placeholder="Vui lòng nhập mã vé" />
                  </div>

                  <Button className="w-full bg-futa-orange hover:bg-futa-orange/90 text-white">Tra cứu</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

