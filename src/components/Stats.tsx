import '@styles/components/Stats.scss'

import { formatTime, GameState, useGameStore } from '@store/useGameStore'
import React, { useEffect } from 'react'

const Stats: React.FC = () => {
  const { attempts, timer, incrementTimer, paused } = useGameStore((state: GameState) => ({
    attempts: state.attempts,
    timer: state.timer,
    incrementTimer: state.incrementTimer,
    paused: state.paused,
  }))

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        incrementTimer()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [incrementTimer, paused])

  return (
    <div className="stats">
      <p>Attempts: {attempts}</p>
      <p>Time Elapsed: {formatTime(timer)}</p>
    </div>
  )
}

export default Stats
