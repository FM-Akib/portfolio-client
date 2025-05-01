import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Software Engineer Portfolio",
  description: "Read my latest thoughts, tutorials, and insights on software development, design, and technology",
  keywords: ["blog", "software development", "web development", "programming", "tech articles"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio-url.com/blog",
    title: "Blog | Software Engineer Portfolio",
    description: "Read my latest thoughts, tutorials, and insights on software development, design, and technology",
    siteName: "Software Engineer Portfolio",
    images: [
      {
        url: "/og-blog-image.jpg",
        width: 1200,
        height: 630,
        alt: "Software Engineer Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Software Engineer Portfolio",
    description: "Read my latest thoughts, tutorials, and insights on software development, design, and technology",
    creator: "@yourtwitterhandle",
    images: ["/og-blog-image.jpg"],
  },
}

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
