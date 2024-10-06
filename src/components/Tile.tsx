import '@styles/components/Tile.scss'

import { Tile as TileType } from '@store/useGameStore'
import { useGameStore } from '@store/useGameStore'
import React from 'react'

interface TileProps {
  tile: TileType
}

const Tile: React.FC<TileProps> = ({ tile }) => {
  const revealTile = useGameStore(state => state.revealTile)
  const revealedTiles = useGameStore(state => state.revealedTiles)
  const paused = useGameStore(state => state.paused)

  const isRevealed = tile.isMatched || revealedTiles.includes(tile.id)

  const handleClick = () => {
    if (!tile.isMatched && !isRevealed && !paused) {
      revealTile(tile.id)
    }
  }

  return (
    <div className={`tile ${isRevealed ? 'revealed' : ''} ${tile.isMatched ? 'matched' : ''}`} onClick={handleClick}>
      <div className="tile-inner">
        <div className="tile-placeholder"></div>
        <div className="tile-content">{isRevealed && <img src={tile.content} alt="Tile Content" />}</div>
      </div>
    </div>
  )
}

export default Tile
