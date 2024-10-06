import create from 'zustand';
import { GetState, SetState } from 'zustand';

export interface Tile {
  id: number;
  content: string;
  isRevealed: boolean;
  isMatched: boolean;
}

export interface HistoryRecord {
  attempts: number;
  duration: number;
  date: string;
}

export interface GameState {
  tiles: Tile[];
  revealedTiles: number[];
  matchedPairs: number;
  attempts: number;
  timer: number;
  difficulty: number;
  history: HistoryRecord[];
  setDifficulty: (level: number) => void;
  revealTile: (id: number) => void;
  resetGame: () => void;
  incrementTimer: () => void;
  saveHistory: () => void;
  loadHistory: () => void;
}

export const useGameStore = create<GameState>(
  (set: SetState<GameState>, get: GetState<GameState>) => ({
  tiles: [],
  revealedTiles: [],
  matchedPairs: 0,
  attempts: 0,
  timer: 0,
  difficulty: 8,
  history: [],
  setDifficulty: (level: number) => {
    set({ difficulty: level });
    get().resetGame();
  },
  revealTile: (id: number) => {
    const { revealedTiles, tiles, attempts } = get();
    if (revealedTiles.length === 2) return;

    const newRevealedTiles = [...revealedTiles, id];
    set({ revealedTiles: newRevealedTiles });

    if (newRevealedTiles.length === 2) {
      set({ attempts: attempts + 1 });
      const [firstId, secondId] = newRevealedTiles;
      const firstTile = tiles.find((tile) => tile.id === firstId);
      const secondTile = tiles.find((tile) => tile.id === secondId);

      if (firstTile && secondTile && firstTile.content === secondTile.content) {
        set((state: GameState) => ({
          tiles: state.tiles.map((tile) =>
            tile.id === firstId || tile.id === secondId
              ? { ...tile, isMatched: true }
              : tile
          ),
          matchedPairs: state.matchedPairs + 1,
        }));
      }

      setTimeout(() => {
        set({ revealedTiles: [] });
      }, 1000);
    }
  },
  resetGame: () => {
    const { difficulty } = get();
    const contents = Array.from({ length: difficulty }, (_, i) => `Content ${i + 1}`);
    const tileContents = [...contents, ...contents];
    const shuffledTiles = tileContents
      .map((content) => ({ content, id: Math.random(), isRevealed: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    set({
      tiles: shuffledTiles,
      revealedTiles: [],
      matchedPairs: 0,
      attempts: 0,
      timer: 0,
    });
  },
  incrementTimer: () => set((state) => ({ timer: state.timer + 1 })),
  saveHistory: () => {
    const { attempts, timer, history } = get();
    const newHistory = [
      ...history,
      {
        attempts,
        duration: timer,
        date: new Date().toLocaleString(),
      },
    ];
    localStorage.setItem('gameHistory', JSON.stringify(newHistory));
    set({ history: newHistory });
  },
  loadHistory: () => {
    const savedHistory = localStorage.getItem('gameHistory');
    if (savedHistory) {
      set({ history: JSON.parse(savedHistory) });
    }
  },
}));

useGameStore.getState().resetGame();
useGameStore.getState().loadHistory();

