"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { checkAuth } from "@/lib/auth"
import AdminSidebar from "@/components/admin/sidebar"
import { Loader2, Save } from "lucide-react"

interface CertificateData {
  id: string
  title: string
  issuer: string
  date: string
  credentialUrl: string
}

export default function EditCertificatePage() {
  const [certificateData, setCertificateData] = useState<CertificateData>({
    id: "",
    title: "",
    issuer: "",
    date: "",
    credentialUrl: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const router = useRouter()
  const params = useParams()
  const certificateId = params.id as string

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuth()
      if (!isAuthenticated) {
        router.push("/admin")
        return
      }

      try {
        const data = await import("@/lib/data/certificates.json")
        const certificate = data.default.find((c: CertificateData) => c.id === certificateId)

        if (certificate) {
          setCertificateData(certificate)
        } else {
          // Certificate not found
          alert("Certificate not found")
          router.push("/admin/dashboard/certificates")
        }
      } catch (error) {
        console.error("Error loading certificate data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    verifyAuth()
  }, [router, certificateId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCertificateData((prev) => ({
      ...prev,
      [name]: value,
    }))
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
      setSaveMessage("Certificate updated successfully!")

      // Log the data that would be saved to the JSON file
      console.log("Updating certificate data in certificates.json:", certificateData)

      // Redirect to certificates list after a short delay
      setTimeout(() => {
        router.push("/admin/dashboard/certificates")
      }, 1500)
    } catch (error) {
      console.error("Error saving certificate data:", error)
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Certificate</h1>
          <p className="text-gray-600 dark:text-gray-400">Update certificate details</p>
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
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Certificate Details</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Certificate Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={certificateData.title}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Issuer</label>
                <input
                  type="text"
                  name="issuer"
                  value={certificateData.issuer}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
              <input
                type="text"
                name="date"
                value={certificateData.date}
                onChange={handleChange}
                placeholder="e.g., 2023"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Credential URL</label>
              <input
                type="url"
                name="credentialUrl"
                value={certificateData.credentialUrl}
                onChange={handleChange}
                placeholder="https://example.com/certificate/123456"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard/certificates")}
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
                  Update Certificate
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
