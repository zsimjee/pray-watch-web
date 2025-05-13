import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import AdhanWasmProvider from "@/components/adhan-wasm-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Pray Watch | IslamiCity",
  description: "Pray daily. Watch closely. Connect deeply.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AdhanWasmProvider>{children}</AdhanWasmProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
