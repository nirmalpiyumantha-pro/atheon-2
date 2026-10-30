import type { Metadata } from "next"
import { inter } from "@/app/fonts"
import "./globals.css"
import Navbar from "@/components/navbar"
import { Mail } from "lucide-react"
import { Toaster } from "@/components/sonner"
import { aboutData } from "@/lib/about-data"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.PUBLIC_BASE_URL || aboutData.publicBaseUrl),
  title: {
    template: `%s - ${aboutData.name}`,
    default: `${aboutData.name} - ${aboutData.title}`,
  },
  description: aboutData.description,
  twitter: {
    card: "summary_large_image",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="relative">
        <Toaster position="top-center" offset="80px" />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        {children}
        <a
          href="/#contact-us"
          className="floating-contact"
          aria-label="Contact Atheon"
        >
          <Mail size={22} aria-hidden="true" />
        </a>
      </body>
    </html>
  )
}
