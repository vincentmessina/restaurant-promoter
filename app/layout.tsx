import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ResoConnect - Nightclub Reservation",
  description: "Nightclub Reservation",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">{children}</ScrollArea>
          </main>
        </div>
      </body>
    </html>
  )
}



import './globals.css'