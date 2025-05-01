"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkAuth } from "@/lib/auth"
import AdminSidebar from "@/components/admin/sidebar"
import { Loader2 } from "lucide-react"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    projects: 0,
    blogPosts: 0,
    skills: 0,
    experiences: 0,
  })
  const router = useRouter()

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const isAuthenticated = await checkAuth()
        if (!isAuthenticated) {
          router.push("/admin")
          return
        }

        // Load dashboard stats - using try/catch for each import to prevent one failure from breaking everything
        try {
          const projectsData = await import("@/lib/data/projects.json")
          if (projectsData.default) {
            setStats((prev) => ({ ...prev, projects: projectsData.default.length || 0 }))
          }
        } catch (error) {
          console.error("Error loading projects data:", error)
        }

        try {
          const blogData = await import("@/lib/data/blog-posts.json")
          if (blogData.default) {
            setStats((prev) => ({ ...prev, blogPosts: blogData.default.length || 0 }))
          }
        } catch (error) {
          console.error("Error loading blog data:", error)
        }

        try {
          const skillsData = await import("@/lib/data/skills.json")
          if (skillsData.default) {
            setStats((prev) => ({ ...prev, skills: skillsData.default.length || 0 }))
          }
        } catch (error) {
          console.error("Error loading skills data:", error)
        }

        try {
          const experienceData = await import("@/lib/data/experience.json")
          if (experienceData.default) {
            setStats((prev) => ({ ...prev, experiences: experienceData.default.length || 0 }))
          }
        } catch (error) {
          console.error("Error loading experience data:", error)
        }
      } catch (error) {
        console.error("Authentication error:", error)
        router.push("/admin")
      } finally {
        setIsLoading(false)
      }
    }

    verifyAuth()
  }, [router])

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome to your portfolio admin dashboard</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard title="Projects" value={stats.projects} color="bg-blue-500" />
          <DashboardCard title="Blog Posts" value={stats.blogPosts} color="bg-green-500" />
          <DashboardCard title="Skills" value={stats.skills} color="bg-purple-500" />
          <DashboardCard title="Experiences" value={stats.experiences} color="bg-orange-500" />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <QuickActionButton label="Add New Project" href="/admin/dashboard/projects/new" />
              <QuickActionButton label="Add Blog Post" href="/admin/dashboard/blog/new" />
              <QuickActionButton label="Update About" href="/admin/dashboard/about" />
              <QuickActionButton label="Manage Skills" href="/admin/dashboard/skills" />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Recent Updates</h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">No recent updates yet.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function DashboardCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="flex items-center">
        <div className={`rounded-full ${color} p-3`}>
          <div className="h-6 w-6 text-white"></div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  )
}

function QuickActionButton({ label, href }: { label: string; href: string }) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push(href)}
      className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
    >
      {label}
    </button>
  )
}
