import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { hideEndTurnMessage, hideMenu, setNewPlayers, updateIsOver } from '../redux/store'
import useGameData from './useGameData'
import usePlayersData from './usePlayersData'
import useResetPlayers from './useResetPlayers'

export default function useGameMenu({formData, setFormData}) {
  const dispatch = useDispatch()
  const { game } = useGameData()
  const { activePlayers } = usePlayersData()
  const { resetPlayer } = useResetPlayers()

  const [gameHasToStart, setGameHasToStart] = useState(false)

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
    formData.players.forEach((item) => {
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
    const newPlayers = [...formData.players]

    newPlayers[currentIndex].avatar = availableAvatar(
      newPlayers[currentIndex].avatar,
      type
    )

    setFormData({ ...formData, players: newPlayers })
  }

  const increasePlayersNumber = () => {
    const newPlayers = [...formData.players]

    if (newPlayers.length < game.maxPlayersNumber) {
      newPlayers.push({
        name: '',
        avatar: availableAvatar(0, 'next'),
        isComputer: false,
      })
    }

    setFormData({ ...formData, players: newPlayers })
  }

  const decreasePlayersNumber = () => {
    const newPlayers = [...formData.players]

    if (newPlayers.length > game.minPlayersNumber) {
      newPlayers.pop()
    }

    setFormData({ ...formData, players: newPlayers })
  }

  const handleNameChange = (e, index) => {
    const inputFieldValue = e.target.value
    const inputFieldName = e.target.name
    const newPlayers = [...formData.players]
    newPlayers[index][inputFieldName] = inputFieldValue
    setFormData({ ...formData, players: newPlayers })
  }

  const toggleIsComputer = (e, index) => {
    const inputFieldName = e.target.name
    const newPlayers = [...formData.players]
    newPlayers[index][inputFieldName] = !newPlayers[index][inputFieldName]
    setFormData({ ...formData, players: newPlayers })
  }

  const startGame = () => {
    dispatch(setNewPlayers(formData.players))
    dispatch(updateIsOver(false))
    dispatch(hideEndTurnMessage())
    setGameHasToStart(true)
    //! Réinitialiser le tableau des joueurs éliminés !!!
  }

  const handleFormSubmit = () => {
    startGame()
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
    dispatch(hideMenu('game'))
  }

  return {
    handleAvatarChange: handleAvatarChange,
    increasePlayersNumber: increasePlayersNumber,
    decreasePlayersNumber: decreasePlayersNumber,
    handleNameChange: handleNameChange,
    toggleIsComputer: toggleIsComputer,
    handleFormSubmit: handleFormSubmit,
    closeMenu: closeMenu,
  }
}
