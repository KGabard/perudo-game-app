import React from 'react'
import diceFaceEmpty from '../Assets/Images/DiceFaceEmpty.png'
import diceFace1 from '../Assets/Images/DiceFace1.png'
import diceFace2 from '../Assets/Images/DiceFace2.png'
import diceFace3 from '../Assets/Images/DiceFace3.png'
import diceFace4 from '../Assets/Images/DiceFace4.png'
import diceFace5 from '../Assets/Images/DiceFace5.png'
import diceFace6 from '../Assets/Images/DiceFace6.png'
import crossIcon from '../Assets/Images/CrossIcon.svg'
import plusIcon from '../Assets/Images/PlusIcon.svg'

export default function Dice(props) {
  let diceFace
  let isDisabled
  let changeIcon

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

  switch (props.change) {
    case 'x':
      changeIcon = crossIcon
      break;
    case '+':
      changeIcon = plusIcon
      break;
  
    default:
      changeIcon = undefined
      break;
  }

  return (
    <div className="dice__container">
      <img
        src={diceFace}
        alt="dé"
        className={isDisabled ? 'dice disabled' : 'dice'}
      />
      {changeIcon && <img src={changeIcon} alt="modification du dé" 
        className='dice__over'/>}
    </div>
  )
}
