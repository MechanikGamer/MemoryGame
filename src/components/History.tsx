import React from 'react'
import { useGameStore } from '@store/useGameStore'
import '@styles/components/History.scss'

const History: React.FC = () => {
  const history = useGameStore(state => state.history)

  return (
    <div className="history">
      <h2>Game History</h2>
      <ul>
        {history.map((record, index) => (
          <li key={index}>
            <p>Date: {record.date}</p>
            <p>Attempts: {record.attempts}</p>
            <p>Duration: {record.duration} seconds</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default History
