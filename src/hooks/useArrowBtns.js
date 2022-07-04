import { useState } from 'react'

export default function useArrowBtns() {
  const [areArrowBtnsHovered, setAreArrowBtnsHovered] = useState({
    countLeft: false,
    countRight: false,
    diceLeft: false,
    diceRight: false,
  })

  const toggleHoverTrue = (type) => {
    setAreArrowBtnsHovered({
      countLeft: false,
      countRight: false,
      diceLeft: false,
      diceRight: false,
      [type]: true,
    })
  }

  const toggleHoverFalse = () => {
    setAreArrowBtnsHovered({
      countLeft: false,
      countRight: false,
      diceLeft: false,
      diceRight: false,
    })
  }

  return {
    areArrowBtnsHovered: areArrowBtnsHovered,
    toggleHoverTrue: toggleHoverTrue,
    toggleHoverFalse: toggleHoverFalse,
  }
}
