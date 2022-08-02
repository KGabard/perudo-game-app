import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  resetEliminatedPlayers,
  setNewPlayers,
  updateHasToPlay,
} from '../redux/features/playersSlice'
import {
  hideEndTurnMessage,
  hideMenu,
  updateDicesAreRolling,
  updateIsOver,
} from '../redux/features/gameSlice'
import useGameData from './useGameData'
import usePlayersData from './usePlayersData'
import useResetPlayers from './useResetPlayers'

export default function useGameMenu({ watch, setValue, append, remove }) {
  const dispatch = useDispatch()
  const { game } = useGameData()
  const { activePlayers } = usePlayersData()
  const { resetPlayer } = useResetPlayers()

  const [gameHasToStart, setGameHasToStart] = useState(false)

  const players = watch('players')

  const otherAvatar = (avatarIndex, type) => {
    switch (type) {
      case 'next':
        avatarIndex < game.playerImages.length - 1
          ? avatarIndex++
          : (avatarIndex = 0)
        break
      case 'previous':
        avatarIndex > 0
          ? avatarIndex--
          : (avatarIndex = game.playerImages.length - 1)
        break

      default:
        break
    }

    return avatarIndex
  }

  const isAvatarAvailable = (avatar) => {
    let isAvailable = true
    players.forEach((item) => {
      if (avatar === item.avatar) isAvailable = false
    })
    return isAvailable
  }

  const availableAvatar = (avatar, type) => {
    let newAvatar = otherAvatar(avatar, type)

    while (!isAvatarAvailable(newAvatar)) {
      newAvatar = otherAvatar(newAvatar, type)
    }

    return newAvatar
  }

  const handleAvatarChange = (currentIndex, type) => {
    const newAvatar = availableAvatar(
      watch(`players.${currentIndex}.avatar`),
      type
    )

    setValue(`players.${currentIndex}.avatar`, newAvatar)
  }

  const addPlayer = () => {
    players.length < game.maxPlayersNumber &&
      append(
        {
          name: '',
          avatar: availableAvatar(0, 'next'),
          isComputer: false,
        },
        {
          shouldFocus: false,
        }
      )
  }

  const removePlayer = () => {
    players.length > game.minPlayersNumber && remove(players.length - 1)
  }

  const startGame = () => {
    dispatch(setNewPlayers(players))
    dispatch(updateIsOver(false))
    dispatch(hideEndTurnMessage())
    setGameHasToStart(true)
    dispatch(resetEliminatedPlayers())
    dispatch(updateDicesAreRolling(true))
  }

  useEffect(() => {
    if (gameHasToStart) {
      activePlayers.forEach((item) => {
        resetPlayer(item)
      })
      closeMenu()
    }
  }, [gameHasToStart])

  const closeMenu = () => {
    activePlayers.forEach((item) => {
      item.isActive &&
        dispatch(updateHasToPlay({ player: item, hasToPlay: true }))
    })
    dispatch(hideMenu('game'))
  }

  return {
    handleAvatarChange: handleAvatarChange,
    addPlayer: addPlayer,
    removePlayer: removePlayer,
    startGame: startGame,
    closeMenu: closeMenu,
  }
}
