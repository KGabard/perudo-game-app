import useGameData from './useGameData'
import usePlayersData from './usePlayersData'

export default function useProbability() {
  const { totalPlayersDices } = usePlayersData()
  const { game } = useGameData()

  // MATH ET PROBA :
  // En langage mathématique, on dirait que le coefficients binomial Cb{n,k} (que l’on prononce « k parmi n » ou « combinaison de k parmi n »), donne donc le nombre de parties de k éléments dans un ensemble total de n éléments, avec k ≤ n, (ce qui revient à dire que le coefficient binomial est le nombre de chemins conduisant à k succès).
  // Cb{n,k} = n! / ((n-k)! * k!) avec !x -> factorial de x
  // Probabilité de k succès pour n tirages dont les issus sont k (avec la probabilité Pk) et nonk (avec la probabilité Pnonk) :
  // P = Cb{n,k} * Pk^k * Pnonk^(n-k)

  const factorial = (x) => {
    let result = 1
    for (let i = 1; i <= x; i++) {
      result *= i
    }
    return result
  }

  const binomialCoefficient = (n, k) => {
    //Nombre de k succès parmi n tirages
    return factorial(n) / (factorial(n - k) * factorial(k))
  }

  const Probability_k_among_n = (n, k, probaK, probaNonK) => {
    //Probabilité de k succès parmi n tirages
    return (
      binomialCoefficient(n, k) *
      Math.pow(probaK, k) *
      Math.pow(probaNonK, n - k)
    )
  }

  const bidProbability = (bid, knownDices = [], type) => {
    let probability = 0
    let nbOfUnknowDices = totalPlayersDices - knownDices.length
    let minNbOfBidDiceAmongUnknowDices = bid.count
    let winProbability = 0
    let looseProbability = 0

    if (game.isPalifico || bid.value === 1) {
      for (let dice of knownDices) {
        if (dice === bid.value) minNbOfBidDiceAmongUnknowDices--
      }
      winProbability = 1 / 6
      looseProbability = 5 / 6
    } else {
      for (let dice of knownDices) {
        if (dice === bid.value || dice === 1) minNbOfBidDiceAmongUnknowDices--
      }
      winProbability = 2 / 6
      looseProbability = 4 / 6
    }

    switch (type) {
      case 'exact':
        if (minNbOfBidDiceAmongUnknowDices < 0) return 0
        probability = Probability_k_among_n(
          nbOfUnknowDices,
          minNbOfBidDiceAmongUnknowDices,
          winProbability,
          looseProbability
        )
        break

      default:
        if (minNbOfBidDiceAmongUnknowDices <= 0) return 100
        for (
          let nbOfWin = minNbOfBidDiceAmongUnknowDices;
          nbOfWin <= nbOfUnknowDices;
          nbOfWin++
        ) {
          probability += Probability_k_among_n(
            nbOfUnknowDices,
            nbOfWin,
            winProbability,
            looseProbability
          )
        }
        break
    }

    probability = Math.round(probability * 10000) / 100

    return probability
  }

  return { bidProbability: bidProbability }
}
