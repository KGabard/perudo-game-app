import { useDispatch } from 'react-redux/'
import usePlayersData from './usePlayersData'
import { updateBidCount, updateBidValue } from '../redux/features/playersSlice'
import useGameData from './useGameData'
import useDices from './useDices'
import { displayErrorMessage } from '../redux/features/gameSlice'

export default function useBidData() {
  // const { activePlayers } = usePlayersData()
  const { game } = useGameData()

  const { totalPlayersDices, previousPlayer } = usePlayersData()
  const { countDice } = useDices()

  const dispatch = useDispatch()

  const increaseBidCount = (player) => {
    let newCount = undefined
    isNaN(player.bid.count)
      ? (newCount = 1)
      : player.bid.count < totalPlayersDices
      ? (newCount = player.bid.count + 1)
      : (newCount = totalPlayersDices)
    dispatch(updateBidCount({ player: player, bidCount: newCount }))
  }

  const decreaseBidCount = (player) => {
    let newCount = undefined
    isNaN(player.bid.count)
      ? (newCount = 1)
      : player.bid.count > 1
      ? (newCount = player.bid.count - 1)
      : (newCount = 1)
    dispatch(updateBidCount({ player: player, bidCount: newCount }))
  }

  const increaseBidValue = (player) => {
    let newValue = undefined
    isNaN(player.bid.value)
      ? (newValue = 1)
      : player.bid.value < 6
      ? (newValue = player.bid.value + 1)
      : (newValue = 1)
    dispatch(updateBidValue({ player: player, bidValue: newValue }))
  }

  const decreaseBidValue = (player) => {
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
          title: 'Votre ench??re est invalide.',
          body: 'Votre ench??re est incompl??te.',
        })
      )
      return false
    }
    if (player.bid.count > totalPlayersDices) {
      dispatch(
        displayErrorMessage({
          title: 'Votre ench??re est invalide.',
          body: 'Vous avez pari?? sur un nombre de d??s plus ??lev?? que le total pr??sent sur la table.',
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
          title: 'Votre ench??re est invalide.',
          body: "L'ench??re ne peut ??tre la m??me que la pr??c??dente.",
        })
      )
    else if (game.isPalifico && player.bid.value !== previousBid(player).value)
      dispatch(
        displayErrorMessage({
          title: 'Votre ench??re est invalide.',
          body: "En situtation de Palifico la valeur du d?? doit ??tre la m??me que celle de l'ench??re pr??c??dente.",
        })
      )
    else if (
      previousBid(player).value !== 1 &&
      player.bid.value === 1 &&
      player.bid.count < Math.ceil(previousBid(player).count / 2)
    )
      dispatch(
        displayErrorMessage({
          title: 'Votre ench??re est invalide.',
          body: "Le nombre de Paco doit ??tre au moins ??gale ?? la moiti?? de l'ench??re pr??c??dente.",
        })
      )
    else if (
      previousBid(player).value === 1 &&
      player.bid.value !== 1 &&
      player.bid.count <= previousBid(player).count * 2
    )
      dispatch(
        displayErrorMessage({
          title: 'Votre ench??re est invalide.',
          body: "Si l'ench??re pr??c??dente porte sur des Paco le nombre de d??s doit ??tre au moins ??gale au double plus 1.",
        })
      )
    else if (player.bid.value < previousBid(player).value)
      dispatch(
        displayErrorMessage({
          title: 'Votre ench??re est invalide.',
          body: "La valeur du d?? ne peut ??tre inf??rieure ?? celle de l'ench??re pr??c??dente.",
        })
      )
    else if (player.bid.count < previousBid(player).count)
      dispatch(
        displayErrorMessage({
          title: 'Votre ench??re est invalide.',
          body: "Le nombre de d??s ne peut ??tre inf??rieur ?? celui de l'ench??re pr??c??dente.",
        })
      )
    else if (
      player.bid.count !== previousBid(player).count &&
      player.bid.value !== previousBid(player).value
    )
      dispatch(
        displayErrorMessage({
          title: 'Votre ench??re est invalide.',
          body: 'Vous ne pouvez faire ??voluer que le nombre de d??s ou la valeur du d??, pas les deux en m??me temps.',
        })
      )
    else
      dispatch(
        displayErrorMessage({ title: 'Votre ench??re est invalide.', body: '' })
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
