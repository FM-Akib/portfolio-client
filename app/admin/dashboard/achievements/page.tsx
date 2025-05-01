"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkAuth } from "@/lib/auth"
import AdminSidebar from "@/components/admin/sidebar"
import { Edit, Trash2, Plus, Award } from "lucide-react"
import Link from "next/link"

interface Achievement {
  id: string
  title: string
  organization: string
  date: string
  description: string
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
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
        const data = await import("@/lib/data/achievements.json")
        setAchievements(data.default || [])
      } catch (error) {
        console.error("Error loading achievements data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    verifyAuth()
  }, [router])

  const handleEdit = (id: string) => {
    router.push(`/admin/dashboard/achievements/edit/${id}`)
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      // In a real app, this would call an API to delete the achievement and update the JSON file
      setAchievements(achievements.filter((achievement) => achievement.id !== id))

      // Simulate saving to JSON file
      console.log(
        "Achievement deleted, updated data:",
        achievements.filter((achievement) => achievement.id !== id),
      )
      alert("Achievement deleted successfully")
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Achievements</h1>
          <Link href="/admin/dashboard/achievements/new">
            <button className="flex items-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
              <Plus className="mr-2 h-5 w-5" />
              Add New Achievement
            </button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900 dark:text-green-300">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{achievement.title}</h2>
                      <p className="text-gray-600 dark:text-gray-400">{achievement.organization}</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{achievement.date}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(achievement.id)}
                      className="rounded p-1 text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(achievement.id)}
                      className="rounded p-1 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
