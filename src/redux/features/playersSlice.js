import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  activePlayers: [],
  eliminatedPlayers: [],
}

const reducers = {
  updateBidCount: (state, action) => {
    const player = state.activePlayers.find(
      (item) => item.id === action.payload.player.id
    )
    player.bid.count = action.payload.bidCount
  },
  updateBidValue: (state, action) => {
    const player = state.activePlayers.find(
      (item) => item.id === action.payload.player.id
    )
    player.bid.value = action.payload.bidValue
  },
  updateIsActive: (state, action) => {
    const player = state.activePlayers.find(
      (item) => item.id === action.payload.player.id
    )
    player.isActive = action.payload.isActive
  },
  updateDicesDisplay: (state, action) => {
    const player = state.activePlayers.find(
      (item) => item.id === action.payload.player.id
    )
    if (player !== undefined)
      player.areDicesDisplayed = action.payload.areDicesDisplayed
  },
  updateDiceCount: (state, action) => {
    const player = state.activePlayers.find(
      (item) => item.id === action.payload.player.id
    )
    player.diceCount = action.payload.diceCount
  },
  updateDices: (state, action) => {
    const player = state.activePlayers.find(
      (item) => item.id === action.payload.player.id
    )
    player.dices = action.payload.dices
  },
  updateDiceChanges: (state, action) => {
    const player = state.activePlayers.find(
      (item) => item.id === action.payload.player.id
    )
    player.diceChanges = action.payload.diceChanges
  },
  updateHasToPlay: (state, action) => {
    const player = state.activePlayers.find(
      (item) => item.id === action.payload.player.id
    )
    player.hasToPlay = action.payload.hasToPlay
  },
  updateIsWrong: (state, action) => {
    const player = state.activePlayers.find(
      (item) => item.id === action.payload.player.id
    )
    player.isWrong = action.payload.isWrong
  },
  updateIsRight: (state, action) => {
    const player = state.activePlayers.find(
      (item) => item.id === action.payload.player.id
    )
    player.isRight = action.payload.isRight
  },
  resetWrongRightAllPlayers: (state) => {
    state.activePlayers.forEach((item) => {
      item.isWrong = false
      item.isRight = false
    })
  },
  eliminatePlayer: (state, action) => {
    state.activePlayers = state.activePlayers.filter(
      (item) => item.id !== action.payload.id
    )
    state.eliminatedPlayers.unshift(action.payload)
  },
  resetEliminatedPlayers: (state) => {
    state.eliminatedPlayers = []
  },
  setNewPlayers: (state, action) => {
    const newPlayers = []

    action.payload.forEach((item) => {
      newPlayers.push({
        id: uuidv4(),
        name: item.name,
        avatar: item.avatar,
        diceCount: 5,
        dices: [],
        diceChanges: [],
        isComputer: item.isComputer,
        isActive: false,
        areDicesDisplayed: false,
        bid: { count: undefined, value: undefined },
        hasToPlay: false,
        isWrong: false,
        isRight: false,
      })
    })

    newPlayers[0].hasToPlay = true

    state.activePlayers = newPlayers
  },
}

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers,
})

export const {
  updateBidCount,
  updateBidValue,
  updateIsActive,
  updateDicesDisplay,
  updateDiceCount,
  updateDices,
  updateDiceChanges,
  updateHasToPlay,
  updateIsWrong,
  updateIsRight,
  resetWrongRightAllPlayers,
  eliminatePlayer,
  setNewPlayers,
  resetEliminatedPlayers,
} = playersSlice.actions

export default playersSlice.reducer
