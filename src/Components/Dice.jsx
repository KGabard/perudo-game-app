import React from 'react'
import diceFaceEmpty from '../Assets/Images/DiceFaceEmpty.png'
import diceFace1 from '../Assets/Images/DiceFace1.png'
import diceFace2 from '../Assets/Images/DiceFace2.png'
import diceFace3 from '../Assets/Images/DiceFace3.png'
import diceFace4 from '../Assets/Images/DiceFace4.png'
import diceFace5 from '../Assets/Images/DiceFace5.png'
import diceFace6 from '../Assets/Images/DiceFace6.png'

export default function Dice(props) {
  let diceFace
  let isDisabled

  switch (props.value) {
    case 1:
      diceFace = diceFace1
      break
    case 2:
      diceFace = diceFace2
      break
    case 3:
      diceFace = diceFace3
      break
    case 4:
      diceFace = diceFace4
      break
    case 5:
      diceFace = diceFace5
      break
    case 6:
      diceFace = diceFace6
      break

    default:
      diceFace = diceFaceEmpty
      break
  }

  switch (props.isDisplayed) {
    case true:
      break

    default:
      diceFace = diceFaceEmpty
      break
  }

  switch (props.isDisabled) {
    case true:
      isDisabled = true
      break

    default:
      isDisabled = false
      break
  }

  return (
    <img
      src={diceFace}
      alt="dé"
      className={isDisabled ? 'dice disabled' : 'dice'}
    />
  )
}
