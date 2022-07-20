import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateIsOver,
  updateIsPalifico,
  updatePlayerAvatar,
  updatePlayers,
} from '../redux/store'
import usePlayersData from './usePlayersData'

import playerImage1 from '../Assets/Images/PlayerImage1.png'
import playerImage2 from '../Assets/Images/PlayerImage2.png'
import playerImage3 from '../Assets/Images/PlayerImage3.png'
import playerImage4 from '../Assets/Images/PlayerImage4.png'
import playerImage5 from '../Assets/Images/PlayerImage5.png'
import playerImage6 from '../Assets/Images/PlayerImage6.png'

const playerImages = [
  playerImage1,
  playerImage2,
  playerImage3,
  playerImage4,
  playerImage5,
  playerImage6,
]

export default function useGameData() {
  const game = useSelector((state) => state.game)
  const { activePlayers } = usePlayersData()

  const gameMenuPlayers = game.gameMenu.players
  const maxDicesPerPlayer = game.maxDicesPerPlayer

  const dispatch = useDispatch()

  useEffect(() => {
    activePlayers.length <= 1 && dispatch(updateIsOver(true))
  }, [dispatch, activePlayers.length])

  const checkIsPalifico = () => {
    let isPalifico = false
    activePlayers.forEach((item) => {
      if (item.isWrong && item.diceCount === 1) isPalifico = true
    })
    dispatch(updateIsPalifico(isPalifico))
  }

  const otherAvatar = (avatar, type) => {
    let avatarIndex = 0

    playerImages.forEach((item, index) => {
      if (item === avatar) avatarIndex = index
    })

    switch (type) {
      case 'next':
        avatarIndex < playerImages.length - 1
          ? avatarIndex++
          : (avatarIndex = 0)
        break
      case 'previous':
        avatarIndex > 0
          ? avatarIndex--
          : (avatarIndex = playerImages.length - 1)
        break

      default:
        break
    }

    return playerImages[avatarIndex]
  }

  const isAvatarAvailable = (avatar) => {
    let isAvailable = true
    gameMenuPlayers.forEach((item) => {
      if (avatar === item.avatar) isAvailable = false
    })
    return isAvailable
  }

  const availableAvatar = (currentIndex, type) => {
    const player = gameMenuPlayers.find((item, index) => index === currentIndex)

    let currentAvatar = otherAvatar(player.avatar, type)
    while (!isAvatarAvailable(currentAvatar)) {
      currentAvatar = otherAvatar(currentAvatar, type)
    }

    return currentAvatar
  }

  const setAvatar = (currentIndex, type) => {
    dispatch(
      updatePlayerAvatar({
        index: currentIndex,
        avatar: availableAvatar(currentIndex, type),
      })
    )
  }

  const increasePlayersNumber = () => {
    const newGameMenuPlayers = []

    gameMenuPlayers.forEach((player) => {
      newGameMenuPlayers.push(player)
    })

    if (gameMenuPlayers.length < game.maxPlayersNumber) {
      newGameMenuPlayers.push({
        name: '',
        avatar: availableAvatar(gameMenuPlayers.length - 1, 'next'),
        isComputer: false,
      })
    }

    dispatch(updatePlayers(newGameMenuPlayers))
  }

  const decreasePlayersNumber = () => {
    const newGameMenuPlayers = []

    gameMenuPlayers.forEach((player) => {
      newGameMenuPlayers.push(player)
    })

    if (gameMenuPlayers.length > game.minPlayersNumber) {
      newGameMenuPlayers.pop()
    }

    dispatch(updatePlayers(newGameMenuPlayers))
  }

  return {
    game: game,
    maxDicesPerPlayer: maxDicesPerPlayer,
    checkIsPalifico: checkIsPalifico,
    setAvatar: setAvatar,
    increasePlayersNumber: increasePlayersNumber,
    decreasePlayersNumber: decreasePlayersNumber,
  }
}
