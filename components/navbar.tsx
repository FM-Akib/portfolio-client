"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Certificates", href: "#certificates" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
  { name: "Blog", href: "/blog" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState("home")
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Determine active section based on scroll position
      const sections = navItems.map((item) => item.href.replace("#", "")).filter((id) => document.getElementById(id))

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/90 backdrop-blur-md py-3 shadow-md" : "bg-transparent py-5",
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
          >
            Portfolio
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => {
            const isActive =
              activeSection === item.href.replace("#", "") ||
              (item.href === "/blog" && window.location.pathname.startsWith("/blog"))

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary",
                  )}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault()
                      document.querySelector(item.href)?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  }}
                >
                  {item.name}
                </Link>
              </motion.div>
            )
          })}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
            className="ml-2"
          >
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
                aria-label="Toggle theme"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
          >
            <Button
              className="ml-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector("#contact")?.scrollIntoView({
                  behavior: "smooth",
                })
              }}
            >
              Get in Touch
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md"
          >
            <div className="container py-4 flex flex-col space-y-3">
              {navItems.map((item) => {
                const isActive =
                  activeSection === item.href.replace("#", "") ||
                  (item.href === "/blog" && window.location.pathname.startsWith("/blog"))

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary",
                    )}
                    onClick={(e) => {
                      if (item.href.startsWith("#")) {
                        e.preventDefault()
                        document.querySelector(item.href)?.scrollIntoView({
                          behavior: "smooth",
                        })
                      }
                      setMobileMenuOpen(false)
                    }}
                  >
                    {item.name}
                  </Link>
                )
              })}
              <Button
                className="w-full mt-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#contact")?.scrollIntoView({
                    behavior: "smooth",
                  })
                  setMobileMenuOpen(false)
                }}
              >
                Get in Touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
