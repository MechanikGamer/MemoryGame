import '@styles/components/History.scss'

import { formatTime, useGameStore } from '@store/useGameStore'
import React from 'react'

const History: React.FC = () => {
  const history = useGameStore(state => state.history)

  return (
    <div className="history">
      <h2>Game History</h2>
      {history.length === 0 ? (
        <p>No games played yet.</p>
      ) : (
        <ul>
          {history.map((record, index) => (
            <li key={index}>
              <p>Date: {record.date}</p>
              <p>Attempts: {record.attempts}</p>
              <p>Duration: {formatTime(record.duration)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default History
