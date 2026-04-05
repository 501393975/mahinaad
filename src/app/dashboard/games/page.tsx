'use client'

import { useState } from 'react'

interface Game {
  id: string
  name: string
  description: string
  icon: string
  maxReward: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

const games: Game[] = [
  {
    id: '1',
    name: 'নাম্বার গেস',
    description: '১-১০০ এর মধ্যে নাম্বার অনুমান করুন। সঠিক হলে জিতুন!',
    icon: '🎯',
    maxReward: 50,
    difficulty: 'Easy',
  },
  {
    id: '2',
    name: 'মেমরি ম্যাচ',
    description: 'জোড়া কার্ড মিলিয়ে নিন। সব জোড়া মিলিয়ে জিতুন!',
    icon: '🧠',
    maxReward: 75,
    difficulty: 'Medium',
  },
  {
    id: '3',
    name: 'ট্যাপ স্পিড',
    description: '১০ সেকেন্ডে যত তাড়াতাড়ি ট্যাপ করুন। বেশি স্কোর = বড় রিওয়ার্ড!',
    icon: '⚡',
    maxReward: 100,
    difficulty: 'Medium',
  },
  {
    id: '4',
    name: 'ওয়ার্ড পাজল',
    description: 'ওয়ার্ডগুলো আনস্ক্র্যাম্বল করে পাজল সমাধান করুন',
    icon: '📝',
    maxReward: 150,
    difficulty: 'Hard',
  },
  {
    id: '5',
    name: 'লাভ টেস্ট',
    description: 'আপনার ক্রাশের সাথে লাভ কম্প্যাটিবিলিটি টেস্ট করুন!',
    icon: '❤️',
    maxReward: 200,
    difficulty: 'Easy',
  },
]

export default function GamesPage() {
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null)
  const [totalWinnings, setTotalWinnings] = useState(0)
  const [gamesPlayed, setGamesPlayed] = useState(0)

  const selectedGame = games.find((g) => g.id === selectedGameId)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2 text-gradient text-3d">🎮 খেলুন এবং আয় করুন</h1>
        <p className="text-lg opacity-90 text-shadow-glow">মজার গেম খেলুন এবং রিয়েল মানি জিতুন!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
          <p className="text-sm opacity-90 mb-2 text-shadow-glow">মোট জয়</p>
          <p className="text-4xl font-bold text-gradient">₹{totalWinnings}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl">
          <p className="text-sm opacity-90 mb-2 text-shadow-glow">গেম খেলা হয়েছে</p>
          <p className="text-4xl font-bold text-gradient">{gamesPlayed}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
          <p className="text-sm opacity-90 mb-2 text-shadow-glow">আজকের খেলা বাকি</p>
          <p className="text-4xl font-bold text-gradient">5/5</p>
        </div>
      </div>

      {/* Game Display or Selection */}
      {selectedGameId && selectedGame ? (
        <GameplayScreen
          game={selectedGame}
          onBack={() => setSelectedGameId(null)}
          onWin={(amount) => {
            setTotalWinnings(totalWinnings + amount)
            setGamesPlayed(gamesPlayed + 1)
            setSelectedGameId(null)
          }}
        />
      ) : (
        <>
          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map((game) => {
              const difficultyColor = {
                Easy: 'from-green-400 to-green-600',
                Medium: 'from-yellow-400 to-yellow-600',
                Hard: 'from-red-400 to-red-600',
              }

              return (
                <div
                  key={game.id}
                  className="bg-white/10 border border-white/20 rounded-2xl p-8 hover:border-white/40 hover:bg-white/15 transition cursor-pointer"
                  onClick={() => setSelectedGameId(game.id)}
                >
                  <p className="text-7xl mb-4">{game.icon}</p>
                  <h3 className="text-2xl font-bold text-white mb-2">{game.name}</h3>
                  <p className="text-gray-300 mb-6">{game.description}</p>

                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`bg-gradient-to-r ${difficultyColor[game.difficulty]} px-4 py-1 rounded-full text-white font-semibold text-sm`}
                    >
                      {game.difficulty}
                    </span>
                    <span className="bg-gradient-to-r from-green-400 to-green-600 px-4 py-1 rounded-full text-white font-semibold text-sm">
                      Up to ₹{game.maxReward}
                    </span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-90 text-white font-bold py-3 rounded-lg transition text-shadow-glow">
                    এখন খেলুন 🎮
                  </button>
                </div>
              )
            })}
          </div>

