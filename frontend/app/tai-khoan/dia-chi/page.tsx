import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Plus } from "lucide-react"

export default function AddressPage() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Địa chỉ của bạn</CardTitle>
            <p className="text-sm text-gray-500">
              Địa chỉ của bạn sẽ được sử dụng để nhập nhanh điểm đón - trả tận nơi
            </p>
          </div>
          <Button className="bg-futa-orange hover:bg-futa-orange/90 gap-2">
            <Plus className="h-4 w-4" />
            Thêm địa chỉ mới
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-gray-400 mb-4">
            <MapPin className="h-16 w-16" />
          </div>
          <p className="text-gray-500 mb-4">Bạn chưa có địa chỉ nào</p>
          <p className="text-gray-500 text-sm text-center max-w-md">
            Thêm địa chỉ để lưu trữ các địa điểm thường xuyên sử dụng, giúp việc đặt vé nhanh chóng và thuận tiện hơn
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

