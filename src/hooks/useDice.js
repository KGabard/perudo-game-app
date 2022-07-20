import crossIcon from '../Assets/Images/CrossIcon.svg'
import plusIcon from '../Assets/Images/PlusIcon.svg'

export default function useDice(props) {
  let diceFace
  let isDisabled
  let changeIcon
  let diceClass

  switch (props.value) {
    case 1:
      diceFace = 'diceFace1'
      break
    case 2:
      diceFace = 'diceFace2'
      break
    case 3:
      diceFace = 'diceFace3'
      break
    case 4:
      diceFace = 'diceFace4'
      break
    case 5:
      diceFace = 'diceFace5'
      break
    case 6:
      diceFace = 'diceFace6'
      break

    default:
      diceFace = 'diceFaceEmpty'
      break
  }

  switch (props.isDisplayed) {
    case true:
      break

    default:
      diceFace = 'diceFaceEmpty'
      break
  }

  switch (props.isDisabled) {
    case true:
      isDisabled = 'disabled'
      break

    default:
      isDisabled = ''
      break
  }

  diceClass = 'dice ' + diceFace + ' ' + isDisabled

  switch (props.change) {
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