          {/* Tips Section */}
          <div className="bg-blue-500/20 border border-blue-500/50 rounded-2xl p-6">
            <p className="text-blue-200 font-semibold mb-3 text-shadow-glow">💡 আরও জেতার টিপস:</p>
            <ul className="text-blue-100 space-y-2 text-sm">
              <li>• প্রতিদিন গেম খেলে সর্বোচ্চ জয় বাড়ান</li>
              <li>• কঠিন গেমে বড় রিওয়ার্ড থাকে</li>
              <li>• প্র্যাকটিস করে প্রতিবার স্কোর বাড়ান</li>
              <li>• প্রতিদিন ৫টি গেম খেলতে পারেন</li>
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

interface GameplayScreenProps {
  game: Game
  onBack: () => void
  onWin: (amount: number) => void
}

function GameplayScreen({ game, onBack, onWin }: GameplayScreenProps) {
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing')
  const [score, setScore] = useState(0)

  const handleGameComplete = (won: boolean) => {
    if (won) {
      const reward = Math.floor(Math.random() * (game.maxReward - game.maxReward / 2) + game.maxReward / 2)
      setScore(reward)
      setGameState('won')
    } else {
      setGameState('lost')
    }
  }

  if (gameState !== 'playing') {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 text-center text-white max-w-md border border-white/20">
          {gameState === 'won' ? (
            <>
              <p className="text-6xl mb-4">🎉</p>
              <h2 className="text-4xl font-bold mb-4">You Won!</h2>
              <p className="text-6xl font-bold text-green-400 mb-6">₹{score}</p>
              <p className="text-gray-300 mb-8">Congratulations! Your reward has been added to your wallet.</p>
              <button
                onClick={() => onWin(score)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white font-bold py-3 rounded-lg transition mb-3"
              >
                Collect Reward
              </button>
            </>
          ) : (
            <>
              <p className="text-6xl mb-4">😢</p>
              <h2 className="text-4xl font-bold mb-4">Game Over</h2>
              <p className="text-gray-300 mb-8">Better luck next time! Keep practicing to win bigger rewards.</p>
              <button
                onClick={onBack}
                className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-90 text-white font-bold py-3 rounded-lg transition"
              >
                Try Another Game
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 text-white max-w-2xl border border-white/20 w-full mx-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold flex-1 text-center">{game.icon} {game.name}</h2>
          <button
            onClick={onBack}
            className="text-2xl hover:opacity-70 transition"
          >
            ✕
          </button>
        </div>

        <div className="mb-8">
          {game.id === '1' && (
            <NumberGuessGame onComplete={handleGameComplete} maxReward={game.maxReward} />
          )}
          {game.id === '2' && (
            <MemoryMatchGame onComplete={handleGameComplete} maxReward={game.maxReward} />
          )}
          {game.id === '3' && (
            <TapSpeedGame onComplete={handleGameComplete} maxReward={game.maxReward} />
          )}
          {game.id === '4' && (
            <WordPuzzleGame onComplete={handleGameComplete} maxReward={game.maxReward} />
          )}
          {game.id === '5' && (
            <LoveTestGame onComplete={handleGameComplete} maxReward={game.maxReward} />
          )}
        </div>

        <button
          onClick={onBack}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition"
        >
          Exit Game
        </button>
      </div>
    </div>
  )
}

interface GameProps {
  onComplete: (won: boolean) => void
  maxReward: number
}

function NumberGuessGame({ onComplete, maxReward }: GameProps) {
  const [secretNumber] = useState(Math.floor(Math.random() * 100) + 1)
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('১-১০০ এর মধ্যে একটি নাম্বার অনুমান করুন')

  const handleGuess = () => {
    const num = parseInt(guess)
    if (num === secretNumber) {
      setMessage('🎉 সঠিক!')
      setTimeout(() => onComplete(true), 1000)
    } else if (num > secretNumber) {
      setMessage('📉 অনেক বেশি! আবার চেষ্টা করুন')
    } else {
      setMessage('📈 অনেক কম! আবার চেষ্টা করুন')
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-gray-300 text-shadow-glow">{message}</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="আপনার অনুমান লিখুন"
        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 outline-none"
        min="1"
        max="100"
      />
      <button
        onClick={handleGuess}
        className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-90 text-white font-bold py-2 rounded-lg transition text-shadow-glow"
      >
        অনুমান করুন
      </button>
    </div>
  )
}

function MemoryMatchGame({ onComplete }: GameProps) {
  const [cards, setCards] = useState([
    { id: 1, value: '🍎', flipped: false, matched: false },
    { id: 2, value: '🍊', flipped: false, matched: false },
    { id: 3, value: '🍎', flipped: false, matched: false },
    { id: 4, value: '🍊', flipped: false, matched: false },
  ])

  const handleCardClick = (id: number) => {
    setCards(cards.map((c) => (c.id === id ? { ...c, flipped: !c.flipped } : c)))
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-gray-300 text-shadow-glow">জোড়া খুঁজে বের করতে কার্ডে ক্লিক করুন</p>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className="aspect-square bg-gradient-to-br from-indigo-600 to-pink-600 rounded-lg text-2xl font-bold hover:scale-105 transition text-shadow-glow"
          >
            {card.flipped ? card.value : '?'}
          </button>
        ))}
      </div>
      <button
        onClick={() => onComplete(true)}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition text-shadow-glow"
      >
        গেম সম্পন্ন করুন
      </button>
    </div>
  )
}

function TapSpeedGame({ onComplete }: GameProps) {
  const [taps, setTaps] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)

  useState(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      if (timeLeft === 1) onComplete(taps > 20)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <p className="text-gray-300 text-sm text-shadow-glow">ট্যাপ</p>
          <p className="text-4xl font-bold text-green-400 text-gradient">{taps}</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <p className="text-gray-300 text-sm text-shadow-glow">সময় বাকি</p>
          <p className="text-4xl font-bold text-red-400 text-gradient">{timeLeft}সে</p>
        </div>
      </div>
      <button
        onClick={() => setTaps(taps + 1)}
        className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-90 text-white font-bold py-6 rounded-lg transition text-2xl text-shadow-glow"
      >
        ট্যাপ!
      </button>
    </div>
  )
}

function WordPuzzleGame({ onComplete }: GameProps) {
  const words = ['HELLO', 'WORLD', 'GAME', 'EARN']
  const [currentWord] = useState(words[Math.floor(Math.random() * words.length)])
  const [shuffled] = useState(currentWord.split('').sort(() => Math.random() - 0.5).join(''))
  const [answer, setAnswer] = useState('')

  const handleSubmit = () => {
    if (answer.toUpperCase() === currentWord) {
      onComplete(true)
    } else {
      alert('ভুল উত্তর! আবার চেষ্টা করুন।')
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-white/10 rounded-lg p-6 text-center">
        <p className="text-gray-300 text-sm mb-2 text-shadow-glow">এই ওয়ার্ডটি আনস্ক্র্যাম্বল করুন:</p>
        <p className="text-3xl font-bold tracking-widest text-gradient">{shuffled}</p>
      </div>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="ওয়ার্ডটি লিখুন"
        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 outline-none"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-90 text-white font-bold py-2 rounded-lg transition text-shadow-glow"
      >
        সাবমিট
      </button>
    </div>
  )
}

function LoveTestGame({ onComplete }: GameProps) {
  const [boyName, setBoyName] = useState('')
  const [girlName, setGirlName] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const handleTest = () => {
    if (!boyName || !girlName) {
      alert('দুটি নামই লিখুন!')
      return
    }
    const percentage = Math.floor(Math.random() * 101)
    setResult(percentage)
    // Always "win" for the game, but reward based on percentage
    setTimeout(() => onComplete(true), 2000)
  }

  return (
    <div className="space-y-6">
      <p className="text-center text-gray-300 text-shadow-glow">লাভ কম্প্যাটিবিলিটি টেস্ট করতে নাম লিখুন!</p>
      <div className="space-y-4">
        <input
          type="text"
          value={boyName}
          onChange={(e) => setBoyName(e.target.value)}
          placeholder="ছেলের নাম"
          className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-600 outline-none"
        />
        <input
          type="text"
          value={girlName}
          onChange={(e) => setGirlName(e.target.value)}
          placeholder="মেয়ের নাম"
          className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-600 outline-none"
        />
      </div>
      <button
        onClick={handleTest}
        className="w-full bg-gradient-to-r from-pink-600 to-red-600 hover:opacity-90 text-white font-bold py-3 rounded-lg transition text-shadow-glow"
      >
        লাভ টেস্ট ❤️
      </button>
      {result !== null && (
        <div className="text-center space-y-4">
          <p className="text-6xl font-bold text-pink-400 text-gradient">{result}%</p>
          <p className="text-gray-300 text-shadow-glow">
            {result > 80 ? 'পারফেক্ট ম্যাচ! ট্রু লাভ!' : result > 50 ? 'ভালো কম্প্যাটিবিলিটি!' : 'হয়তো শুধু বন্ধু...'}
          </p>
        </div>
      )}
    </div>
  )
}
