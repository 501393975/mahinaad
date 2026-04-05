'use client'

import { createContext, useContext, ReactNode, useEffect, useState } from 'react'

interface UserData {
  uid: string
  email: string
  name: string
  referrals: number
  workPoints: number
  balance: number
}

interface AuthContextType {
  user: any
  userData: UserData | null
  loading: boolean
  error: any
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('earnlearn_user')
    const savedUserData = localStorage.getItem('earnlearn_userdata')

    if (savedUser && savedUserData) {
      setUser(JSON.parse(savedUser))
      setUserData(JSON.parse(savedUserData))
    }

    setLoading(false)
  }, [])

  const register = async (email: string, password: string, name: string) => {
    setLoading(true)
    setError(null)

    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('earnlearn_users') || '[]')
      const userExists = existingUsers.find((u: any) => u.email === email)

      if (userExists) {
        throw new Error('Email already in use')
      }

      // Create new user
      const newUser = {
        uid: Date.now().toString(),
        email,
        password, // In real app, this would be hashed
        name
      }

      const newUserData: UserData = {
        uid: newUser.uid,
        email,
        name,
        referrals: 0,
        workPoints: 0,
        balance: 0
      }

      // Save to "database" (localStorage)
      existingUsers.push(newUser)
      localStorage.setItem('earnlearn_users', JSON.stringify(existingUsers))

      // Set current user
      setUser({ uid: newUser.uid, email: newUser.email })
      setUserData(newUserData)

      // Save to localStorage
      localStorage.setItem('earnlearn_user', JSON.stringify({ uid: newUser.uid, email: newUser.email }))
      localStorage.setItem('earnlearn_userdata', JSON.stringify(newUserData))

    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      // Get users from "database"
      const existingUsers = JSON.parse(localStorage.getItem('earnlearn_users') || '[]')
      const user = existingUsers.find((u: any) => u.email === email && u.password === password)

      if (!user) {
        throw new Error('Invalid email or password')
      }

      // Create user data
      const userData: UserData = {
        uid: user.uid,
        email: user.email,
        name: user.name,
        referrals: 0,
        workPoints: 0,
        balance: 0
      }

      // Set current user
      setUser({ uid: user.uid, email: user.email })
      setUserData(userData)

      // Save to localStorage
      localStorage.setItem('earnlearn_user', JSON.stringify({ uid: user.uid, email: user.email }))
      localStorage.setItem('earnlearn_userdata', JSON.stringify(userData))

    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setUserData(null)
    localStorage.removeItem('earnlearn_user')
    localStorage.removeItem('earnlearn_userdata')
  }

  return (
    <AuthContext.Provider value={{
      user,
      userData,
      loading,
      error,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
