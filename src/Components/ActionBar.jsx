import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateActivePlayer,
  updateDicesDisplay,
  updateDiceCount,
  updateDices,
  updateHasToReset,
  updateBidCount,
  updateBidValue,
} from '../redux/store'

export default function ActionBar(props) {
  const playersData = useSelector((state) => state.players)
  const currentPlayer = props.playerData
  const gameData = useSelector((state) => state.game)
  const dispatch = useDispatch()

  const gameIsPause = gameData.isPause
  const gameIsPalifico = gameData.isPalifico

  const maxPlayerIndex = playersData.length

  const previousPlayer = playersData.find((item) => {
    let previousIndex
    currentPlayer.index > 1
      ? (previousIndex = currentPlayer.index - 1)
      : (previousIndex = maxPlayerIndex)
    return item.index === previousIndex
  })

  const nextPlayer = playersData.find((item) => {
    let nextIndex
    currentPlayer.index < maxPlayerIndex
      ? (nextIndex = currentPlayer.index + 1)
      : (nextIndex = 1)
    return item.index === nextIndex
  })

  const currentBid = previousPlayer.bid

  const makeBid = () => {
    if (gameIsPause) return
    activatePlayer(nextPlayer)
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
    if (gameIsPause) return

    if (isNaN(currentBid.count) || isNaN(currentBid.value)) {
      console.log('Enchère pas définie')
    } else {
      if (checkBid(currentBid, type)) {
        console.log('Enchère valide')
        switch (type) {
          case 'dudo':
            removeDice(currentPlayer)
            break
          case 'calza':
            addDice(currentPlayer)
            break

          default:
            break
        }
        activatePlayer(currentPlayer)
      } else {
        console.log('Enchère non valide')
        removeDice(previousPlayer)
        activatePlayer(previousPlayer)
      }
    }
    playersData.forEach((item) => {
      dispatch(updateHasToReset({ player: item, hasToReset: true }))
    })
  }

  // console.log(`joueur ${currentPlayer.index} hasToReset: ${currentPlayer.hasToReset}`);

  useEffect(() => {
    if (currentPlayer.hasToReset) {
      // console.log(`joueur ${currentPlayer.index} : reset`);
      dispatch(updateHasToReset({ player: currentPlayer, hasToReset: false }))
      randomizePlayerDices(currentPlayer)
      dispatch(updateBidCount({ player: currentPlayer, bidCount: undefined }))
      dispatch(updateBidValue({ player: currentPlayer, bidValue: undefined }))
    }
  }, [currentPlayer.hasToReset])

  const randomizePlayerDices = (player) => {
    const newDices = []
    for (let i = 0; i < player.diceCount; i++) {
      newDices.push(Math.ceil(Math.random() * 6))
    }
    dispatch(updateDices({ player: player, dices: newDices }))
  }

  const removeDice = (player) => {
    player.diceCount > 0 &&
      dispatch(
        updateDiceCount({
          player: player,
          diceCount: player.diceCount - 1,
        })
      )
  }

  const addDice = (player) => {
    player.diceCount < gameData.playersMaxDiceCount &&
      dispatch(
        updateDiceCount({
          player: player,
          diceCount: player.diceCount + 1,
        })
      )
  }

  const checkBid = (bid, type) => {
    let isBidValid
    const diceCount = countDice(bid.value)
    console.log(diceCount)
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
    const totalDiceCount = playersData.reduce((acc, player) => {
      return player.dices.filter((dice) => dice === value).length + acc
    }, 0)
    const totalPacoCount = playersData.reduce((acc, player) => {
      return player.dices.filter((dice) => dice === 1).length + acc
    }, 0)
    return value === 1
      ? totalDiceCount
      : gameIsPalifico
      ? totalDiceCount
      : totalDiceCount + totalPacoCount
  }

  const showPlayersDices = () => {
    playersData.map((item) =>
      dispatch(updateDicesDisplay({ player: item, areDicesDisplayed: true }))
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
          makeBid()
        }}
      >
        Enchérir
      </div>
      <div
        className="actionBar__dudoBtn"
        onClick={() => {
          endTurn('dudo')
        }}
      >
        Dudo
      </div>
      <div
        className="actionBar__calzaBtn"
        onClick={() => {
          endTurn('calza')
        }}
      >
        Calza
      </div>
    </div>
  )
}
