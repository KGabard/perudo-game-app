import { useDispatch, useSelector } from 'react-redux'
import {
  displayErrorMessage,
  updateHasToPlay,
  updateIsRight,
  updateIsWrong,
} from '../redux/store'
import useBidData from './useBidData'
import useDices from './useDices'
import useEndTurnMessage from './useEndTurnMessage'
import useGameData from './useGameData'
import usePlayersData from './usePlayersData'

export default function useActions() {
  const activePlayers = useSelector((state) => state.players.activePlayers)
  const game = useSelector((state) => state.game)

  const { nextPlayer, previousPlayer, desactivateAllPlayers } = usePlayersData()
  const { checkIsPalifico } = useGameData()
  const { setBidCount, setBidValue, checkBidProposal, checkBid, previousBid } =
    useBidData()
  const { removeDice, addDice, showPlayersDices } = useDices()
  const { createEndTurnMessage } = useEndTurnMessage()

  const dispatch = useDispatch()

  const makeBid = (player) => {
    if (game.isPause) {
      dispatch(
        displayErrorMessage({
          title: 'Le jeu est en pause.',
          body: 'Vous ne pouvez pas continuer à jouer tant que des fenêtres ou messages sont ouverts. Veuillez les fermer avant de poursuivre.',
        })
      )
      return
    }

    if (checkBidProposal(player)) {
      setBidCount(nextPlayer(player), player.bid.count)
      setBidValue(nextPlayer(player), player.bid.value)
      dispatch(updateHasToPlay({ player: nextPlayer(player), hasToPlay: true }))
    }
  }

  const endTurn = (player, type) => {
    if (game.isPause) {
      dispatch(
        displayErrorMessage({
          title: 'Le jeu est en pause.',
          body: 'Vous ne pouvez pas continuer à jouer tant que des fenêtres ou messages sont ouverts. Veuillez les fermer avant de poursuivre.',
        })
      )
      return
    }

    if (isNaN(previousBid(player).count) || isNaN(previousBid(player).value)) {
      dispatch(
        displayErrorMessage({
          title: "L'enchère précédente n'est pas définie.",
          body: "L'enchère précédente ne présente pas un nombre de dés et une valeur de dé définis. Veuillez proposer une enchère.",
        })
      )
    } else {
      if (checkBid(previousBid(player), type)) {
        switch (type) {
          case 'dudo':
            removeDice(player)
            dispatch(updateIsWrong({ player: player, isWrong: true }))
            break
          case 'calza':
            addDice(player)
            dispatch(updateIsRight({ player: player, isRight: true }))
            break
          default:
            break
        }
      } else {
        switch (type) {
          case 'dudo':
            removeDice(previousPlayer(player))
            dispatch(
              updateIsWrong({ player: previousPlayer(player), isWrong: true })
            )
            break
          case 'calza':
            removeDice(player)
            dispatch(updateIsWrong({ player: player, isWrong: true }))
            break
          default:
            break
        }
      }
      desactivateAllPlayers()
      showPlayersDices()
      activePlayers.forEach((item) => {
        dispatch(updateHasToPlay({ player: item, hasToPlay: false }))
      })
      createEndTurnMessage(player, type)
    }
  }

  return { makeBid: makeBid, endTurn: endTurn }
}
