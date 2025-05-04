import Image from "next/image"

export function HeroBanner() {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
      <Image
        src="/placeholder.svg?height=400&width=1200"
        alt="FUTA Bus Lines - 24 năm vững tin & phát triển"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-yellow-400">24</span> Năm
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-futa-green">VỮNG TIN & PHÁT TRIỂN</h2>
        </div>
      </div>
    </div>
  )
}

