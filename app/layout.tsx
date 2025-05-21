import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "COLLAR & BOW Size Finder",
  description: "Find your perfect size with our interactive size finder tool",
  openGraph: {
    title: "COLLAR & BOW Size Finder",
    description: "Find your perfect size with our interactive size finder tool",
    url: "https://collarandbow.com/size-finder",
    siteName: "COLLAR & BOW",
    images: [
      {
        url: "https://collarandbow.com/og-image.jpg", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "COLLAR & BOW Size Finder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "COLLAR & BOW Size Finder",
    description: "Find your perfect size with our interactive size finder tool",
    images: ["https://collarandbow.com/twitter-image.jpg"], // Replace with your actual image URL
    creator: "@collarandbow", // Replace with your Twitter handle
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
