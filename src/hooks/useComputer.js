import useBidData from './useBidData'

export default function useComputer() {
  const { currentBid, setBidCount, setBidValue } = useBidData()

  const computerPlay = (player) => {
    let computerBidCount
    let computerBidValue
    let computerPlay

    currentBid().count
      ? (computerBidCount = currentBid().count + 1)
      : (computerBidCount = 1)
    currentBid().value
      ? (computerBidValue = currentBid().value)
      : (computerBidValue = 2)

    setBidCount(player, computerBidCount)
    setBidValue(player, computerBidValue)

    Math.random() > 0.2
      ? (computerPlay = { isPlaying: true, payload: 'makeBid' })
      : Math.random() > 0.2
      ? (computerPlay = { isPlaying: true, payload: 'dudo' })
      : (computerPlay = { isPlaying: true, payload: 'calza' })

    return computerPlay
  }

  return { computerPlay: computerPlay }
}
