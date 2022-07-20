import { useDispatch, useSelector } from 'react-redux'
import {
  updateIsActive,
} from '../redux/store'

export default function usePlayersData() {
  const activePlayers = useSelector((state) => state.players.activePlayers)
  const eliminatedPlayers = useSelector(
    (state) => state.players.eliminatedPlayers
  )

  const dispatch = useDispatch()

  const maxPlayerIndex = activePlayers.length - 1

  const totalPlayersDices = activePlayers.reduce((acc, item) => {
    return acc + item.dices.length
  }, 0)

  const getIndex = (player) => {
    return activePlayers.findIndex((item) => item.id === player.id)
  }

  const previousPlayer = (player) => {
    const currentIndex = getIndex(player)
    let previousIndex
    currentIndex > 0
      ? (previousIndex = currentIndex - 1)
      : (previousIndex = maxPlayerIndex)
    return activePlayers.find((item, index) => {
      return index === previousIndex
    })
  }

  const nextPlayer = (player) => {
    const currentIndex = getIndex(player)
    let nextIndex
    currentIndex < maxPlayerIndex
      ? (nextIndex = currentIndex + 1)
      : (nextIndex = 0)
    return activePlayers.find((item, index) => {
      return index === nextIndex
    })
  }

  const desactivateAllPlayers = () => {
    activePlayers.forEach((item) => {
      dispatch(updateIsActive({ player: item, isActive: false }))
    })
  }

  const activatePlayer = (player, panelRef) => {
    desactivateAllPlayers()
    dispatch(updateIsActive({ player: player, isActive: true }))
    panelRef.current.parentNode.childNodes[getIndex(player)].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  return {
    activePlayers: activePlayers,
    eliminatedPlayers: eliminatedPlayers,
    totalPlayersDices: totalPlayersDices,
    maxPlayerIndex: maxPlayerIndex,
    getIndex: getIndex,
    previousPlayer: previousPlayer,
    nextPlayer: nextPlayer,
    desactivateAllPlayers: desactivateAllPlayers,
    activatePlayer: activatePlayer,
  }
}
