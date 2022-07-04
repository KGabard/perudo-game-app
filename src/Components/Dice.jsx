import React from 'react'
import useDice from '../hooks/useDice'

export default function Dice(props) {
  const { diceFace, isDisabled, changeIcon } = useDice(props)

  return (
    <div className="dice__container">
      <img
        src={diceFace}
        alt="dé"
        className={isDisabled ? 'dice disabled' : 'dice'}
      />
      {changeIcon && (
        <img src={changeIcon} alt="modification du dé" className="dice__over" />
      )}
    </div>
  )
}
