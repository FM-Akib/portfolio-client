"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkAuth } from "@/lib/auth"
import AdminSidebar from "@/components/admin/sidebar"
import { Edit, Trash2, Plus, ExternalLink, Calendar } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  coverImage: string
  date: string
  tags: string[]
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuth()
      if (!isAuthenticated) {
        router.push("/admin")
        return
      }

      try {
        const blogData = await import("@/lib/data/blog-posts.json")
        setPosts(blogData.default || [])
      } catch (error) {
        console.error("Error loading blog posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    verifyAuth()
  }, [router])

  const handleEdit = (id: string) => {
    router.push(`/admin/dashboard/blog/edit/${id}`)
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      // In a real app, this would call an API to delete the post
      setPosts(posts.filter((post) => post.id !== id))
      // Then save the updated posts to the JSON file
      alert("Blog post deleted successfully")
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Posts</h1>
          <Link href="/admin/dashboard/blog/new">
            <button className="flex items-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
              <Plus className="mr-2 h-5 w-5" />
              Add New Post
            </button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="relative h-48 w-full">
                <img
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="mr-1 h-4 w-4" />
                  {post.date}
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{post.title}</h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  {post.excerpt.length > 100 ? `${post.excerpt.substring(0, 100)}...` : post.excerpt}
                </p>
                <div className="mb-4 flex flex-wrap gap-1">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 dark:bg-green-800 dark:text-green-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end space-x-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                  <button
                    onClick={() => handleEdit(post.id)}
                    className="rounded p-1 text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="rounded p-1 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <Link href={`/blog/${post.id}`} target="_blank">
                    <button className="rounded p-1 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                      <ExternalLink className="h-5 w-5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
