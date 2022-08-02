import React from 'react'
import Dice from './Dice'
import { v4 as uuidv4 } from 'uuid'
import useDices from '../hooks/useDices'

export default function Dices(props) {
  const currentPlayer = props.playerData
  const { disabledDices, showDices, hideDices } = useDices()

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
                isBidDice={false}
              />
            )
          })}
          {disabledDices(currentPlayer).map((item, index) => {
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
                isBidDice={false}
              />
            )
          })}
        </ul>
        {!currentPlayer.isComputer && currentPlayer.isActive && (
          <button
            onMouseDown={() => showDices(currentPlayer)}
            onMouseUp={() => hideDices(currentPlayer)}
            onMouseOut={() => hideDices(currentPlayer)}
            className={'dices__showBtn'}
          >
            Montrer
          </button>
        )}
      </div>
    </>
  )
}
