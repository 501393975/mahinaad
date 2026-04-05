import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function Dashboard() {
  const { user, userData, logout } = useAuth()

  const stats = [
    { label: 'ব্যালেন্স', value: `₹${userData?.balance || 0}`, icon: '💰', color: 'from-green-400 to-green-600' },
    { label: 'টাস্ক সম্পন্ন', value: userData?.workPoints || 0, icon: '✅', color: 'from-blue-400 to-blue-600' },
    { label: 'রেফারেল', value: userData?.referrals || 0, icon: '👥', color: 'from-purple-400 to-purple-600' },
    { label: 'র‍্যাঙ্ক', value: '#-', icon: '🏆', color: 'from-yellow-400 to-yellow-600' },
  ]

  const features = [
    {
      title: 'টাস্ক সম্পন্ন করুন',
      description: 'সহজ টাস্ক করে টাকা আয় করুন',
      icon: '📋',
      link: '/dashboard/tasks',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'ওয়ালেট ম্যানেজ করুন',
      description: 'ব্যালেন্স দেখুন এবং উত্তোলন করুন',
      icon: '💰',
      link: '/dashboard/wallet',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'লিডারবোর্ড',
      description: 'টপ পারফর্মার এবং র‍্যাঙ্কিং দেখুন',
      icon: '🏆',
      link: '/dashboard/leaderboard',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'রেফারেল প্রোগ্রাম',
      description: 'বন্ধুদের আমন্ত্রণ করে বোনাস পান',
      icon: '👥',
      link: '/dashboard/referral',
      color: 'from-pink-500 to-rose-500',
    },
    {
      title: 'গেম খেলুন',
      description: 'গেম খেলে রিওয়ার্ড জিতুন',
      icon: '🎮',
      link: '/dashboard/games',
      color: 'from-purple-500 to-indigo-500',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold mb-2 text-gradient text-3d">স্বাগতম ফিরে আসুন, {userData?.name || user?.email?.split('@')[0]}! 👋</h2>
            <p className="text-lg opacity-90 text-shadow-glow">আজ আয় করার জন্য রেডি? নিচ থেকে একটি কার্যকলাপ বেছে নিন।</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition text-shadow-glow"
          >
            লগআউট
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg`}
          >
            <div className="text-4xl mb-2">{stat.icon}</div>
            <p className="text-sm opacity-90 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Link
            key={index}
            href={feature.link}
            className={`bg-gradient-to-br ${feature.color} rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition transform group`}
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition">{feature.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
            <p className="opacity-90">{feature.description}</p>
            <div className="mt-4 inline-block px-4 py-2 bg-white/20 rounded-lg text-sm font-semibold group-hover:bg-white/30 transition text-shadow-glow">
              শুরু করুন →
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
