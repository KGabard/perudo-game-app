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
  initialState: {
    activePlayers: [
      {
        id: uuidv4(),
        index: 1,
        name: 'Kevin',
        avatar: playerImage1,
        diceCount: 2,
        dices: [],
        diceChanges: [],
        isComputer: false,
        isActive: false,
        areDicesDisplayed: false,
        bid: { count: undefined, value: undefined },
        hasToReset: true,
        hasToPlay: true,
        isWrong: false,
        isRight: false,
      },
      {
        id: uuidv4(),
        index: 2,
        name: 'Ordi 1',
        avatar: playerImage2,
        diceCount: 2,
        dices: [],
        diceChanges: [],
        isComputer: true,
        isActive: false,
        areDicesDisplayed: false,
        bid: { count: undefined, value: undefined },
        hasToReset: true,
        hasToPlay: false,
        isWrong: false,
        isRight: false,
      },
      {
        id: uuidv4(),
        index: 3,
        name: 'Ordi 2',
        avatar: playerImage3,
        diceCount: 2,
        dices: [],
        diceChanges: [],
        isComputer: true,
        isActive: false,
        areDicesDisplayed: false,
        bid: { count: undefined, value: undefined },
        hasToReset: true,
        hasToPlay: false,
        isWrong: false,
        isRight: false,
      },
    ],
    eliminatedPlayers: [],
  },
  reducers: {
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
    updateActivePlayer: (state, action) => {
      state.activePlayers.map((item) => (item.isActive = false))
      const player = state.activePlayers.find(
        (item) => item.id === action.payload.id
      )
      player.isActive = true
    },
    desactivateAllPlayers: (state) => {
      state.activePlayers.map((item) => (item.isActive = false))
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
    updateHasToReset: (state, action) => {
      const player = state.activePlayers.find(
        (item) => item.id === action.payload.player.id
      )
      player.hasToReset = action.payload.hasToReset
    },
    updateHasToPlay: (state, action) => {
      const player = state.activePlayers.find(
        (item) => item.id === action.payload.player.id
      )
      player.hasToPlay = action.payload.hasToPlay
    },
    eliminatePlayer: (state, action) => {
      const player = state.activePlayers.find(
        (item) => item.id === action.payload.id
      )
      state.activePlayers = state.activePlayers.filter(
        (item) => item.id !== player.id
      )
      state.eliminatedPlayers.unshift(player)
      return state
    },
    updateIndex: (state, action) => {
      const player = state.activePlayers.find(
        (item) => item.id === action.payload.id
      )
      if (player) {
        player.index =
          state.activePlayers.findIndex((item) => item.id === player.id) + 1
      }
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
  },
})

export const {
  updateBidCount,
  updateBidValue,
  updateActivePlayer,
  desactivateAllPlayers,
  updateDicesDisplay,
  updateDiceCount,
  updateDices,
  updateDiceChanges,
  updateHasToReset,
  updateHasToPlay,
  eliminatePlayer,
  updateIndex,
  updateIsWrong,
  updateIsRight,
  resetWrongRightAllPlayers,
} = playersSlice.actions

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    isPause: false,
    isPalifico: false,
    errorMessage: {
      isDisplayed: false,
      title: 'Title',
      body: 'Body',
    },
    endTurnMessage: {
      isDisplayed: false,
      isWrong: false,
      header: 'Dudo !',
      title: 'Title',
      subtitle: 'Body',
      body: 'Expanded body',
      isExpanded: false,
    },
    playersMaxDiceCount: 5,
    turnCounter: 1,
  },
  reducers: {
    updatePause: (state) => {
      state.errorMessage.isDisplayed || state.endTurnMessage.isDisplayed
        ? (state.isPause = true)
        : (state.isPause = false)
    },
    updatePalifico: (state, action) => {
      state.isPalifico = action.payload
    },
    incrementTurnCounter: (state) => {
      state.turnCounter = state.turnCounter + 1
    },
    displayErrorMessage: (state, action) => {
      const message = action.payload
      state.errorMessage.isDisplayed = true
      state.errorMessage.title = message.title
      state.errorMessage.body = message.body
    },
    hideErrorMessage: (state) => {
      state.errorMessage.isDisplayed = false
    },
    displayEndTurnMessage: (state, action) => {
      const message = action.payload
      state.endTurnMessage.isDisplayed = true
      state.endTurnMessage.isWrong = message.isWrong
      state.endTurnMessage.header = message.header
      state.endTurnMessage.title = message.title
      state.endTurnMessage.subtitle = message.subtitle
      state.endTurnMessage.isExpanded = false
      state.endTurnMessage.body = message.body
    },
    hideEndTurnMessage: (state) => {
      state.endTurnMessage.isDisplayed = false
    },
    expandEndTurnMessage: (state) => {
      state.endTurnMessage.isExpanded = true
    },
  },
})

export const {
  updatePause,
  updatePalifico,
  incrementTurnCounter,
  displayErrorMessage,
  hideErrorMessage,
  displayEndTurnMessage,
  hideEndTurnMessage,
  expandEndTurnMessage,
} = gameSlice.actions

export const store = configureStore({
  reducer: {
    players: playersSlice.reducer,
    game: gameSlice.reducer,
  },
})
