"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkAuth } from "@/lib/auth"
import AdminSidebar from "@/components/admin/sidebar"
import { Edit, Trash2, Plus, Save, Loader2 } from "lucide-react"

interface Skill {
  name: string
  level: number
}

interface SkillCategory {
  id: string
  category: string
  skills: Skill[]
}

export default function SkillsPage() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const router = useRouter()

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuth()
      if (!isAuthenticated) {
        router.push("/admin")
        return
      }

      try {
        const data = await import("@/lib/data/skills.json")
        setSkillCategories(data.default || [])
      } catch (error) {
        console.error("Error loading skills data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    verifyAuth()
  }, [router])

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newId = Date.now().toString()
      setSkillCategories([
        ...skillCategories,
        {
          id: newId,
          category: newCategory.trim(),
          skills: [],
        },
      ])
      setNewCategory("")
    }
  }

  const handleDeleteCategory = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category and all its skills?")) {
      setSkillCategories(skillCategories.filter((cat) => cat.id !== id))
    }
  }

  const handleAddSkill = (categoryId: string) => {
    setSkillCategories(
      skillCategories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            skills: [...cat.skills, { name: "New Skill", level: 50 }],
          }
        }
        return cat
      }),
    )
  }

  const handleUpdateSkill = (categoryId: string, skillIndex: number, field: keyof Skill, value: string | number) => {
    setSkillCategories(
      skillCategories.map((cat) => {
        if (cat.id === categoryId) {
          const updatedSkills = [...cat.skills]
          updatedSkills[skillIndex] = {
            ...updatedSkills[skillIndex],
            [field]: field === "level" ? Number(value) : value,
          }
          return {
            ...cat,
            skills: updatedSkills,
          }
        }
        return cat
      }),
    )
  }

  const handleDeleteSkill = (categoryId: string, skillIndex: number) => {
    setSkillCategories(
      skillCategories.map((cat) => {
        if (cat.id === categoryId) {
          const updatedSkills = cat.skills.filter((_, index) => index !== skillIndex)
          return {
            ...cat,
            skills: updatedSkills,
          }
        }
        return cat
      }),
    )
  }

  const handleSaveChanges = async () => {
    setIsSaving(true)
    setSaveMessage("")

    try {
      // In a real app, this would be an API call to save the data
      // For this demo, we'll just simulate a save
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      setSaveMessage("Skills saved successfully!")

      // In a real app, you would update the JSON file here
      console.log("Saving skills data:", skillCategories)

      setEditMode(false)
    } catch (error) {
      console.error("Error saving skills data:", error)
      setSaveMessage("Error saving data. Please try again.")
    } finally {
      setIsSaving(false)
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
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Skills Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your skills and expertise</p>
          </div>
          <div className="flex space-x-4">
            {editMode ? (
              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="flex items-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Save Changes
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                <Edit className="mr-2 h-5 w-5" />
                Edit Skills
              </button>
            )}
          </div>
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

        {editMode && (
          <div className="mb-6 flex">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category Name"
              className="w-full rounded-l-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleAddCategory}
              className="rounded-r-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="space-y-6">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{category.category}</h2>
                  {editMode && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddSkill(category.id)}
                        className="rounded p-1 text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="rounded p-1 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center justify-between">
                      {editMode ? (
                        <>
                          <div className="flex-1 pr-4">
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => handleUpdateSkill(category.id, skillIndex, "name", e.target.value)}
                              className="w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div className="flex w-32 items-center">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={skill.level}
                              onChange={(e) => handleUpdateSkill(category.id, skillIndex, "level", e.target.value)}
                              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                            />
                            <span className="ml-2 w-8 text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                          </div>
                          <button
                            onClick={() => handleDeleteSkill(category.id, skillIndex)}
                            className="ml-2 rounded p-1 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                          <div className="flex w-1/2 items-center">
                            <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                              <div
                                className="h-2 rounded-full bg-green-600 dark:bg-green-500"
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 w-8 text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
