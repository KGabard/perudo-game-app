import React, { useState } from 'react'
import Dice from './Dice'
import arrowBtn from '../Assets/Images/white-arrow.png'
import arrowBtnHover from '../Assets/Images/blue-arrow.png'
import { useSelector, useDispatch } from 'react-redux'
import { updateBidCount } from '../redux/store'
import { updateBidValue } from '../redux/store'
import { v4 as uuidv4 } from 'uuid'

export default function Bid(props) {
  const [areArrowBtnsHovered, setAreArrowBtnsHovered] = useState({
    countLeft: false,
    countRight: false,
    diceLeft: false,
    diceRight: false,
  })

  const playersData = useSelector((state) => state.players)
  const currentPlayer = props.playerData
  const dispatch = useDispatch()

  const maxDiceCount = playersData.reduce((acc, item) => {
    return acc + item.dices.length
  }, 0)

  const areArrowBtnsDisplayed = currentPlayer.isComputer
    ? false
    : currentPlayer.isActive
    ? true
    : false

  const increaseBidCount = () => {
    let newCount = undefined
    isNaN(currentPlayer.bid.count)
      ? (newCount = 1)
      : currentPlayer.bid.count < maxDiceCount
      ? (newCount = currentPlayer.bid.count + 1)
      : (newCount = maxDiceCount)
    dispatch(updateBidCount({ player: currentPlayer, bidCount: newCount }))
  }

  const decreaseBidCount = () => {
    let newCount = undefined
    isNaN(currentPlayer.bid.count)
      ? (newCount = 1)
      : currentPlayer.id.count > 1
      ? (newCount = currentPlayer.bid.count - 1)
      : (newCount = 1)
    dispatch(updateBidCount({ player: currentPlayer, bidCount: newCount }))
  }

  const increaseBidValue = () => {
    let newValue = undefined
    isNaN(currentPlayer.bid.value)
      ? (newValue = 1)
      : currentPlayer.bid.value < 6
      ? (newValue = currentPlayer.bid.value + 1)
      : (newValue = 1)
    dispatch(updateBidValue({ player: currentPlayer, bidValue: newValue }))
  }

  const decreaseBidValue = () => {
    let newValue = undefined
    isNaN(currentPlayer.bid.value)
      ? (newValue = 1)
      : currentPlayer.bid.value > 1
      ? (newValue = currentPlayer.bid.value - 1)
      : (newValue = 6)
    dispatch(updateBidValue({ player: currentPlayer, bidValue: newValue }))
  }

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

  return (
    <div className="bid">
      <div className="bid__countContainer">
        <div className="bid__count">
          {currentPlayer.bid.count ? currentPlayer.bid.count : ''}
        </div>
        {areArrowBtnsDisplayed && (
          <img
            onMouseOver={() => toggleHoverTrue('countLeft')}
            onMouseOut={() => toggleHoverFalse()}
            onClick={() => decreaseBidCount()}
            src={areArrowBtnsHovered.countLeft ? arrowBtnHover : arrowBtn}
            className="bid__countLeftArrow"
            alt="Flèche gauche"
          ></img>
        )}
        {areArrowBtnsDisplayed && (
          <img
            onMouseOver={() => toggleHoverTrue('countRight')}
            onMouseOut={() => toggleHoverFalse()}
            onClick={() => increaseBidCount()}
            src={areArrowBtnsHovered.countRight ? arrowBtnHover : arrowBtn}
            className="bid__countRightArrow"
            alt="Flèche droite"
          ></img>
        )}
      </div>
      <div className="bid__diceContainer">
        <Dice
          key={uuidv4()}
          value={currentPlayer.bid.value}
          isDisplayed={true}
          isDisabled={false}
        />
        {areArrowBtnsDisplayed && (
          <img
            onMouseOver={() => toggleHoverTrue('diceLeft')}
            onMouseOut={() => toggleHoverFalse()}
            onClick={() => decreaseBidValue()}
            src={areArrowBtnsHovered.diceLeft ? arrowBtnHover : arrowBtn}
            className="bid__diceLeftArrow"
            alt="Flèche gauche"
          ></img>
        )}
        {areArrowBtnsDisplayed && (
          <img
            onMouseOver={() => toggleHoverTrue('diceRight')}
            onMouseOut={() => toggleHoverFalse()}
            onClick={() => increaseBidValue()}
            src={areArrowBtnsHovered.diceRight ? arrowBtnHover : arrowBtn}
            className="bid__diceRightArrow"
            alt="Flèche droite"
          ></img>
        )}
      </div>
    </div>
  )
}
