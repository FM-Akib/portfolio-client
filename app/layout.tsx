import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/scroll-to-top"
import AdminAccessButton from "@/components/admin-access-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Professional Software Engineer Portfolio",
  description:
    "Portfolio showcasing my work as a software engineer, featuring projects, skills, achievements, and blog posts",
  keywords: ["software engineer", "web developer", "portfolio", "projects", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  publisher: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio-url.com",
    title: "Professional Software Engineer Portfolio",
    description:
      "Portfolio showcasing my work as a software engineer, featuring projects, skills, achievements, and blog posts",
    siteName: "Software Engineer Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Software Engineer Portfolio",
    description:
      "Portfolio showcasing my work as a software engineer, featuring projects, skills, achievements, and blog posts",
    creator: "@yourtwitterhandle",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <ScrollToTop />
          <div className="fixed bottom-8 left-8 z-50">
            <AdminAccessButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
