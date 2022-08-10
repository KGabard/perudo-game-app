import { createSlice } from '@reduxjs/toolkit'

import playerImage1 from '../../Assets/Images/PlayerImage1.png'
import playerImage2 from '../../Assets/Images/PlayerImage2.png'
import playerImage3 from '../../Assets/Images/PlayerImage3.png'
import playerImage4 from '../../Assets/Images/PlayerImage4.png'
import playerImage5 from '../../Assets/Images/PlayerImage5.png'
import playerImage6 from '../../Assets/Images/PlayerImage6.png'

import hangdrumMusic from '../../Assets/Audio/hangdrum.wav'
import panfluteMusic from '../../Assets/Audio/panflute.wav'

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
    height: 0,
  },
  controlsMenu: {
    isDisplayed: false,
    height: 0,
  },
  rulesMenu: {
    isDisplayed: false,
    height: 0,
  },
  settingsMenu: {
    isDisplayed: false,
    height: 0,
  },
  navigationMenu: {
    isDisplayed: false,
    height: 0,
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
  soundEffects: {
    muted: false,
  },
  dicesAreRolling: false,
}

const reducers = {
  updateIsPause: (state, action) => {
    state.isPause = action.payload
  },
  updateDicesAreRolling: (state, action) => {
    state.dicesAreRolling = action.payload
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
      case 'navigation':
        state.navigationMenu.isDisplayed = false
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
    state.navigationMenu.isDisplayed = false

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
      case 'navigation':
        state.navigationMenu.isDisplayed = true
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
  updateMenuHeight: (state, action) => {
    switch (action.payload.menu) {
      case 'game':
        state.gameMenu.height = action.payload.height
        break
      case 'controls':
        state.controlsMenu.height = action.payload.height
        break
      case 'rules':
        state.rulesMenu.height = action.payload.height
        break
      case 'settings':
        state.settingsMenu.height = action.payload.height
        break
      case 'navigation':
        state.navigationMenu.height = action.payload.height
        break

      default:
        break
    }
  },
  toggleSoundEffectsMute: (state) => {
    console.log('toggleSoundEffectsMute')
    state.soundEffects.muted = !state.soundEffects.muted
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
  updateMenuHeight,
  toggleSoundEffectsMute,
  updateDicesAreRolling,
} = gameSlice.actions

export default gameSlice.reducer
