import React from 'react'
import useDice from '../hooks/useDice'
import diceEmptyFace from '../Assets/Images/DiceFaceEmpty.png'

export default function Dice({
  value,
  isDisplayed,
  isDisabled,
  change,
  isBidDice,
}) {
  const { diceClass, changeIcon } = useDice({
    value,
    isDisplayed,
    isDisabled,
    change,
    isBidDice,
  })

  return (
    <div className={`dice__container${isBidDice ? ' bidDice' : ''}`}>
      <img src={diceEmptyFace} alt="dé" className={diceClass} />
      {changeIcon && (
        <img src={changeIcon} alt="modification du dé" className="dice__over" />
      )}
    </div>
  )
}
