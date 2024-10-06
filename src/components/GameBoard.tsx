import '@styles/components/GameBoard.scss'

import Modal from '@components/Modal'
import Tile from '@components/Tile'
import { useGameStore } from '@store/useGameStore'
import React, { useEffect, useState } from 'react'

const GameBoard: React.FC = () => {
  const { tiles, matchedPairs, difficulty, saveHistory, resetGame, paused } = useGameStore(state => ({
    tiles: state.tiles,
    matchedPairs: state.matchedPairs,
    difficulty: state.difficulty,
    saveHistory: state.saveHistory,
    resetGame: state.resetGame,
    paused: state.paused,
  }))

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (matchedPairs === difficulty) {
      saveHistory()
      setShowModal(true)
    }
  }, [matchedPairs, difficulty, saveHistory])

  const handleCloseModal = () => {
    setShowModal(false)
    resetGame()
  }

  const getColumns = () => {
    if (difficulty === 8) return 4
    if (difficulty === 12) return 6
    if (difficulty === 16) return 8
    return 4
  }

  const columns = getColumns()

  return (
    <>
      <div
        className={`game-board ${paused ? 'paused' : ''}`}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {tiles.map(tile => (
          <Tile key={tile.id} tile={tile} />
        ))}
      </div>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <h2>Congratulations!</h2>
          <p>You have completed the game.</p>
          <button className="button" onClick={handleCloseModal}>
            Play Again
          </button>
        </Modal>
      )}
    </>
  )
}

export default GameBoard
