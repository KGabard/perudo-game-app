import makeBidSoundURL from '../Assets/Audio/make-bid.wav'
import wrongSoundURL from '../Assets/Audio/wrong.wav'
import validSoundURL from '../Assets/Audio/valid.wav'
import diceRollSoundURL from '../Assets/Audio/dice-roll.wav'
import errorSoundURL from '../Assets/Audio/error.wav'
import useGameData from './useGameData'

export default function useSoundEffects() {
  const { game } = useGameData()

  const playSound = (type) => {
    let currentSound
    switch (type) {
      case 'makeBid':
        currentSound = new Audio(makeBidSoundURL)
        break
      case 'wrong':
        currentSound = new Audio(wrongSoundURL)
        break
      case 'valid':
        currentSound = new Audio(validSoundURL)
        break
      case 'error':
        currentSound = new Audio(errorSoundURL)
        break
      case 'diceRoll':
        currentSound = new Audio(diceRollSoundURL)
        break

      default:
        break
    }
    game.soundEffects.muted
      ? (currentSound.muted = true)
      : (currentSound.muted = false)
    currentSound.play()
  }

  return {
    playSound: playSound,
  }
}
