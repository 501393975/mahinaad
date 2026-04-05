'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { register } = useAuth()

  if (user) {
    router.push('/dashboard')
    return null
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('পাসওয়ার্ড মিলছে না')
      return
    }

    setLoading(true)

    try {
      await register(email, password, name)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent text-gradient text-3d">
          শুরু করুন
        </h1>
        <p className="text-gray-600 text-center mb-8 text-shadow-glow">আপনার অ্যাকাউন্ট তৈরি করুন</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
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
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-90 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 mt-6 text-shadow-glow"
          >
            {loading ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'রেজিস্টার'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-shadow-glow">
          অ্যাকাউন্ট আছে?{' '}
          <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
            এখানে লগইন করুন
          </Link>
        </p>
      </div>
    </div>
  )
}
