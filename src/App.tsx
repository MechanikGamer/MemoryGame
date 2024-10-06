import '@styles/components/App.scss'

import DifficultySelector from '@components/DifficultySelector'
import GameBoard from '@components/GameBoard'
import History from '@components/History'
import Stats from '@components/Stats'
import { useGameStore } from '@store/useGameStore'
import React from 'react'

const App: React.FC = () => {
  const { gameStarted, setGameStarted, resetGame, paused, setPaused } = useGameStore()

  const handleStartGame = () => {
    setGameStarted(true)
    resetGame()
  }

  const handleRestartGame = () => {
    resetGame()
  }

  return (
    <div className="app">
      {!gameStarted ? (
        <div className="start-screen">
          <h1>Welcome to the Memory Match Game</h1>
          <DifficultySelector />
          <button className="button start-button" onClick={handleStartGame}>
            Start Game
          </button>
        </div>
      ) : (
        <>
          <header className="header">
            <h1>Memory Match Game</h1>
            <div className="menu">
              <button className="button" onClick={handleRestartGame}>
                Restart
              </button>
              <button className="button" onClick={() => setPaused(!paused)}>
                {paused ? 'Resume' : 'Pause'}
              </button>
            </div>
            <Stats />
          </header>
          <main className="main-content">
            <GameBoard />
          </main>
          <aside className="sidebar">
            <History />
          </aside>
        </>
      )}
    </div>
  )
}

export default App
