import React from 'react'
import { useSelector } from 'react-redux'
import EndTurnMessage from './EndTurnMessage'
import Header from './Header'
import Players from './Players'

export default function GameTable() {
  const game = useSelector((state) => state.game)

  return (
    <div className="gameTable">
      <Header />
      <div className="gameTable__content">
        {game.endTurnMessage.isDisplayed && <EndTurnMessage />}
        <Players />
      </div>
    </div>
  )
}
