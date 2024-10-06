import React from 'react'
import { Tile as TileType } from '@store/useGameStore'
import { useGameStore } from '@store/useGameStore'
import '@styles/components/Tile.scss'

interface TileProps {
  tile: TileType
}

const Tile: React.FC<TileProps> = ({ tile }) => {
  const revealTile = useGameStore(state => state.revealTile)
  const revealedTiles = useGameStore(state => state.revealedTiles)

  const isRevealed = tile.isMatched || revealedTiles.includes(tile.id)

  const handleClick = () => {
    if (!tile.isMatched && !isRevealed) {
      revealTile(tile.id)
    }
  }

  return (
    <div className={`tile ${isRevealed ? 'revealed' : ''}`} onClick={handleClick} data-content={tile.content}>
      {isRevealed ? <div className="tile-content">{tile.content}</div> : <div className="tile-placeholder"></div>}
    </div>
  )
}

export default Tile
