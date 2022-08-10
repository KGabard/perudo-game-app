import useBidData from './useBidData'
import useGameData from './useGameData'
import useProbability from './useProbability'

export default function useComputer() {
  const { game } = useGameData()
  const { previousBid, setBidCount, setBidValue } = useBidData()
  const { bidProbability } = useProbability()

  const bluffDices = (knownDices = []) => {
    if (!game.computerBluff) return knownDices

    const bluffDices = []
    const bluffCoef = (Math.pow(Math.random(), 2) + Math.random() * 0.8) * 0.4

    knownDices.forEach((dice) => {
      if (Math.random() <= bluffCoef) {
        let bluffDice
        do {
          bluffDice = Math.ceil(Math.random() * 6)
        } while (bluffDice === dice)
        bluffDices.push(bluffDice)
      } else {
        bluffDices.push(dice)
      }
    })

    return bluffDices
  }

  const computerPlay = (player) => {
    let computerBidCount
    let computerBidValue
    let computerPlay
    const dices = bluffDices(player.dices)

    console.log(`Current player: ${player.name}`)
    console.log('')
    console.log(
      `Previous bid - count: ${previousBid(player).count}, dice: ${
        previousBid(player).value
      }`
    )
    console.log(`Current dices: ${player.dices}`)
    console.log(`Bluff dices:   ${dices}`)

    console.log(' ')
    console.log('Probabilities:')
    if (previousBid(player).value === undefined) {
      let currentBidProbability = 0
      for (let tempBidValue = 1; tempBidValue <= 6; tempBidValue++) {
        let tempBidCount = 0
        let tempBidProbability = 0
        tempBidCount = 1
        tempBidProbability = bidProbability(
          { count: tempBidCount, value: tempBidValue },
          dices
        )

        if (tempBidValue === 1) {
          currentBidProbability = tempBidProbability
          computerBidCount = tempBidCount
          computerBidValue = tempBidValue
        }

        if (tempBidProbability > currentBidProbability) {
          currentBidProbability = tempBidProbability
          computerBidCount = tempBidCount
          computerBidValue = tempBidValue
        } else if (tempBidProbability === currentBidProbability) {
          if (Math.random() > 0.5) {
            //Permet d'introduire un peu d'aléatoire sinon il est aisé de deviné au moins un dé de l'ordinateur
            currentBidProbability = tempBidProbability
            computerBidCount = tempBidCount
            computerBidValue = tempBidValue
          }
        }

        console.log(
          `count: ${tempBidCount}, dice: ${tempBidValue}, proba: ${tempBidProbability}`
        )
      }

      console.log(' ')
      console.log('Decision:')
      console.log(
        `Make bid - count: ${computerBidCount},  dice: ${computerBidValue}`
      )

      setBidCount(player, computerBidCount)
      setBidValue(player, computerBidValue)
      computerPlay = { isPlaying: true, payload: 'makeBid' }
    } else {
      let currentBidProbability = 0
      if (game.isPalifico) {
        computerBidCount = previousBid(player).count + 1
        computerBidValue = previousBid(player).value
        currentBidProbability = bidProbability(
          { count: computerBidCount, value: computerBidValue },
          dices
        )
        console.log(
          `count: ${computerBidCount}, dice: ${computerBidValue}, proba: ${currentBidProbability}`
        )
      } else {
        for (let tempBidValue = 1; tempBidValue <= 6; tempBidValue++) {
          let tempBidCount = 0
          let tempBidProbability = 0
          tempBidCount = previousBid(player).count
          if (tempBidValue === previousBid(player).value)
            tempBidCount = previousBid(player).count + 1
          else {
            if (tempBidValue === 1 && previousBid(player).value !== 1)
              tempBidCount = Math.ceil(previousBid(player).count / 2)
            if (tempBidValue !== 1 && previousBid(player).value === 1)
              tempBidCount = previousBid(player).count * 2 + 1
          }
          tempBidProbability = bidProbability(
            { count: tempBidCount, value: tempBidValue },
            dices
          )

          if (tempBidValue === 1 || tempBidValue >= previousBid(player).value) {
            console.log(
              `count: ${tempBidCount}, dice: ${tempBidValue}, proba: ${tempBidProbability}`
            )
          }

          if (tempBidProbability > currentBidProbability) {
            if (
              tempBidValue === 1 ||
              tempBidValue >= previousBid(player).value
            ) {
              currentBidProbability = tempBidProbability
              computerBidCount = tempBidCount
              computerBidValue = tempBidValue
            }
          }
        }
      }

      const dudoProbability =
        Math.round(
          (100 - bidProbability(previousBid(player), player.dices)) * 100
        ) / 100

      const calzaProbability = bidProbability(
        previousBid(player),
        player.dices,
        'exact'
      )

      const maxProbability = Math.max(
        currentBidProbability,
        dudoProbability,
        calzaProbability
      )

      console.log(' ')
      console.log('Options:')
      console.log(`Make bid max proba : ${currentBidProbability}`)
      console.log(`Dudo proba : ${dudoProbability}`)
      console.log(`Calza proba : ${calzaProbability}`)

      console.log(' ')
      console.log('Decision:')
      switch (maxProbability) {
        case currentBidProbability:
          setBidCount(player, computerBidCount)
          setBidValue(player, computerBidValue)
          computerPlay = { isPlaying: true, payload: 'makeBid' }
          console.log(
            `Make bid - count: ${computerBidCount},  dice: ${computerBidValue}`
          )
          break
        case calzaProbability:
          computerPlay = { isPlaying: true, payload: 'calza' }
          console.log('Calza')
          break
        case dudoProbability:
          computerPlay = { isPlaying: true, payload: 'dudo' }
          console.log('Dudo')
          break

        default:
          break
      }
    }

    console.log('______________')

    return computerPlay
  }

  return { computerPlay: computerPlay }
}
