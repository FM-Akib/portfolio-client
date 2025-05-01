"use client"
import { useRouter } from "next/navigation"
import { Settings } from "lucide-react"

export default function AdminAccessButton() {
  const router = useRouter()

  const handleClick = () => {
    router.push("/admin")
  }

  return (
    <button
      onClick={handleClick}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      aria-label="Admin Access"
    >
      <Settings className="h-6 w-6" />
    </button>
  )
}
