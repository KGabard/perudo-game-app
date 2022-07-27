import { createSlice } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import playerImage1 from '../Assets/Images/PlayerImage1.png'
import playerImage2 from '../Assets/Images/PlayerImage2.png'
import playerImage3 from '../Assets/Images/PlayerImage3.png'
import playerImage4 from '../Assets/Images/PlayerImage4.png'
import playerImage5 from '../Assets/Images/PlayerImage5.png'
import playerImage6 from '../Assets/Images/PlayerImage6.png'

import hangdrumMusic from '../Assets/Musics/hangdrum.wav'
import panfluteMusic from '../Assets/Musics/panflute.wav'

//! Séparer les slices dans plusieurs fichiers différents et le store également

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    activePlayers: [],
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
      return state
    },
    resetEliminatedPlayers: (state) => {
      state.eliminatedPlayers = []
      return state
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

      return state
    },
  },
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

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    isPause: false,
    isPalifico: false,
    isOver: false,
    errorMessage: {
      isDisplayed: false,
      title: 'Title',
      body: 'Body',
    },
    endTurnMessage: {
      isDisplayed: false,
      isWrong: false,
      isRight: false,
      header: 'Dudo !',
      title: 'Title',
      subtitle: 'Body',
      body: 'Expanded body',
      isExpanded: false,
    },
    playerImages: [
      playerImage1,
      playerImage2,
      playerImage3,
      playerImage4,
      playerImage5,
      playerImage6,
    ],
    gameMenu: {
      isDisplayed: false,
    },
    controlsMenu: {
      isDisplayed: false,
    },
    rulesMenu: {
      isDisplayed: false,
    },
    settingsMenu: {
      isDisplayed: false,
    },
    maxDicesPerPlayer: 5,
    maxPlayersNumber: 5,
    minPlayersNumber: 2,
    turnCounter: 1,
    computerBluff: true,
    computerSpeed: {
      speed: 3,
      min: 1,
      max: 5,
    },
    music: {
      list: [
        { name: 'hangdrum', url: hangdrumMusic },
        { name: 'panflute', url: panfluteMusic },
      ],
      current: 0,
      isPlaying: false,
    },
  },
  reducers: {
    updateIsPause: (state) => {
      state.errorMessage.isDisplayed || state.endTurnMessage.isDisplayed
        ? (state.isPause = true)
        : (state.isPause = false)
    },
    updateIsPalifico: (state, action) => {
      state.isPalifico = action.payload
    },
    updateIsOver: (state, action) => {
      state.isOver = action.payload
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
      state.endTurnMessage.isRight = message.isRight
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
    hideMenu: (state, action) => {
      switch (action.payload) {
        case 'game':
          state.gameMenu.isDisplayed = false
          break
        case 'controls':
          state.controlsMenu.isDisplayed = false
          break
        case 'rules':
          state.rulesMenu.isDisplayed = false
          break
        case 'settings':
          state.settingsMenu.isDisplayed = false
          break

        default:
          break
      }
    },
    activateMenu: (state, action) => {
      state.gameMenu.isDisplayed = false
      state.controlsMenu.isDisplayed = false
      state.rulesMenu.isDisplayed = false
      state.settingsMenu.isDisplayed = false

      switch (action.payload) {
        case 'game':
          state.gameMenu.isDisplayed = true
          break
        case 'controls':
          state.controlsMenu.isDisplayed = true
          break
        case 'rules':
          state.rulesMenu.isDisplayed = true
          break
        case 'settings':
          state.settingsMenu.isDisplayed = true
          break

        default:
          break
      }
    },
    increaseComputerSpeed: (state, action) => {
      if (state.computerSpeed.speed < state.computerSpeed.max)
        state.computerSpeed.speed = state.computerSpeed.speed + 1
    },
    decreaseComputerSpeed: (state) => {
      if (state.computerSpeed.speed > state.computerSpeed.min)
        state.computerSpeed.speed = state.computerSpeed.speed - 1
    },
    toggleComputerBluff: (state) => {
      state.computerBluff = !state.computerBluff
    },
    toggleIsMusicPlaying: (state) => {
      state.music.isPlaying = !state.music.isPlaying
    },
    nextMusic: (state) => {
      if (state.music.current < state.music.list.length - 1)
        state.music.current = state.music.current + 1
      else state.music.current = 0
    },
    previousMusic: (state) => {
      if (state.music.current > 0) state.music.current = state.music.current - 1
      else state.music.current = state.music.list.length - 1
    },
  },
})

export const {
  updateIsPause,
  updateIsPalifico,
  updateIsOver,
  incrementTurnCounter,
  displayErrorMessage,
  hideErrorMessage,
  hideMenu,
  displayEndTurnMessage,
  hideEndTurnMessage,
  expandEndTurnMessage,
  activateMenu,
  increaseComputerSpeed,
  decreaseComputerSpeed,
  toggleComputerBluff,
  toggleIsMusicPlaying,
  nextMusic,
  previousMusic,
} = gameSlice.actions

export const store = configureStore({
  reducer: {
    players: playersSlice.reducer,
    game: gameSlice.reducer,
  },
})
