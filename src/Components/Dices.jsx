import React from 'react'
import Dice from './Dice'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { updateDicesDisplay } from '../redux/store'

export default function Dices(props) {
  const currentPlayer = props.playerData
  const gameData = useSelector((state) => state.game)
  const dispatch = useDispatch()

  const maxDiceCount = gameData.playersMaxDiceCount

  const dicesDisabled = []
  for (let i = currentPlayer.dices.length; i < maxDiceCount; i++) {
    dicesDisabled.push(undefined)
  }

  const showDices = () => {
    dispatch(updateDicesDisplay({ player: currentPlayer, areDicesDisplayed: true }))
  }

  const hideDices = () => {
    dispatch(updateDicesDisplay({ player: currentPlayer, areDicesDisplayed: false }))
  }

  return (
    <>
      <div className="dices">
        <ul className="dices__list">
          {currentPlayer.dices.map((item) => {
            return (
              <Dice
                key={uuidv4()}
                value={item}
                isDisplayed={currentPlayer.areDicesDisplayed}
                isDisabled={false}
              />
            )
          })}
          {dicesDisabled.map((item) => {
            return (
              <Dice
                key={uuidv4()}
                value={item}
                isDisplayed={currentPlayer.areDicesDisplayed}
                isDisabled={true}
              />
            )
          })}
        </ul>
        {!currentPlayer.isComputer && currentPlayer.isActive && (
          <button
            onMouseDown={showDices}
            onMouseUp={hideDices}
            onMouseOut={hideDices}
            className={'dices__showBtn'}
          >
            Montrer
          </button>
        )}
      </div>
    </>
  )
}
