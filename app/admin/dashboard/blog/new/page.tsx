"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkAuth } from "@/lib/auth"
import AdminSidebar from "@/components/admin/sidebar"
import { Loader2, Save, X, Plus } from "lucide-react"

interface BlogPostData {
  id: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  date: string
  author: string
  tags: string[]
}

export default function NewBlogPostPage() {
  const [postData, setPostData] = useState<BlogPostData>({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    date: new Date().toISOString().split("T")[0],
    author: "Mohammad Fahim Muntasir Akib",
    tags: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [newTag, setNewTag] = useState("")
  const router = useRouter()

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuth()
      if (!isAuthenticated) {
        router.push("/admin")
        return
      }
      setIsLoading(false)
    }

    verifyAuth()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !postData.tags.includes(newTag.trim())) {
      setPostData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setPostData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveMessage("")

    try {
      // Generate a slug ID if not provided
      if (!postData.id) {
        setPostData((prev) => ({
          ...prev,
          id: generateSlug(prev.title),
        }))
      }

      // In a real app, this would be an API call to save the data
      // For this demo, we'll just simulate a save
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      setSaveMessage("Blog post saved successfully!")

      // In a real app, you would update the JSON file here
      console.log("Saving blog post data:", postData)

      // Redirect to blog posts list after a short delay
      setTimeout(() => {
        router.push("/admin/dashboard/blog")
      }, 1500)
    } catch (error) {
      console.error("Error saving blog post data:", error)
      setSaveMessage("Error saving data. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Blog Post</h1>
          <p className="text-gray-600 dark:text-gray-400">Create a new blog post for your portfolio</p>
        </div>

        {saveMessage && (
          <div
            className={`mb-6 rounded-md p-4 ${
              saveMessage.includes("Error")
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            }`}
          >
            {saveMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Post Details</h2>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Post Title</label>
              <input
                type="text"
                name="title"
                value={postData.title}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Excerpt</label>
              <textarea
                name="excerpt"
                value={postData.excerpt}
                onChange={handleChange}
                rows={2}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                A brief summary of the blog post that will appear in the blog list
              </p>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Content (Markdown)
              </label>
              <textarea
                name="content"
                value={postData.content}
                onChange={handleChange}
                rows={15}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                You can use Markdown formatting for your content
              </p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  name="coverImage"
                  value={postData.coverImage}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Publication Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={postData.date}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Author</label>
              <input
                type="text"
                name="author"
                value={postData.author}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {postData.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-800 dark:text-green-100"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 rounded-full p-1 hover:bg-green-200 dark:hover:bg-green-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full rounded-l-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Add a tag"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="rounded-r-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard/blog")}
              className="rounded-md border border-gray-300 bg-white px-6 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center rounded-md bg-green-600 px-6 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Publish Post
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
