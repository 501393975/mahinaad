'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl text-shadow-glow">লোড হচ্ছে...</div>
      </div>
    )
  }

  if (user) {
    router.push('/dashboard')
    return null
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 bg-black/30 backdrop-blur-md border-b border-white/10">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 text-gradient text-3d">
          🚀 EarnLearn
        </h1>
        <div className="space-x-4">
          <Link
            href="/login"
            className="text-white hover:text-pink-400 font-semibold transition text-shadow-glow"
          >
            লগইন
          </Link>
          <Link
            href="/register"
            className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-90 text-white px-6 py-2 rounded-lg font-bold transition text-shadow-glow"
          >
            সাইন আপ
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight text-gradient text-3d">
            শিখুন • আয় করুন • খেলুন
          </h2>
          <p className="text-2xl text-gray-200 mb-8 text-shadow-glow">
            টাস্ক সম্পন্ন করুন, টাকা আয় করুন, এবং মূল্যবান দক্ষতা শিখতে মজা করুন
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <Link
              href="/register"
              className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-90 text-white px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 text-shadow-glow"
            >
              আজই শুরু করুন
            </Link>
            <Link
              href="/login"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg transition text-shadow-glow"
            >
              ইতিমধ্যে মেম্বার?
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:border-white/40 transition">
              <p className="text-5xl mb-4">📋</p>
              <h3 className="text-2xl font-bold text-white mb-2 text-gradient">টাস্ক সম্পন্ন করুন</h3>
              <p className="text-gray-300 text-shadow-glow">সহজ, মাঝারি এবং কঠিন টাস্ক যা ₹50-₹300 প্রতিটি</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:border-white/40 transition">
              <p className="text-5xl mb-4">💰</p>
              <h3 className="text-2xl font-bold text-white mb-2 text-gradient">তাত্ক্ষণিক পেআউট</h3>
              <p className="text-gray-300 text-shadow-glow">ব্যাংক বা UPI এর মাধ্যমে যেকোনো সময় উত্তোলন করুন</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:border-white/40 transition">
              <p className="text-5xl mb-4">🎮</p>
              <h3 className="text-2xl font-bold text-white mb-2 text-gradient">খেলুন এবং জিতুন</h3>
              <p className="text-gray-300 text-shadow-glow">মজার গেম যেখানে আপনি প্রতিদিন বোনাস রিওয়ার্ড জিততে পারেন</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:border-white/40 transition">
              <p className="text-5xl mb-4">👥</p>
              <h3 className="text-2xl font-bold text-white mb-2 text-gradient">রেফারেল বোনাস</h3>
              <p className="text-gray-300 text-shadow-glow">আপনার কোড ব্যবহার করে যোগ দেওয়া প্রতিটি বন্ধুর জন্য ₹10 আয় করুন</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:border-white/40 transition">
              <p className="text-5xl mb-4">🏆</p>
              <h3 className="text-2xl font-bold text-white mb-2 text-gradient">লিডারবোর্ড</h3>
              <p className="text-gray-300">Compete with others and win monthly rewards</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:border-white/40 transition">
              <p className="text-5xl mb-4">🔒</p>
              <h3 className="text-2xl font-bold text-white mb-2">100% Safe</h3>
              <p className="text-gray-300">Your data is secure with Firebase encryption</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black/40 backdrop-blur py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              10K+
            </p>
            <p className="text-gray-300 mt-2">Active Users</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              ₹50L+
            </p>
            <p className="text-gray-300 mt-2">Paid Out</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              100+
            </p>
            <p className="text-gray-300 mt-2">Tasks Daily</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
              4.8⭐
            </p>
            <p className="text-gray-300 mt-2">App Rating</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-5xl font-bold text-white mb-6 text-gradient text-3d">আয় শুরু করতে রেডি?</h3>
          <p className="text-xl text-gray-300 mb-8 text-shadow-glow">
            টাস্ক সম্পন্ন করে, গেম খেলে এবং বন্ধুদের রেফার করে টাকা আয় করতে হাজারো ইউজারের সাথে যোগ দিন।
          </p>
          <Link
            href="/register"
            className="inline-block bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-90 text-white px-10 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 text-shadow-glow"
          >
            এখনই সাইন আপ করুন - এটা ফ্রি!
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 backdrop-blur border-t border-white/10 p-6 text-center text-gray-400">
        <p className="text-shadow-glow">© 2024 EarnLearn. সব অধিকার সংরক্ষিত। | শিখুন • আয় করুন • খেলুন 🚀</p>
      </footer>
    </div>
  )
}
