import { configureStore } from '@reduxjs/toolkit'
import playersReducer from './features/playersSlice'
import gameReducer from './features/gameSlice'

export const store = configureStore({
  reducer: {
    players: playersReducer,
    game: gameReducer,
  },
})
