'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

interface Task {
  id: string
  title: string
  description: string
  reward: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  completed: boolean
  category: string
  link?: string
}

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Survey about mobile apps',
    description: 'Complete a quick survey about your mobile usage',
    reward: 50,
    difficulty: 'Easy',
    completed: false,
    category: 'Survey',
    link: 'https://www.profitablecpmratenetwork.com/a13ptxw0uk?key=5b3b949d022735b0fd2964f3bbfafd8e',
  },
  {
    id: '2',
    title: 'Watch product video',
    description: 'Watch and review a new product launch video',
    reward: 75,
    difficulty: 'Easy',
    completed: false,
    category: 'Video',
    link: 'https://www.profitablecpmratenetwork.com/i485cp1w?key=111cc02cd8abfd0c10a75511f73ead61',
  },
  {
    id: '3',
    title: 'Write product review',
    description: 'Write a detailed review about any product',
    reward: 150,
    difficulty: 'Medium',
    completed: false,
    category: 'Content',
    link: 'https://omg10.com/4/9919097',
  },
  {
    id: '4',
    title: 'Participate in discussion',
    description: 'Join and participate in community discussion',
    reward: 100,
    difficulty: 'Medium',
    completed: false,
    category: 'Community',
    link: 'https://omg10.com/4/9910698',
  },
  {
    id: '5',
    title: 'Complete certification course',
    description: 'Complete an online certification course',
    reward: 300,
    difficulty: 'Hard',
    completed: false,
    category: 'Education',
    link: 'https://omg10.com/4/9910698',
  },
  {
    id: '6',
    title: 'Daily check-in',
    description: 'Visit our partner site and complete simple task',
    reward: 75,
    difficulty: 'Easy',
    completed: false,
    category: 'Other',
    link: 'https://omg10.com/4/9919093',
  },
  {
    id: '7',
    title: 'Install app and explore',
    description: 'Install recommended app and spend 5 minutes',
    reward: 120,
    difficulty: 'Easy',
    completed: false,
    category: 'Mobile',
    link: 'https://omg10.com/4/9887192',
  },
  {
    id: '8',
    title: 'Play mini game',
    description: 'Play and win in the partner mini game',
    reward: 90,
    difficulty: 'Easy',
    completed: false,
    category: 'Gaming',
    link: 'https://omg10.com/4/9919106',
  },
  {
    id: '9',
    title: 'Sign up bonus task',
    description: 'Complete signup at our partner website',
    reward: 200,
    difficulty: 'Medium',
    completed: false,
    category: 'Registration',
    link: 'https://omg10.com/4/9919096',
  },
  {
    id: '10',
    title: 'Complete verification',
    description: 'Verify your account on partner platform',
    reward: 180,
    difficulty: 'Medium',
    completed: false,
    category: 'Verification',
    link: 'https://omg10.com/4/9919095',
  },
]

export default function TasksPage() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>(sampleTasks)
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All')

  const completeTask = (task: Task) => {
    if (task.link) {
      window.open(task.link, '_blank')
    }
    setTasks(
      tasks.map((t) =>
        t.id === task.id ? { ...t, completed: true } : t
      )
    )
  }

  const filteredTasks =
    filterDifficulty === 'All'
      ? tasks
      : tasks.filter((task) => task.difficulty === filterDifficulty)

  const completedCount = tasks.filter((t) => t.completed).length
  const totalReward = tasks
    .filter((t) => t.completed)
    .reduce((sum, t) => sum + t.reward, 0)

  const difficultyColor = {
    Easy: 'from-green-400 to-green-600',
    Medium: 'from-yellow-400 to-yellow-600',
    Hard: 'from-red-400 to-red-600',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-4">📋 Available Tasks</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm opacity-90">Completed</p>
            <p className="text-3xl font-bold">{completedCount}/{tasks.length}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Earned</p>
            <p className="text-3xl font-bold">₹{totalReward}</p>
          </div>
          <div className="hidden md:block">
            <p className="text-sm opacity-90">Pending</p>
            <p className="text-3xl font-bold">{tasks.length - completedCount}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['All', 'Easy', 'Medium', 'Hard'].map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => setFilterDifficulty(difficulty)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filterDifficulty === difficulty
                ? 'bg-indigo-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {difficulty}
          </button>
        ))}
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`rounded-2xl p-6 shadow-lg border-2 transition ${
              task.completed
                ? 'bg-green-900/30 border-green-500/50'
                : 'bg-white/10 border-white/20 hover:border-white/40'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{task.title}</h3>
                <p className="text-gray-300">{task.description}</p>
              </div>
              {task.completed && <div className="text-3xl">✅</div>}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span
                className={`bg-gradient-to-r ${difficultyColor[task.difficulty]} px-4 py-1 rounded-full text-white font-semibold text-sm`}
              >
                {task.difficulty}
              </span>
              <span className={`bg-gradient-to-r from-green-400 to-green-600 px-4 py-1 rounded-full text-white font-semibold text-sm`}>
                ₹{task.reward}
              </span>
              <span className="text-xs text-gray-400 bg-white/10 px-3 py-1 rounded-full">
                {task.category}
              </span>
            </div>

            <button
              onClick={() => completeTask(task)}
              disabled={task.completed}
              className={`w-full py-3 rounded-lg font-bold transition ${
                task.completed
                  ? 'bg-green-600 text-white cursor-default'
                  : 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white hover:opacity-90'
              }`}
            >
              {task.completed ? '✓ Completed' : task.link ? '🔗 Open Task' : 'Start Task'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
