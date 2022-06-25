import React from 'react'
import Dice from './Dice'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { updateDicesDisplay } from '../redux/store'

export default function Dices(props) {
  const currentPlayer = props.playerData
  const game = useSelector((state) => state.game)
  const dispatch = useDispatch()

  const maxDiceCount = game.playersMaxDiceCount

  const dicesDisabled = []
  for (let i = currentPlayer.dices.length; i < maxDiceCount; i++) {
    dicesDisabled.push(undefined)
  }

  const showDices = () => {
    if (game.isPause) return
    dispatch(
      updateDicesDisplay({ player: currentPlayer, areDicesDisplayed: true })
    )
  }

  const hideDices = () => {
    if (game.isPause) return
    dispatch(
      updateDicesDisplay({ player: currentPlayer, areDicesDisplayed: false })
    )
  }

  return (
    <>
      <div className="dices">
        <ul className="dices__list">
          {currentPlayer.dices.map((item, index) => {
            return (
              <Dice
                key={uuidv4()}
                value={item}
                isDisplayed={currentPlayer.areDicesDisplayed}
                isDisabled={false}
                change={
                  currentPlayer.diceChanges && currentPlayer.diceChanges[index]
                }
              />
            )
          })}
          {dicesDisabled.map((item, index) => {
            return (
              <Dice
                key={uuidv4()}
                value={item}
                isDisplayed={currentPlayer.areDicesDisplayed}
                isDisabled={true}
                change={
                  currentPlayer.diceChanges &&
                  currentPlayer.diceChanges[index + currentPlayer.dices.length]
                }
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
