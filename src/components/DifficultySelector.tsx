import React from 'react'
import { useGameStore } from '@store/useGameStore'
import '@styles/components/DifficultySelector.scss'

const DifficultySelector: React.FC = () => {
  const setDifficulty = useGameStore(state => state.setDifficulty)

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const level = parseInt(event.target.value, 10)
    setDifficulty(level)
  }

  return (
    <div className="difficulty-selector">
      <label htmlFor="difficulty">Select Difficulty:</label>
      <select id="difficulty" onChange={handleSelect}>
        <option value={8}>Easy (8 pairs)</option>
        <option value={12}>Medium (12 pairs)</option>
        <option value={16}>Hard (16 pairs)</option>
      </select>
    </div>
  )
}

export default DifficultySelector
