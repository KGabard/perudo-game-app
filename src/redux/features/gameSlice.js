import { createSlice } from '@reduxjs/toolkit'

import playerImage1 from '../../Assets/Images/PlayerImage1.png'
import playerImage2 from '../../Assets/Images/PlayerImage2.png'
import playerImage3 from '../../Assets/Images/PlayerImage3.png'
import playerImage4 from '../../Assets/Images/PlayerImage4.png'
import playerImage5 from '../../Assets/Images/PlayerImage5.png'
import playerImage6 from '../../Assets/Images/PlayerImage6.png'

import hangdrumMusic from '../../Assets/Musics/hangdrum.wav'
import panfluteMusic from '../../Assets/Musics/panflute.wav'

const initialState = {
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
}

const reducers = {
  updateIsPause: (state) => {
    state.errorMessage.isDisplayed ||
    state.endTurnMessage.isDisplayed ||
    state.gameMenu.isDisplayed ||
    state.controlsMenu.isDisplayed ||
    state.rulesMenu.isDisplayed ||
    state.settingsMenu.isDisplayed
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
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers,
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

export default gameSlice.reducer
