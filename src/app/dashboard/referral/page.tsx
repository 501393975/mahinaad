'use client'

import { useState, useEffect } from 'react'

interface Referral {
  id: string
  name: string
  email: string
  joinDate: string
  earned: number
  status: 'active' | 'pending'
}

const generateReferralCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

const sampleReferrals: Referral[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: '2024-03-10',
    earned: 100,
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    joinDate: '2024-03-15',
    earned: 50,
    status: 'active',
  },
]

export default function ReferralPage() {
  const [referralCode, setReferralCode] = useState('')
  const [referrals, setReferrals] = useState<Referral[]>(sampleReferrals)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!referralCode) {
      setReferralCode(generateReferralCode())
    }
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const totalEarned = referrals.reduce((sum, ref) => sum + ref.earned, 0)
  const activeReferrals = referrals.filter((r) => r.status === 'active').length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">👥 Referral Program</h1>
        <p className="text-lg opacity-90">Invite friends and earn ₹10 per successful referral</p>
      </div>

      {/* Referral Code Section */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Your Referral Code</h2>
        <p className="text-gray-200 mb-6">Share this code with friends to earn bonus on successful signup</p>

        <div className="flex gap-3 flex-col md:flex-row">
          <div className="flex-1">
            <div className="bg-white/10 border-2 border-white/30 rounded-lg p-6 text-center backdrop-blur">
              <p className="text-gray-300 text-sm mb-2">Code</p>
              <p className="text-5xl font-bold tracking-widest">{referralCode}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={copyToClipboard}
              className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold transition flex-1 md:flex-none"
            >
              {copied ? '✓ Copied!' : 'Copy Code'}
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-bold border border-white/50 transition">
              Share on WhatsApp
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-300 mt-4 bg-white/10 p-4 rounded-lg">
          🔐 Keep your code safe. Each successful referral adds ₹10 to your account on one device only.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
          <p className="text-sm opacity-90 mb-2">Active Referrals</p>
          <p className="text-5xl font-bold">{activeReferrals}</p>
          <p className="text-xs text-gray-200 mt-2">People using your code</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
          <p className="text-sm opacity-90 mb-2">Earned from Referrals</p>
          <p className="text-5xl font-bold">₹{totalEarned}</p>
          <p className="text-xs text-gray-200 mt-2">Total bonus earned</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
          <p className="text-sm opacity-90 mb-2">Next Reward</p>
          <p className="text-5xl font-bold">₹{(10 - (activeReferrals % 10)) * 10}</p>
          <p className="text-xs text-gray-200 mt-2">Until milestone</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
        <h3 className="text-2xl font-bold text-white mb-6">How It Works</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 flex items-center justify-center text-white font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Share Your Code</h4>
              <p className="text-gray-300">Share your unique referral code with friends via WhatsApp, email, or social media</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 flex items-center justify-center text-white font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Friend Signs Up</h4>
              <p className="text-gray-300">Your friend registers using your referral code on one new device</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 flex items-center justify-center text-white font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Get Bonus</h4>
              <p className="text-gray-300">Earn ₹10 instantly to your account when they complete registration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Referrals List */}
      <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
        <h3 className="text-2xl font-bold text-white mb-6">Your Referrals</h3>

        {referrals.length > 0 ? (
          <div className="space-y-3">
            {referrals.map((referral) => (
              <div
                key={referral.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition"
              >
                <div className="flex-1">
                  <p className="text-white font-bold">{referral.name}</p>
                  <p className="text-gray-400 text-sm">{referral.email}</p>
                  <p className="text-xs text-gray-500 mt-1">Joined: {referral.joinDate}</p>
                </div>

                <div className="flex items-center gap-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                      referral.status === 'active'
                        ? 'bg-green-500/20 text-green-400 border-green-500/50'
                        : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                    }`}
                  >
                    {referral.status === 'active' ? '✓ Active' : '⏳ Pending'}
                  </span>
                  <div className="text-right">
                    <p className="text-white font-bold">₹{referral.earned}</p>
                    <p className="text-xs text-gray-400">earned</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">No referrals yet. Share your code to get started!</p>
          </div>
        )}
      </div>

      {/* Bonus Tiers */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <h3 className="text-2xl font-bold mb-6">Bonus Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-lg font-bold mb-2">5 Referrals</p>
            <p className="text-3xl font-bold text-yellow-300">₹50</p>
            <p className="text-sm opacity-90 mt-2">Bonus reward</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-lg font-bold mb-2">10 Referrals</p>
            <p className="text-3xl font-bold text-yellow-300">₹150</p>
            <p className="text-sm opacity-90 mt-2">Bonus reward</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-lg font-bold mb-2">20+ Referrals</p>
            <p className="text-3xl font-bold text-yellow-300">₹500</p>
            <p className="text-sm opacity-90 mt-2">Bonus reward</p>
          </div>
        </div>
      </div>
    </div>
  )
}
