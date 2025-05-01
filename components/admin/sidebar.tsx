"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Code,
  Award,
  BadgeIcon as Certificate,
  Mail,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"
import { logout } from "@/lib/auth"

export default function AdminSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const pathname = usePathname()
  const router = useRouter()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleLogout = async () => {
    await logout()
    router.push("/admin")
  }

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/admin/dashboard",
    },
    {
      title: "About",
      icon: <User className="h-5 w-5" />,
      href: "/admin/dashboard/about",
    },
    {
      title: "Projects",
      icon: <Briefcase className="h-5 w-5" />,
      href: "/admin/dashboard/projects",
      submenu: [
        { title: "All Projects", href: "/admin/dashboard/projects" },
        { title: "Add New", href: "/admin/dashboard/projects/new" },
      ],
    },
    {
      title: "Experience",
      icon: <FileText className="h-5 w-5" />,
      href: "/admin/dashboard/experience",
    },
    {
      title: "Skills",
      icon: <Code className="h-5 w-5" />,
      href: "/admin/dashboard/skills",
    },
    {
      title: "Achievements",
      icon: <Award className="h-5 w-5" />,
      href: "/admin/dashboard/achievements",
    },
    {
      title: "Certificates",
      icon: <Certificate className="h-5 w-5" />,
      href: "/admin/dashboard/certificates",
    },
    {
      title: "Blog",
      icon: <FileText className="h-5 w-5" />,
      href: "/admin/dashboard/blog",
      submenu: [
        { title: "All Posts", href: "/admin/dashboard/blog" },
        { title: "Add New", href: "/admin/dashboard/blog/new" },
      ],
    },
    {
      title: "Contact",
      icon: <Mail className="h-5 w-5" />,
      href: "/admin/dashboard/contact",
    },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed left-4 top-4 z-50 block md:hidden">
        <button onClick={toggleMobileMenu} className="rounded-md bg-green-600 p-2 text-white focus:outline-none">
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-40 transform bg-gray-900 bg-opacity-50 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={toggleMobileMenu}
      ></div>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform overflow-y-auto bg-white transition-transform duration-300 dark:bg-gray-800 md:relative md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center border-b px-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h2>
          </div>

          <nav className="flex-1 space-y-1 px-2 py-4">
            {menuItems.map((item) => (
              <div key={item.title}>
                {item.submenu ? (
                  <div className="mb-1">
                    <button
                      onClick={() => toggleExpand(item.title)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium ${
                        pathname.startsWith(item.href)
                          ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="ml-3">{item.title}</span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${expandedItems[item.title] ? "rotate-180" : ""}`}
                      />
                    </button>
                    {expandedItems[item.title] && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className={`block rounded-md px-3 py-2 text-sm font-medium ${
                              isActive(subItem.href)
                                ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`mb-1 flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                      isActive(item.href)
                        ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="border-t p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
