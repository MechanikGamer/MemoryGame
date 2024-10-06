import React, { useEffect } from 'react'
import { useGameStore, GameState } from '@store/useGameStore'
import '@styles/components/Stats.scss'

const Stats: React.FC = () => {
  const { attempts, timer, incrementTimer } = useGameStore((state: GameState) => ({
    attempts: state.attempts,
    timer: state.timer,
    incrementTimer: state.incrementTimer,
  }))

  useEffect(() => {
    const interval = setInterval(() => {
      incrementTimer()
    }, 1000)
    return () => clearInterval(interval)
  }, [incrementTimer])

  return (
    <div className="stats">
      <p>Attempts: {attempts}</p>
      <p>Time Elapsed: {timer} seconds</p>
    </div>
  )
}

export default Stats
