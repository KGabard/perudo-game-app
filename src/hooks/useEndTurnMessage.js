import { useDispatch } from 'react-redux'
import { updateHasToPlay } from '../redux/features/playersSlice'
import {
  displayEndTurnMessage,
  hideEndTurnMessage,
  incrementTurnCounter,
} from '../redux/features/gameSlice'
import useBidData from './useBidData'
import useDices from './useDices'
import useGameData from './useGameData'
import usePlayersData from './usePlayersData'
import useResetPlayers from './useResetPlayers'

export default function useEndTurnMessage() {
  const { activePlayers, previousPlayer } = usePlayersData()
  const { game, checkIsPalifico } = useGameData()
  const { checkBid, previousBid } = useBidData()
  const { countDiceOf, hidePlayersDices } = useDices()
  const { resetPlayer } = useResetPlayers()

  const dispatch = useDispatch()

  const describeBidCheck = (player, type) => {
    let message

    message = `L'enchère annoncée par ${previousPlayer(player).name} est de ${
      previousBid(player).count
    } ${
      previousBid(player).value === 1
        ? 'Paco'
        : `dés de ${previousBid(player).value}`
    }.`

    switch (type) {
      case 'dudo':
        message += ` ${player.name} doute de cette enchère.`
        break
      case 'calza':
        message += ` ${player.name} pense que cette enchère exacte.`
        break
      default:
        break
    }

    message += '\n\n'

    game.isPalifico || previousBid(player).value === 1
      ? (message += `En tout il y a ${countDiceOf(previousBid(player).value)} ${
          previousBid(player).value === 1
            ? 'Paco'
            : `dés de ${previousBid(player).value}`
        }.`)
      : (message += `En tout il y a ${countDiceOf(
          previousBid(player).value
        )} dés de ${previousBid(player).value} et ${countDiceOf(
          1
        )} Paco, soit ${
          countDiceOf(previousBid(player).value) + countDiceOf(1)
        } dés de ${previousBid(player).value}.`)

    message += '\n\n'

    if (checkBid(previousBid(player), type)) {
      message += `L'enchère est donc validée.`
      switch (type) {
        case 'dudo':
          message += ` ${player.name} perd un dé`
          if (player.diceCount <= 1) message += ` et est éliminé`
          break
        case 'calza':
          message += ` ${player.name} gagne un dé`
          break
        default:
          break
      }
    } else {
      message += `L'enchère n'est donc pas validée.`
      switch (type) {
        case 'dudo':
          message += ` ${previousPlayer(player).name} perd un dé`
          if (previousPlayer(player).diceCount <= 1)
            message += ` et est éliminé`
          break
        case 'calza':
          message += ` ${player.name} perd un dé`
          if (player.diceCount <= 1) message += ` et est éliminé`
          break
        default:
          break
      }
    }

    message += '. Les dés sont à nouveau mélangés.'

    return message
  }

  const createEndTurnMessage = (player, type) => {
    let endTurnMessage = {
      isWrong: false,
      isRight: false,
      header: '',
      title: '',
      subtitle: '',
      body: '',
    }

    if (checkBid(previousBid(player), type)) {
      endTurnMessage.isRight = true
      endTurnMessage.title = "L'enchère est validée."
      switch (type) {
        case 'dudo':
          endTurnMessage.header = 'Dudo !'
          player.diceCount > 1
            ? (endTurnMessage.subtitle = `${player.name} perd un dé.`)
            : (endTurnMessage.subtitle = `${player.name} perd un dé et est éliminé.`)
          break
        case 'calza':
          endTurnMessage.header = 'Calza !'
          endTurnMessage.subtitle = `${player.name} gagne un dé.`
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
          previousPlayer(player).diceCount > 1
            ? (endTurnMessage.subtitle = `${
                previousPlayer(player).name
              } perd un dé.`)
            : (endTurnMessage.subtitle = `${
                previousPlayer(player).name
              } perd un dé et est éliminé.`)
          break
        case 'calza':
          endTurnMessage.header = 'Calza !'
          player.diceCount > 1
            ? (endTurnMessage.subtitle = `${player.name} perd un dé.`)
            : (endTurnMessage.subtitle = `${player.name} perd un dé et est éliminé.`)
          break
        default:
          break
      }
    }
    endTurnMessage.body = describeBidCheck(player, type)
    dispatch(displayEndTurnMessage(endTurnMessage))
  }

  const nextTurn = () => {
    checkIsPalifico()
    activePlayers.forEach((item) => {
      item.isWrong &&
        dispatch(updateHasToPlay({ player: item, hasToPlay: true }))
      item.isRight &&
        dispatch(updateHasToPlay({ player: item, hasToPlay: true }))
      resetPlayer(item)
    })
    dispatch(hideEndTurnMessage())
    dispatch(incrementTurnCounter())
    hidePlayersDices()
  }

  return {
    createEndTurnMessage: createEndTurnMessage,
    describeBidCheck: describeBidCheck,
    nextTurn: nextTurn,
  }
}
