"use client"

// In a real application, you would use a more secure method for authentication
// This is a simple implementation for demonstration purposes

const AUTH_TOKEN_KEY = "portfolio_admin_auth"

interface User {
  username: string
  password: string
  name: string
}

export async function authenticate(username: string, password: string): Promise<boolean> {
  try {
    // In a real app, this would be an API call to your backend
    // For this demo, we'll use a hardcoded user
    const users: User[] = [
      {
        username: "admin",
        password: "admin123",
        name: "Admin User",
      },
    ]

    const user = users.find((u) => u.username === username && u.password === password)

    if (user) {
      // Store authentication token
      localStorage.setItem(
        AUTH_TOKEN_KEY,
        JSON.stringify({
          username: user.username,
          name: user.name,
          timestamp: Date.now(),
        }),
      )
      return true
    }

    return false
  } catch (error) {
    console.error("Authentication error:", error)
    return false
  }
}

export async function checkAuth(): Promise<boolean> {
  try {
    const authData = localStorage.getItem(AUTH_TOKEN_KEY)

    if (!authData) {
      return false
    }

    const { username, timestamp } = JSON.parse(authData)

    // Check if token is expired (24 hours)
    if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(AUTH_TOKEN_KEY)
      return false
    }

    // In a real app, you would verify the token with your backend
    return true
  } catch (error) {
    console.error("Auth check error:", error)
    return false
  }
}

export async function logout(): Promise<void> {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [user, setUser] = useState<{ username: string; name: string } | null>(null)

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await checkAuth()
      setIsAuthenticated(authenticated)

      if (authenticated) {
        const authData = localStorage.getItem(AUTH_TOKEN_KEY)
        if (authData) {
          const { username, name } = JSON.parse(authData)
          setUser({ username, name })
        }
      } else {
        setUser(null)
      }
    }

    checkAuthentication()
  }, [])

  return { isAuthenticated, user }
}

// Add missing import
import { useState, useEffect } from "react"
