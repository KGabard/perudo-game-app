import { createSlice } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import playerImage1 from '../Assets/Images/PlayerImage1.png'
import playerImage2 from '../Assets/Images/PlayerImage2.png'
import playerImage3 from '../Assets/Images/PlayerImage3.png'
// import playerImage4 from '../Assets/Images/PlayerImage4.png'
// import playerImage5 from '../Assets/Images/PlayerImage5.png'
// import playerImage6 from '../Assets/Images/PlayerImage6.png'

const playersSlice = createSlice({
  name: 'players',
  initialState: [
    {
      id: uuidv4(),
      index: 1,
      name: 'Kevin',
      avatar: playerImage1,
      diceCount: 5,
      dices: [],
      isComputer: false,
      isActive: false,
      areDicesDisplayed: false,
      bid: { count: undefined, value: undefined },
      hasToReset: true,
    },
    {
      id: uuidv4(),
      index: 2,
      name: 'Cecile',
      avatar: playerImage2,
      diceCount: 5,
      dices: [],
      isComputer: false,
      isActive: true,
      areDicesDisplayed: false,
      bid: { count: undefined, value: undefined },
      hasToReset: true,
    },
    {
      id: uuidv4(),
      index: 3,
      name: 'Ordi',
      avatar: playerImage3,
      diceCount: 5,
      dices: [],
      isComputer: false,
      isActive: false,
      areDicesDisplayed: false,
      bid: { count: undefined, value: undefined },
      hasToReset: true,
    },
  ],
  reducers: {
    updateBidCount: (state, action) => {
      const player = state.find((item) => item.id === action.payload.player.id)
      player.bid.count = action.payload.bidCount
    },
    updateBidValue: (state, action) => {
      const player = state.find((item) => item.id === action.payload.player.id)
      player.bid.value = action.payload.bidValue
    },
    updateActivePlayer: (state, action) => {
      state.map((item) => (item.isActive = false))
      const player = state.find((item) => item.id === action.payload.id)
      player.isActive = true
    },
    updateDicesDisplay: (state, action) => {
      const player = state.find((item) => item.id === action.payload.player.id)
      player.areDicesDisplayed = action.payload.areDicesDisplayed
    },
    updateDiceCount: (state, action) => {
      const player = state.find((item) => item.id === action.payload.player.id)
      player.diceCount = action.payload.diceCount
    },
    updateDices: (state, action) => {
      const player = state.find((item) => item.id === action.payload.player.id)
      player.dices = action.payload.dices
    },
    updateHasToReset: (state, action) => {
      const player = state.find((item) => item.id === action.payload.player.id)
      player.hasToReset = action.payload.hasToReset
    },
  },
})

export const {
  updateBidCount,
  updateBidValue,
  updateActivePlayer,
  updateDicesDisplay,
  updateDiceCount,
  updateDices,
  updateHasToReset,
} = playersSlice.actions

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    isPause: false,
    isPalifico: false,
    playersMaxDiceCount: 5,
    turnCounter: 0,
  },
  reducers: {
    updatePause: (state, action) => {
      state.isPause = action.payload
    },
    updatePalifico: (state, action) => {
      state.isPalifico = action.payload
    },
    updateTurnCounter: (state, action) => {
      state.turnCounter = action.payload
    },
  },
})

export const { updatePause, updatePalifico, updateTurnCounter } =
  gameSlice.actions

export const store = configureStore({
  reducer: {
    players: playersSlice.reducer,
    game: gameSlice.reducer,
  },
})
