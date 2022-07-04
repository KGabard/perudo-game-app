import { useDispatch } from 'react-redux'
import {
  resetWrongRightAllPlayers,
  updateHasToPlay,
  eliminatePlayer,
} from '../redux/store'
import useBidData from './useBidData'
import useDices from './useDices'
import usePlayersData from './usePlayersData'

export default function useResetPlayers() {
  const { activePlayers, nextPlayer } = usePlayersData()
  const { randomizePlayerDices, resetPlayerDiceChanges } = useDices()
  const { setBidCount, setBidValue } = useBidData()

  const dispatch = useDispatch()

  const resetPlayer = (player) => {
    dispatch(resetWrongRightAllPlayers())
    randomizePlayerDices(player)
    resetPlayerDiceChanges(player)
    setBidCount(player, undefined)
    setBidValue(player, undefined)
    // if (player.diceCount <= 0) {
    //   eliminatePlayer(player)
    //   if (activePlayers.length > 2)
    //     dispatch(
    //       updateHasToPlay({ player: nextPlayer(player), hasToPlay: true })
    //     )
    // }
    if (player.diceCount <= 0) {
      dispatch(eliminatePlayer(player))
      if (activePlayers.length > 2)
        dispatch(
          updateHasToPlay({ player: nextPlayer(player), hasToPlay: true })
        )
    }
  }

  return {
    resetPlayer: resetPlayer,
  }
}
