import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { blogPosts } from "@/lib/blog-data"
import { Separator } from "@/components/ui/separator"

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    keywords: [...post.tags, "blog", "article", "software development"],
    authors: [{ name: "Your Name" }],
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `https://your-portfolio-url.com/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: ["Your Name"],
      tags: post.tags,
      images: [
        {
          url: post.coverImage || "/og-blog-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@yourtwitterhandle",
      images: [post.coverImage || "/og-blog-image.jpg"],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-24 pb-16">
      <div className="container max-w-3xl mx-auto px-4">
        <Button variant="ghost" size="sm" asChild className="mb-6 group">
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </Button>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden mb-8 shadow-lg">
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="prose prose-green max-w-none">
          {post.content.map((paragraph, index) => (
            <p key={index} className="mb-4 text-foreground/90 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <Separator className="my-12" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium mb-1">Share this article</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <span className="sr-only">Share on Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <span className="sr-only">Share on LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <span className="sr-only">Share on Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Button>
            </div>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <Link href="/blog">Read More Articles</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
