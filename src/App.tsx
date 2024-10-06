import React from 'react'
import DifficultySelector from '@components/DifficultySelector'
import Stats from '@components/Stats'
import GameBoard from '@components/GameBoard'
import History from '@components/History'

const App: React.FC = () => {
  return (
    <div className="app">
      <DifficultySelector />
      <Stats />
      <GameBoard />
      <History />
    </div>
  )
}

export default App
