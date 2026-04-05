'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    router.push('/login')
    return null
  }

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/login')
  }

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Tasks', href: '/dashboard/tasks', icon: '📋' },
    { name: 'Wallet', href: '/dashboard/wallet', icon: '💰' },
    { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: '🏆' },
    { name: 'Referral', href: '/dashboard/referral', icon: '👥' },
    { name: 'Games', href: '/dashboard/games', icon: '🎮' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            🚀 EarnLearn
          </h1>
          
          <nav className="hidden md:flex gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                {item.icon} {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-white text-sm hidden sm:inline">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Logout
            </button>
            
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/40 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon} {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
