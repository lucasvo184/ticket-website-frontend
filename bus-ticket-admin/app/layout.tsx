import { type ReactNode } from "react"
import { SidebarProvider } from "@/components/sidebar-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Cải thiện hiệu suất font loading
  variable: '--font-inter' // Cho phép sử dụng CSS variable
})

export const metadata: Metadata = {
  title: {
    default: "Bus Ticket Booking - Staff Portal",
    template: "%s | Bus Ticket Booking"
  },
  description: "Staff portal for managing bus ticket bookings",
  generator: 'v0.dev',
  applicationName: 'Bus Ticket Booking System',
  referrer: 'origin-when-cross-origin',
  keywords: ['Bus', 'Ticket', 'Booking', 'Staff Portal'],
  authors: [{ name: 'Your Name', url: 'https://yourwebsite.com' }],
  creator: 'Your Team',
  publisher: 'Your Company',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://yourwebsite.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={inter.variable} // Sử dụng font variable
    >
      <body className={`font-sans ${inter.className}`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem 
          disableTransitionOnChange
          storageKey="bus-ticket-theme"
        >
          <SidebarProvider>
            <main className="min-h-screen bg-background">
              {children}
            </main>
            <Toaster 
              position="bottom-right"
              toastOptions={{
                duration: 5000,
              }}
            />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}