'use client'

import { useState, useEffect } from 'react'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface LeaderboardEntry {
  rank: number
  name: string
  score: number
  badge?: string
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'referral' | 'work'>('referral')
  const [referralData, setReferralData] = useState<LeaderboardEntry[]>([])
  const [workData, setWorkData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true)
      try {
        // Fetch referral leaderboard
        const referralQuery = query(collection(db, 'users'), orderBy('referrals', 'desc'), limit(100))
        const referralSnapshot = await getDocs(referralQuery)
        const referralEntries: LeaderboardEntry[] = []
        referralSnapshot.forEach((doc, index) => {
          const data = doc.data()
          const rank = index + 1
          const name = rank > 70 ? data.name : `Anonymous #${rank}`
          referralEntries.push({
            rank,
            name,
            score: data.referrals,
            badge: rank <= 3 ? (rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉') : undefined
          })
        })
        setReferralData(referralEntries)

        // Fetch work leaderboard
        const workQuery = query(collection(db, 'users'), orderBy('workPoints', 'desc'), limit(100))
        const workSnapshot = await getDocs(workQuery)
        const workEntries: LeaderboardEntry[] = []
        workSnapshot.forEach((doc, index) => {
          const data = doc.data()
          const rank = index + 1
          const name = rank > 70 ? data.name : `Anonymous #${rank}`
          workEntries.push({
            rank,
            name,
            score: data.workPoints,
            badge: rank <= 3 ? (rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉') : undefined
          })
        })
        setWorkData(workEntries)
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
      }
      setLoading(false)
    }
    fetchLeaderboard()
  }, [])

  const currentLeaderboard = activeTab === 'referral' ? referralData : workData
  const title = activeTab === 'referral' ? 'শীর্ষ রেফারার' : 'শীর্ষ আয়কারী'
  const subtitle = activeTab === 'referral' ? 'সবচেয়ে সফল রেফারেল আমন্ত্রণ' : 'সর্বোচ্চ টাস্ক কমপ্লিশন আয়'
  const icon = activeTab === 'referral' ? '👥' : '💼'

  if (loading) {
    return <div className="text-center text-white text-shadow-glow">লিডারবোর্ড লোড হচ্ছে...</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2 text-gradient text-3d">🏆 লিডারবোর্ড</h1>
        <p className="text-lg opacity-90 text-shadow-glow">র‍্যাঙ্কিং এবং অন্যদের সাথে প্রতিযোগিতা দেখুন</p>
      </div>

      {/* Tab Switch */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab('referral')}
          className={`flex-1 py-4 rounded-lg font-bold text-lg transition text-shadow-glow ${
            activeTab === 'referral'
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          👥 রেফারেল লিডার
        </button>
        <button
          onClick={() => setActiveTab('work')}
          className={`flex-1 py-4 rounded-lg font-bold text-lg transition text-shadow-glow ${
            activeTab === 'work'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          💼 ওয়ার্ক লিডার
        </button>
      </div>

      {/* Leaderboard Title */}
      <div className="text-center mb-4">
        <p className="text-5xl mb-2">{icon}</p>
        <h2 className="text-3xl font-bold text-white text-gradient mb-2">{title}</h2>
        <p className="text-gray-300 text-shadow-glow">{subtitle}</p>
      </div>

      {/* Leaderboard Table */}
      <div className="space-y-3">
        {currentLeaderboard.map((entry, index) => (
          <div
            key={entry.rank}
            className={`rounded-xl p-6 flex items-center justify-between border-2 transition ${
              index < 3
                ? 'bg-gradient-to-r ' +
                  (index === 0
                    ? 'from-yellow-600 to-amber-600 border-yellow-400'
                    : index === 1
                      ? 'from-gray-600 to-slate-600 border-gray-400'
                      : 'from-orange-600 to-amber-600 border-orange-400')
                : 'bg-white/10 border-white/20 hover:bg-white/20'
            }`}
          >
            <div className="flex items-center gap-6 flex-1">
              <div className="text-4xl font-bold text-white w-16 text-center">
                {entry.badge || `#${entry.rank}`}
              </div>
              <div>
                <p className="text-xl font-bold text-white">{entry.name}</p>
                <p className="text-sm text-gray-300">
                  {activeTab === 'referral' ? 'Successful Referrals' : 'Tasks Completed'}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p
                className={`text-3xl font-bold ${
                  index < 3 ? 'text-white' : 'text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text'
                }`}
              >
                {entry.score}
              </p>
              <p className="text-sm text-gray-300">
                {activeTab === 'referral' ? 'Referrals' : '₹'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Your Rank */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <h3 className="text-2xl font-bold mb-4">Your Ranking</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Current Rank</p>
            <p className="text-3xl font-bold">#124</p>
          </div>
          <div>
            <p className="text-sm opacity-90 mb-1">Points</p>
            <p className="text-3xl font-bold">450</p>
          </div>
          <div>
            <p className="text-sm opacity-90 mb-1">Percentile</p>
            <p className="text-3xl font-bold">78%</p>
          </div>
          <div>
            <p className="text-sm opacity-90 mb-1">Next Rank</p>
            <p className="text-3xl font-bold">#100</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-sm mb-3">Distance to next rank: 75 points</p>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-75 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-green-500/20 border border-green-500/50 rounded-2xl p-6">
        <p className="text-green-200 font-semibold mb-2">💡 Pro Tips:</p>
        <ul className="text-green-100 space-y-1 text-sm">
          <li>• Complete more tasks to climb the work leaderboard</li>
          <li>• Refer friends to earn bonus points on the referral board</li>
          <li>• Top 10 players get monthly rewards</li>
        </ul>
      </div>
    </div>
  )
}
