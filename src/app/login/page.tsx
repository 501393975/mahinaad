'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  if (user) {
    router.push('/dashboard')
    return null
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent text-gradient text-3d">
          স্বাগতম ফিরে
        </h1>
        <p className="text-gray-600 text-center mb-8 text-shadow-glow">আপনার অ্যাকাউন্টে লগইন করুন</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-shadow-glow">ইমেইল</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-shadow-glow">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-90 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 text-shadow-glow"
          >
            {loading ? 'লগইন হচ্ছে...' : 'লগইন'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-shadow-glow">
          অ্যাকাউন্ট নেই?{' '}
          <Link href="/register" className="text-indigo-600 font-semibold hover:underline">
            এখানে রেজিস্টার করুন
          </Link>
        </p>
      </div>
    </div>
  )
}
