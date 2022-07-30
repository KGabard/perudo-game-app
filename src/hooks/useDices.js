import { useDispatch } from 'react-redux'
import {
  updateDiceChanges,
  updateDiceCount,
  updateDices,
  updateDicesDisplay,
} from '../redux/features/playersSlice'
import useGameData from './useGameData'
import usePlayersData from './usePlayersData'

export default function useDices() {
  const { activePlayers } = usePlayersData()
  const { game, maxDicesPerPlayer } = useGameData()

  const dispatch = useDispatch()

  const disabledDices = (player) => {
    const dices = []
    for (let i = player.dices.length; i < maxDicesPerPlayer; i++) {
      dices.push(undefined)
    }
    return dices
  }

  const showDices = (player) => {
    dispatch(updateDicesDisplay({ player: player, areDicesDisplayed: true }))
  }

  const hideDices = (player) => {
    dispatch(updateDicesDisplay({ player: player, areDicesDisplayed: false }))
  }

  const showPlayersDices = () => {
    activePlayers.map((item) =>
      dispatch(updateDicesDisplay({ player: item, areDicesDisplayed: true }))
    )
  }

  const hidePlayersDices = () => {
    activePlayers.map((item) =>
      dispatch(updateDicesDisplay({ player: item, areDicesDisplayed: false }))
    )
  }

  const randomizePlayerDices = (player) => {
    const newDices = []
    for (let i = 0; i < player.diceCount; i++) {
      newDices.push(Math.ceil(Math.random() * 6))
    }
    dispatch(updateDices({ player: player, dices: newDices }))
  }

  const resetPlayerDiceChanges = (player) => {
    const newDiceChanges = []
    for (let i = 0; i < maxDicesPerPlayer; i++) {
      newDiceChanges.push(undefined)
    }
    dispatch(updateDiceChanges({ player: player, diceChanges: newDiceChanges }))
  }

  const removeDice = (player) => {
    if (player.diceCount > 0) {
      const newDiceChanges = []
      for (let i = 1; i <= maxDicesPerPlayer; i++) {
        i === player.diceCount
          ? newDiceChanges.push('x')
          : newDiceChanges.push(undefined)
      }
      dispatch(
        updateDiceCount({
          player: player,
          diceCount: player.diceCount - 1,
        })
      )
      dispatch(
        updateDiceChanges({
          player: player,
          diceChanges: newDiceChanges,
        })
      )
    }
  }

  const addDice = (player) => {
    if (player.diceCount < maxDicesPerPlayer) {
      const newDiceChanges = []
      for (let i = 1; i <= maxDicesPerPlayer; i++) {
        i === player.diceCount + 1
          ? newDiceChanges.push('+')
          : newDiceChanges.push(undefined)
      }
      dispatch(
        updateDiceCount({
          player: player,
          diceCount: player.diceCount + 1,
        })
      )
      dispatch(
        updateDiceChanges({
          player: player,
          diceChanges: newDiceChanges,
        })
      )
    }
  }

  const countDice = (value) => {
    const totalDiceCount = countDiceOf(value)
    const totalPacoCount = countDiceOf(1)
    return value === 1
      ? totalDiceCount
      : game.isPalifico
      ? totalDiceCount
      : totalDiceCount + totalPacoCount
  }

  const countDiceOf = (value) => {
    const diceOfCount = activePlayers.reduce((acc, player) => {
      return player.dices.filter((dice) => dice === value).length + acc
    }, 0)

    return diceOfCount
  }

  return {
    disabledDices: disabledDices,
    showDices: showDices,
    hideDices: hideDices,
    showPlayersDices: showPlayersDices,
    hidePlayersDices: hidePlayersDices,
    randomizePlayerDices: randomizePlayerDices,
    resetPlayerDiceChanges: resetPlayerDiceChanges,
    removeDice: removeDice,
    addDice: addDice,
    countDice: countDice,
    countDiceOf: countDiceOf,
  }
}
