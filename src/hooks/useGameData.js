import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateIsOver, updateIsPalifico } from '../redux/features/gameSlice'
import usePlayersData from './usePlayersData'

export default function useGameData() {
  const game = useSelector((state) => state.game)
  const { activePlayers } = usePlayersData()

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

  return {
    game: game,
    maxDicesPerPlayer: maxDicesPerPlayer,
    checkIsPalifico: checkIsPalifico,
  }
}
