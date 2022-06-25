import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useTest from '../hooks/test'
import {
  updateActivePlayer,
  desactivateAllPlayers,
  updateDicesDisplay,
  updateDiceCount,
  updateDices,
  updateHasToReset,
  updateHasToPlay,
  updateBidCount,
  updateBidValue,
  eliminatePlayer,
  updateIndex,
  updatePalifico,
  displayErrorMessage,
  displayEndTurnMessage,
  updateIsWrong,
  updateIsRight,
  resetWrongRightAllPlayers,
  updateDiceChanges,
  updatePlayingPlayerIndex,
  updateNextPlayingPlayerIndex,
} from '../redux/store'

export default function ActionBar(props) {
  const [play, setPlay] = useState({ isPlaying: false, payload: '' })

  const activePlayers = useSelector((state) => state.players.activePlayers)
  const currentPlayer = props.playerData
  const game = useSelector((state) => state.game)
  const dispatch = useDispatch()

  const maxPlayerIndex = activePlayers.length

  const totalPlayersDices = activePlayers.reduce((acc, item) => {
    return acc + item.dices.length
  }, 0)

  const previousPlayer = activePlayers.find((item) => {
    let previousIndex
    currentPlayer.index > 1
      ? (previousIndex = currentPlayer.index - 1)
      : (previousIndex = maxPlayerIndex)
    return item.index === previousIndex
  })

  const nextPlayer = activePlayers.find((item) => {
    let nextIndex
    currentPlayer.index < maxPlayerIndex
      ? (nextIndex = currentPlayer.index + 1)
      : (nextIndex = 1)
    return item.index === nextIndex
  })

  const currentBid = previousPlayer.bid

  useEffect(() => {
    if (!play.isPlaying || game.isPause) return
    switch (play.payload) {
      case 'makeBid':
        makeBid()
        break
      case 'dudo':
        endTurn('dudo')
        break
      case 'calza':
        endTurn('calza')
        break

      default:
        break
    }
    setPlay({ ...play, isPlaying: false })
  }, [play])

  const makeBid = () => {
    if (game.isPause) {
      dispatch(
        displayErrorMessage({
          title: 'Le jeu est en pause.',
          body: 'Vous ne pouvez pas continuer à jouer tant que des fenêtres ou messages sont ouverts. Veuillez les fermer avant de poursuivre.',
        })
      )
      return
    }
    if (checkBidProposal(currentPlayer)) {
      dispatch(
        updateBidCount({
          player: nextPlayer,
          bidCount: currentPlayer.bid.count,
        })
      )
      dispatch(
        updateBidValue({
          player: nextPlayer,
          bidValue: currentPlayer.bid.value,
        })
      )
      dispatch(updateHasToPlay({ player: nextPlayer, hasToPlay: true }))
    }
  }

  useEffect(() => {
    if (currentPlayer.hasToPlay) {
      dispatch(updateHasToPlay({ player: currentPlayer, hasToPlay: false }))
      activatePlayer(currentPlayer)
      currentPlayer.isComputer &&
        setTimeout(() => {
          computerPlay(currentPlayer)
        }, 1000)
    }
  }, [currentPlayer.hasToPlay])

  const computerPlay = (player) => {
    let computerBidCount
    let computerBidValue

    currentBid.count
      ? (computerBidCount = currentBid.count + 1)
      : (computerBidCount = 1)
    currentBid.value
      ? (computerBidValue = currentBid.value)
      : (computerBidValue = 2)

    dispatch(updateBidCount({ player: player, bidCount: computerBidCount }))
    dispatch(updateBidValue({ player: player, bidValue: computerBidValue }))

    Math.random() > 0.2
      ? setPlay({ isPlaying: true, payload: 'makeBid' })
      : Math.random() > 0.2
      ? setPlay({ isPlaying: true, payload: 'dudo' })
      : setPlay({ isPlaying: true, payload: 'calza' })
  }

  const activatePlayer = (player) => {
    dispatch(updateActivePlayer(player))
    props.panelRef.current.parentNode.childNodes[
      player.index - 1
    ].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  const endTurn = (type) => {
    if (game.isPause) {
      dispatch(
        displayErrorMessage({
          title: 'Le jeu est en pause.',
          body: 'Vous ne pouvez pas continuer à jouer tant que des fenêtres ou messages sont ouverts. Veuillez les fermer avant de poursuivre.',
        })
      )
      return
    }

    let endTurnMessage = {
      isWrong: '',
      header: '',
      title: '',
      subtitle: '',
      body: '',
    }

    if (isNaN(currentBid.count) || isNaN(currentBid.value)) {
      dispatch(
        displayErrorMessage({
          title: "L'enchère précédente n'est pas définie.",
          body: "L'enchère précédente ne présente pas un nombre de dés et une valeur de dé définis. Veuillez proposer une enchère.",
        })
      )
    } else {
      if (checkBid(currentBid, type)) {
        endTurnMessage.isWrong = false
        endTurnMessage.title = "L'enchère est validée."
        switch (type) {
          case 'dudo':
            endTurnMessage.header = 'Dudo !'
            currentPlayer.diceCount > 1
              ? (endTurnMessage.subtitle = `${currentPlayer.name} perd un dé.`)
              : (endTurnMessage.subtitle = `${currentPlayer.name} perd un dé et est éliminé.`)
            removeDice(currentPlayer)
            dispatch(updateIsWrong({ player: currentPlayer, isWrong: true }))
            currentPlayer.diceCount - 1 === 1
              ? dispatch(updatePalifico(true))
              : dispatch(updatePalifico(false))
            break
          case 'calza':
            endTurnMessage.header = 'Calza !'
            endTurnMessage.subtitle = `${currentPlayer.name} gagne un dé.`
            addDice(currentPlayer)
            dispatch(updateIsRight({ player: currentPlayer, isRight: true }))
            dispatch(updatePalifico(false))
            break

          default:
            break
        }
      } else {
        endTurnMessage.isWrong = true
        endTurnMessage.title = "L'enchère n'est pas validée."
        switch (type) {
          case 'dudo':
            endTurnMessage.header = 'Dudo !'
            previousPlayer.diceCount > 1
              ? (endTurnMessage.subtitle = `${previousPlayer.name} perd un dé.`)
              : (endTurnMessage.subtitle = `${previousPlayer.name} perd un dé et est éliminé.`)
            removeDice(previousPlayer)
            dispatch(updateIsWrong({ player: previousPlayer, isWrong: true }))
            previousPlayer.diceCount - 1 === 1
              ? dispatch(updatePalifico(true))
              : dispatch(updatePalifico(false))
            break
          case 'calza':
            endTurnMessage.header = 'Calza !'
            currentPlayer.diceCount > 1
              ? (endTurnMessage.subtitle = `${currentPlayer.name} perd un dé.`)
              : (endTurnMessage.subtitle = `${currentPlayer.name} perd un dé et est éliminé.`)
            removeDice(currentPlayer)
            dispatch(updateIsWrong({ player: currentPlayer, isWrong: true }))
            currentPlayer.diceCount - 1 === 1
              ? dispatch(updatePalifico(true))
              : dispatch(updatePalifico(false))
            break

          default:
            break
        }
      }
      dispatch(desactivateAllPlayers())
      activePlayers.forEach((item) => {
        dispatch(updateHasToPlay({ player: item, hasToPlay: false }))
      })
      endTurnMessage.body = describeBidCheck(type)
      dispatch(displayEndTurnMessage(endTurnMessage))
    }
  }

  const describeBidCheck = (type) => {
    let message

    message = `L'enchère annoncée par ${previousPlayer.name} est de ${
      currentBid.count
    } ${currentBid.value === 1 ? 'Paco' : `dés de ${currentBid.value}`}.`

    switch (type) {
      case 'dudo':
        message += ` ${currentPlayer.name} doute de cette enchère.`
        break
      case 'calza':
        message += ` ${currentPlayer.name} pense que cette enchère exacte.`
        break
      default:
        break
    }

    message += '\n\n'

    game.isPalifico || currentBid.value === 1
      ? (message += `En tout il y a ${countDiceOf(currentBid.value)} ${
          currentBid.value === 1 ? 'Paco' : `dés de ${currentBid.value}`
        }.`)
      : (message += `En tout il y a ${countDiceOf(currentBid.value)} dés de ${
          currentBid.value
        } et ${countDiceOf(1)} Paco, soit ${
          countDiceOf(currentBid.value) + countDiceOf(1)
        } dés de ${currentBid.value}.`)

    message += '\n\n'

    if (checkBid(currentBid, type)) {
      message += `L'enchère est donc validée.`
      switch (type) {
        case 'dudo':
          message += ` ${currentPlayer.name} perd un dé`
          if (currentPlayer.diceCount <= 1) message += ` et est éliminé`
          break
        case 'calza':
          message += ` ${currentPlayer.name} gagne un dé`
          break
        default:
          break
      }
    } else {
      message += `L'enchère n'est donc pas validée.`
      switch (type) {
        case 'dudo':
          message += ` ${previousPlayer.name} perd un dé`
          if (previousPlayer.diceCount <= 1) message += ` et est éliminé`
          break
        case 'calza':
          message += ` ${currentPlayer.name} perd un dé`
          if (currentPlayer.diceCount <= 1) message += ` et est éliminé`
          break
        default:
          break
      }
    }

    message += '. Les dés sont à nouveau mélangés.'

    return message
  }

  useEffect(() => {
    if (currentPlayer.hasToReset) {
      resetPlayer(currentPlayer)
    }
  }, [currentPlayer.hasToReset])

  const resetPlayer = (player) => {
    dispatch(updateHasToReset({ player: player, hasToReset: false }))
    dispatch(resetWrongRightAllPlayers())
    hidePlayersDices()
    randomizePlayerDices(player)
    resetPlayerDiceChanges(player)
    dispatch(updateBidCount({ player: player, bidCount: undefined }))
    dispatch(updateBidValue({ player: player, bidValue: undefined }))
    if (player.diceCount <= 0) {
      if (activePlayers.length > 2)
        dispatch(updateHasToPlay({ player: nextPlayer, hasToPlay: true }))
      dispatch(eliminatePlayer(player))
      console.log(activePlayers.length)
    }
    dispatch(updateIndex(player))
  }

  const checkBidProposal = (player) => {
    if (isNaN(player.bid.count) || isNaN(player.bid.value)) {
      dispatch(
        displayErrorMessage({
          title: 'Votre enchère est invalide.',
          body: 'Votre enchère est incomplète.',
        })
      )
      return false
    }
    if (player.bid.count > totalPlayersDices) {
      dispatch(
        displayErrorMessage({
          title: 'Votre enchère est invalide.',
          body: 'Vous avez parié sur un nombre de dés plus élevé que le total présent sur la table.',
        })
      )
      return false
    }
    if (isNaN(currentBid.count) || isNaN(currentBid.value)) return true

    if (
      currentBid.value !== 1 &&
      player.bid.value !== 1 &&
      player.bid.count === currentBid.count &&
      player.bid.value > currentBid.value &&
      !game.isPalifico
    )
      return true

    if (
      currentBid.value !== 1 &&
      player.bid.value !== 1 &&
      player.bid.count > currentBid.count &&
      player.bid.value === currentBid.value
    )
      return true

    if (
      currentBid.value !== 1 &&
      player.bid.value === 1 &&
      player.bid.count >= Math.ceil(currentBid.count / 2) &&
      !game.isPalifico
    )
      return true

    if (
      currentBid.value === 1 &&
      player.bid.value !== 1 &&
      player.bid.count > currentBid.count * 2 &&
      !game.isPalifico
    )
      return true

    if (
      currentBid.value === 1 &&
      player.bid.value === 1 &&
      player.bid.count > currentBid.count
    )
      return true

    if (
      player.bid.count === currentBid.count &&
      player.bid.value === currentBid.value
    )
      dispatch(
        displayErrorMessage({
          title: 'Votre enchère est invalide.',
          body: "L'enchère ne peut être la même que la précédente.",
        })
      )
    else if (game.isPalifico && player.bid.value !== currentBid.value)
      dispatch(
        displayErrorMessage({
          title: 'Votre enchère est invalide.',
          body: "En situtation de Palifico la valeur du dé doit être la même que celle de l'enchère précédente.",
        })
      )
    else if (
      currentBid.value !== 1 &&
      player.bid.value === 1 &&
      player.bid.count < Math.ceil(currentBid.count / 2)
    )
      dispatch(
        displayErrorMessage({
          title: 'Votre enchère est invalide.',
          body: "Le nombre de Paco doit être au moins égale à la moitié de l'enchère précédente.",
        })
      )
    else if (
      currentBid.value === 1 &&
      player.bid.value !== 1 &&
      player.bid.count <= currentBid.count * 2
    )
      dispatch(
        displayErrorMessage({
          title: 'Votre enchère est invalide.',
          body: "Si l'enchère précédente porte sur des Paco le nombre de dés doit être au moins égale au double plus 1.",
        })
      )
    else if (player.bid.value < currentBid.value)
      dispatch(
        displayErrorMessage({
          title: 'Votre enchère est invalide.',
          body: "La valeur du dé ne peut être inférieure à celle de l'enchère précédente.",
        })
      )
    else if (player.bid.count < currentBid.count)
      dispatch(
        displayErrorMessage({
          title: 'Votre enchère est invalide.',
          body: "Le nombre de dés ne peut être inférieur à celui de l'enchère précédente.",
        })
      )
    else if (
      player.bid.count !== currentBid.count &&
      player.bid.value !== currentBid.value
    )
      dispatch(
        displayErrorMessage({
          title: 'Votre enchère est invalide.',
          body: 'Vous ne pouvez faire évoluer que le nombre de dés ou la valeur du dé, pas les deux en même temps.',
        })
      )
    else
      dispatch(
        displayErrorMessage({ title: 'Votre enchère est invalide.', body: '' })
      )
    return false
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
    for (let i = 0; i < game.playersMaxDiceCount; i++) {
      newDiceChanges.push(undefined)
    }
    dispatch(updateDiceChanges({ player: player, diceChanges: newDiceChanges }))
  }

  const removeDice = (player) => {
    if (player.diceCount > 0) {
      const newDiceChanges = []
      for (let i = 1; i <= game.playersMaxDiceCount; i++) {
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
    if (player.diceCount < game.playersMaxDiceCount) {
      const newDiceChanges = []
      for (let i = 1; i <= game.playersMaxDiceCount; i++) {
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

  const checkBid = (bid, type) => {
    let isBidValid
    const diceCount = countDice(bid.value)
    // console.log(diceCount)
    showPlayersDices()
    switch (type) {
      case 'dudo':
        isBidValid = bid.count <= diceCount
        break
      case 'calza':
        isBidValid = bid.count === diceCount
        break
      default:
        isBidValid = undefined
        break
    }
    return isBidValid
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

  return (
    <div
      className={
        !currentPlayer.isComputer && currentPlayer.isActive
          ? 'actionBar actionBar--displayed'
          : 'actionBar'
      }
    >
      <div
        className="actionBar__bidBtn"
        onClick={() => {
          setPlay({ isPlaying: true, payload: 'makeBid' })
        }}
      >
        Enchérir
      </div>
      <div
        className="actionBar__dudoBtn"
        onClick={() => {
          setPlay({ isPlaying: true, payload: 'dudo' })
        }}
      >
        Dudo
      </div>
      <div
        className="actionBar__calzaBtn"
        onClick={() => {
          setPlay({ isPlaying: true, payload: 'calza' })
        }}
      >
        Calza
      </div>
    </div>
  )
}
