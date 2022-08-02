import { useState } from 'react'
import { useEffect } from 'react'
import crossIcon from '../Assets/Images/CrossIcon.svg'
import plusIcon from '../Assets/Images/PlusIcon.svg'
import useGameData from './useGameData'

export default function useDice({
  value,
  isDisplayed,
  isDisabled,
  change,
  isBidDice,
}) {
  let diceFace
  let changeIcon
  let diceClass

  const [diceValue, setDiceValue] = useState(value)
  const [rollInterval, setRollInterval] = useState(10)
  const [rollEvolCoef, setRollEvolCoef] = useState(1)

  const { game } = useGameData()

  useEffect(() => {
    if (game.dicesAreRolling) {
      setRollEvolCoef(Math.random() * 2.5 + 1.1)
    }
  }, [game.dicesAreRolling])

  useEffect(() => {
    let rolling
    if (game.dicesAreRolling && !isBidDice && !isDisabled) {
      rolling = setTimeout(() => {
        let newValue
        do {
          newValue = Math.ceil(Math.random() * 5)
        } while (newValue === diceValue)
        setDiceValue(newValue)
        setRollInterval(rollInterval * rollEvolCoef)
      }, rollInterval)
    }
    return () => clearTimeout(rolling)
  }, [diceValue])

  isNaN(diceValue) || !isDisplayed
    ? (diceFace = 'diceFaceEmpty')
    : (diceFace = `diceFace${diceValue}`)

  diceClass = 'dice ' + diceFace

  isDisabled ? (diceClass += ' disabled') : (diceClass += '')

  switch (change) {
    case 'x':
      changeIcon = crossIcon
      break
    case '+':
      changeIcon = plusIcon
      break

    default:
      changeIcon = undefined
      break
  }

  return {
    diceClass: diceClass,
    changeIcon: changeIcon,
  }
}