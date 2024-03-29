import { useDispatch } from 'react-redux/'
import usePlayersData from './usePlayersData'
import { updateBidCount, updateBidValue } from '../redux/features/playersSlice'
import useGameData from './useGameData'
import useDices from './useDices'
import { displayErrorMessage } from '../redux/features/gameSlice'

export default function useBidData() {
  const { game } = useGameData()

  const { totalPlayersDices, previousPlayer } = usePlayersData()
  const { countDice } = useDices()

  const dispatch = useDispatch()

  const increaseBidCount = (player) => {
    if (game.isPause) return
    let newCount = undefined
    isNaN(player.bid.count)
      ? (newCount = 1)
      : player.bid.count < totalPlayersDices
      ? (newCount = player.bid.count + 1)
      : (newCount = totalPlayersDices)
    dispatch(updateBidCount({ player: player, bidCount: newCount }))
  }

  const decreaseBidCount = (player) => {
    if (game.isPause) return
    let newCount = undefined
    isNaN(player.bid.count)
      ? (newCount = 1)
      : player.bid.count > 1
      ? (newCount = player.bid.count - 1)
      : (newCount = 1)
    dispatch(updateBidCount({ player: player, bidCount: newCount }))
  }

  const increaseBidValue = (player) => {
    if (game.isPause) return
    let newValue = undefined
    isNaN(player.bid.value)
      ? (newValue = 1)
      : player.bid.value < 6
      ? (newValue = player.bid.value + 1)
      : (newValue = 1)
    dispatch(updateBidValue({ player: player, bidValue: newValue }))
  }

  const decreaseBidValue = (player) => {
    if (game.isPause) return
    let newValue = undefined
    isNaN(player.bid.value)
      ? (newValue = 1)
      : player.bid.value > 1
      ? (newValue = player.bid.value - 1)
      : (newValue = 6)
    dispatch(updateBidValue({ player: player, bidValue: newValue }))
  }

  const setBidCount = (player, newCount) => {
    if (!isNaN(newCount)) {
      newCount >= 1 &&
        newCount <= totalPlayersDices &&
        dispatch(updateBidCount({ player: player, bidCount: newCount }))
    } else {
      dispatch(updateBidCount({ player: player, bidCount: undefined }))
    }
  }

  const setBidValue = (player, newValue) => {
    if (!isNaN(newValue)) {
      newValue >= 1 &&
        newValue <= 6 &&
        dispatch(updateBidValue({ player: player, bidValue: newValue }))
    } else {
      dispatch(updateBidValue({ player: player, bidValue: undefined }))
    }
  }

  const previousBid = (player) => {
    return previousPlayer(player).bid
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

    if (isNaN(previousBid(player).count) || isNaN(previousBid(player).value))
      return true

    if (
      previousBid(player).value !== 1 &&
      player.bid.value !== 1 &&
      player.bid.count === previousBid(player).count &&
      player.bid.value > previousBid(player).value &&
      !game.isPalifico
    )
      return true

    if (
      previousBid(player).value !== 1 &&
      player.bid.value !== 1 &&
      player.bid.count > previousBid(player).count &&
      player.bid.value === previousBid(player).value
    )
      return true

    if (
      previousBid(player).value !== 1 &&
      player.bid.value === 1 &&
      player.bid.count >= Math.ceil(previousBid(player).count / 2) &&
      !game.isPalifico
    )
      return true

    if (
      previousBid(player).value === 1 &&
      player.bid.value !== 1 &&
      player.bid.count > previousBid(player).count * 2 &&
      !game.isPalifico
    )
      return true

    if (
      previousBid(player).value === 1 &&
      player.bid.value === 1 &&
      player.bid.count > previousBid(player).count
    )
      return true

    if (
      player.bid.count === previousBid(player).count &&
      player.bid.value === previousBid(player).value
    )
      dispatch(
        displayErrorMessage({
          title: 'Votre enchère est invalide.',
          body: "L'enchère ne peut être la même que la précédente.",
        })
      )
    else if (game.isPalifico && player.bid.value !== previousBid(player).value)
      dispatch(
        displayErrorMessage({
          title: 'Votre enchère est invalide.',
          body: "En situtation de Palifico la valeur du dé doit être la même que celle de l'enchère précédente.",
        })
      )
    else if (
      previousBid(player).value !== 1 &&
      player.bid.value === 1 &&
      player.bid.count < Math.ceil(previousBid(player).count / 2)
    )
      dispatch(
        displayErrorMessage({
          title: 'Votre enchère est invalide.',
          body: "Le nombre de Paco doit être au moins égale à la moitié de l'enchère précédente.",
        })
      )
    else if (
      previousBid(player).value === 1 &&
      player.bid.value !== 1 &&
      player.bid.count <= previousBid(player).count * 2
    )
      dispatch(
        displayErrorMessage({
          title: 'Votre enchère est invalide.',
          body: "Si l'enchère précédente porte sur des Paco le nombre de dés doit être au moins égale au double plus 1.",
        })
      )
    else if (player.bid.value < previousBid(player).value)
      dispatch(
        displayErrorMessage({
          title: 'Votre enchère est invalide.',
          body: "La valeur du dé ne peut être inférieure à celle de l'enchère précédente.",
        })
      )
    else if (player.bid.count < previousBid(player).count)
      dispatch(
        displayErrorMessage({
          title: 'Votre enchère est invalide.',
          body: "Le nombre de dés ne peut être inférieur à celui de l'enchère précédente.",
        })
      )
    else if (
      player.bid.count !== previousBid(player).count &&
      player.bid.value !== previousBid(player).value
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

  const checkBid = (bid, type) => {
    let isBidValid
    const diceCount = countDice(bid.value)
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

  return {
    increaseBidCount: increaseBidCount,
    decreaseBidCount: decreaseBidCount,
    increaseBidValue: increaseBidValue,
    decreaseBidValue: decreaseBidValue,
    setBidCount: setBidCount,
    setBidValue: setBidValue,
    previousBid: previousBid,
    checkBidProposal: checkBidProposal,
    checkBid: checkBid,
  }
}
