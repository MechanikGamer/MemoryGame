import React from 'react'
import { useGameStore } from '@store/useGameStore'
import Tile from '@components/Tile'
import '@styles/components/GameBoard.scss'

const GameBoard: React.FC = () => {
  const { tiles, matchedPairs, difficulty, saveHistory, resetGame } = useGameStore(state => ({
    tiles: state.tiles,
    matchedPairs: state.matchedPairs,
    difficulty: state.difficulty,
    saveHistory: state.saveHistory,
    resetGame: state.resetGame,
  }))

  React.useEffect(() => {
    if (matchedPairs === difficulty) {
      saveHistory()
      alert('You won!')
      resetGame()
    }
  }, [matchedPairs, difficulty, saveHistory, resetGame])

  return (
    <div className="game-board">
      {tiles.map(tile => (
        <Tile key={tile.id} tile={tile} />
      ))}
    </div>
  )
}

export default GameBoard
