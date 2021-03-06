import React from 'react'
import useDice from '../hooks/useDice'
import diceEmptyFace from '../Assets/Images/DiceFaceEmpty.png'

export default function Dice(props) {
  const { diceClass, changeIcon } = useDice(props)

  return (
    <div className="dice__container">
      <img
        src={diceEmptyFace}
        alt="dé"
        className={diceClass}
      />
      {changeIcon && (
        <img src={changeIcon} alt="modification du dé" className="dice__over" />
      )}
    </div>
  )
}
