import '@styles/components/DifficultySelector.scss'

import { useGameStore } from '@store/useGameStore'
import React, { useEffect } from 'react'

const DifficultySelector: React.FC = () => {
  const { setDifficulty, difficulty } = useGameStore(state => ({
    setDifficulty: state.setDifficulty,
    difficulty: state.difficulty,
  }))

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const level = parseInt(event.target.value, 10)
    setDifficulty(level)
  }

  useEffect(() => {
    setDifficulty(difficulty)
  }, [setDifficulty, difficulty])

  return (
    <div className="difficulty-selector">
      <label htmlFor="difficulty">Select Difficulty:</label>
      <select id="difficulty" onChange={handleSelect} value={difficulty}>
        <option value={8}>Easy (8 pairs)</option>
        <option value={12}>Medium (12 pairs)</option>
        <option value={16}>Hard (16 pairs)</option>
      </select>
    </div>
  )
}

export default DifficultySelector
