import { images } from '@assets/images'
import { create, GetState, SetState } from 'zustand'

export interface Tile {
  id: number
  content: string
  isRevealed: boolean
  isMatched: boolean
}

export interface HistoryRecord {
  attempts: number
  duration: number
  date: string
}

export interface GameState {
  tiles: Tile[]
  revealedTiles: number[]
  matchedPairs: number
  attempts: number
  timer: number
  difficulty: number
  history: HistoryRecord[]
  gameStarted: boolean
  paused: boolean
  setDifficulty: (level: number) => void
  revealTile: (id: number) => void
  resetGame: () => void
  incrementTimer: () => void
  saveHistory: () => void
  loadHistory: () => void
  setGameStarted: (started: boolean) => void
  setPaused: (paused: boolean) => void
}

export const useGameStore = create<GameState>((set: SetState<GameState>, get: GetState<GameState>) => ({
  tiles: [],
  revealedTiles: [],
  matchedPairs: 0,
  attempts: 0,
  timer: 0,
  difficulty: 8,
  history: [],
  gameStarted: false,
  paused: false,
  setDifficulty: (level: number) => {
    set({ difficulty: level })
    get().resetGame()
  },
  revealTile: (id: number) => {
    const { revealedTiles, tiles, attempts, paused } = get()
    if (paused || revealedTiles.length === 2) return

    const newRevealedTiles = [...revealedTiles, id]
    set({ revealedTiles: newRevealedTiles })

    if (newRevealedTiles.length === 2) {
      set({ attempts: attempts + 1 })
      const [firstId, secondId] = newRevealedTiles
      const firstTile = tiles.find((tile: Tile) => tile.id === firstId)
      const secondTile = tiles.find((tile: Tile) => tile.id === secondId)

      if (firstTile && secondTile && firstTile.content === secondTile.content) {
        set((state: GameState) => ({
          tiles: state.tiles.map(tile =>
            tile.id === firstId || tile.id === secondId ? { ...tile, isMatched: true } : tile,
          ),
          matchedPairs: state.matchedPairs + 1,
        }))
      }

      setTimeout(() => {
        set({ revealedTiles: [] })
      }, 1000)
    }
  },
  resetGame: () => {
    const { difficulty } = get()
    const contents = images.slice(0, difficulty)
    const tileContents = [...contents, ...contents]
    const shuffledTiles = tileContents
      .map(content => ({
        content,
        id: Math.random(),
        isRevealed: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5)
    set({
      tiles: shuffledTiles,
      revealedTiles: [],
      matchedPairs: 0,
      attempts: 0,
      timer: 0,
    })
  },

  incrementTimer: () => {
    if (!get().paused) {
      set(state => ({ timer: state.timer + 1 }))
    }
  },
  saveHistory: () => {
    const { attempts, timer, history } = get()
    const newRecord: HistoryRecord = {
      attempts,
      duration: timer,
      date: new Date().toLocaleString(),
    }
    const newHistory = [...history, newRecord]
    localStorage.setItem('gameHistory', JSON.stringify(newHistory))
    set({ history: newHistory })
  },
  loadHistory: () => {
    const savedHistory = localStorage.getItem('gameHistory')
    if (savedHistory) {
      set({ history: JSON.parse(savedHistory) })
    }
  },
  setGameStarted: (started: boolean) => set({ gameStarted: started }),
  setPaused: (paused: boolean) => set({ paused }),
}))

useGameStore.getState().loadHistory()

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return mins > 0 ? `${mins} minutes ${secs} seconds` : `${secs} seconds`
}
