'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

interface Transaction {
  id: string
  type: 'earn' | 'withdraw'
  amount: number
  date: string
  status: 'completed' | 'pending'
  description: string
}

const sampleTransactions: Transaction[] = [
  {
    id: '1',
    type: 'earn',
    amount: 100,
    date: '2024-03-25',
    status: 'completed',
    description: 'Task completion - Survey',
  },
  {
    id: '2',
    type: 'earn',
    amount: 50,
    date: '2024-03-24',
    status: 'completed',
    description: 'Referral bonus',
  },
]

export default function WalletPage() {
  const { user } = useAuth()
  const [balance] = useState(500)
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [bankAccount, setBankAccount] = useState('')
  const [showWithdrawForm, setShowWithdrawForm] = useState(false)
  const [error, setError] = useState('')

  const handleWithdrawal = () => {
    if (!withdrawAmount || !bankAccount) {
      setError('Please fill all fields')
      return
    }

    const amount = parseInt(withdrawAmount)
    if (amount < 100) {
      setError('Minimum withdrawal is ₹100')
      return
    }

    if (amount > balance) {
      setError('Insufficient balance')
      return
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'withdraw',
      amount,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      description: `Withdrawal to ${bankAccount}`,
    }

    setTransactions([newTransaction, ...transactions])
    setWithdrawAmount('')
    setBankAccount('')
    setShowWithdrawForm(false)
    setError('')
  }

  const pendingWithdrawals = transactions.filter(
    (t) => t.type === 'withdraw' && t.status === 'pending'
  ).length

  const statusColor = {
    completed: 'bg-green-500/20 text-green-400 border border-green-500/50',
    pending: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50',
  }

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
          <p className="text-sm opacity-90 mb-2">Current Balance</p>
          <p className="text-5xl font-bold">₹{balance}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
          <p className="text-sm opacity-90 mb-2">Total Earned</p>
          <p className="text-5xl font-bold">₹150</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white shadow-xl">
          <p className="text-sm opacity-90 mb-2">Pending Withdrawals</p>
          <p className="text-5xl font-bold">{pendingWithdrawals}</p>
        </div>
      </div>

      {/* Withdrawal Button */}
      <button
        onClick={() => setShowWithdrawForm(!showWithdrawForm)}
        className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-90 text-white px-8 py-4 rounded-lg font-bold text-lg transition"
      >
        + Request Withdrawal
      </button>

      {/* Withdrawal Form */}
      {showWithdrawForm && (
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-2xl font-bold text-white mb-6">Request Withdrawal</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">Amount (₹)</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Minimum ₹100"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">Available: ₹{balance}</p>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Bank Account / UPI</label>
              <input
                type="text"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                placeholder="Enter your bank account or UPI ID"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 outline-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleWithdrawal}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white px-6 py-3 rounded-lg font-bold transition"
              >
                Confirm Withdrawal
              </button>
              <button
                onClick={() => setShowWithdrawForm(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur">
        <h2 className="text-2xl font-bold text-white mb-6">Transaction History</h2>

        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition"
            >
              <div className="flex-1">
                <p className="text-white font-semibold">{transaction.description}</p>
                <p className="text-gray-400 text-sm">{transaction.date}</p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    statusColor[transaction.status]
                  }`}
                >
                  {transaction.status === 'completed' ? '✓' : '⏳'} {transaction.status}
                </span>
                <span
                  className={`text-lg font-bold ${
                    transaction.type === 'earn' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {transaction.type === 'earn' ? '+' : '-'}₹{transaction.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-500/20 border border-blue-500/50 rounded-2xl p-6">
        <p className="text-blue-200">
          ℹ️ Withdrawals are processed within 2-3 business days. Ensure your bank account or UPI ID is correct.
        </p>
      </div>
    </div>
  )
}
