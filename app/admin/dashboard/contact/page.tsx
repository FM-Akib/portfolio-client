"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkAuth } from "@/lib/auth"
import AdminSidebar from "@/components/admin/sidebar"
import { Loader2, Save } from "lucide-react"

interface ContactData {
  email: string
  phone: string
  address: string
  socialLinks: {
    linkedin: string
    github: string
    twitter: string
  }
  availableFor: string[]
}

export default function ContactPage() {
  const [contactData, setContactData] = useState<ContactData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [newAvailability, setNewAvailability] = useState("")
  const router = useRouter()

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuth()
      if (!isAuthenticated) {
        router.push("/admin")
        return
      }

      try {
        const data = await import("@/lib/data/contact.json")
        setContactData(data.default)
      } catch (error) {
        console.error("Error loading contact data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    verifyAuth()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      // Handle nested properties (for social links)
      const [parent, child] = name.split(".")
      setContactData((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          [parent]: {
            ...(prev[parent as keyof ContactData] as Record<string, unknown>),
            [child]: value,
          },
        }
      })
    } else {
      // Handle top-level properties
      setContactData((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          [name]: value,
        }
      })
    }
  }

  const addAvailability = () => {
    if (newAvailability.trim() && contactData) {
      setContactData({
        ...contactData,
        availableFor: [...contactData.availableFor, newAvailability.trim()],
      })
      setNewAvailability("")
    }
  }

  const removeAvailability = (index: number) => {
    if (contactData) {
      const updatedAvailableFor = [...contactData.availableFor]
      updatedAvailableFor.splice(index, 1)
      setContactData({
        ...contactData,
        availableFor: updatedAvailableFor,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveMessage("")

    try {
      // In a real app, this would be an API call to save the data to the JSON file
      // For this demo, we'll just simulate a save
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      setSaveMessage("Contact information saved successfully!")

      // Log the data that would be saved to the JSON file
      console.log("Saving contact data to contact.json:", contactData)
    } catch (error) {
      console.error("Error saving contact data:", error)
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Information</h1>
          <p className="text-gray-600 dark:text-gray-400">Edit your contact details and social links</p>
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

        {contactData && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Contact Details</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={contactData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={contactData.phone}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                <input
                  type="text"
                  name="address"
                  value={contactData.address}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Social Links</h2>

              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn</label>
                  <input
                    type="url"
                    name="socialLinks.linkedin"
                    value={contactData.socialLinks.linkedin}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</label>
                  <input
                    type="url"
                    name="socialLinks.github"
                    value={contactData.socialLinks.github}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Twitter</label>
                  <input
                    type="url"
                    name="socialLinks.twitter"
                    value={contactData.socialLinks.twitter}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Available For</h2>

              <div className="mb-4 space-y-2">
                {contactData.availableFor.map((item, index) => (
                  <div key={index} className="flex items-center rounded-md bg-gray-50 px-3 py-2 dark:bg-gray-700">
                    <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{item}</span>
                    <button
                      type="button"
                      onClick={() => removeAvailability(index)}
                      className="ml-2 rounded-full p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex">
                <input
                  type="text"
                  value={newAvailability}
                  onChange={(e) => setNewAvailability(e.target.value)}
                  className="w-full rounded-l-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Freelance projects"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addAvailability()
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addAvailability}
                  className="rounded-r-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Add
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Add types of work or opportunities you're available for
              </p>
            </div>

            <div className="flex justify-end">
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
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}
