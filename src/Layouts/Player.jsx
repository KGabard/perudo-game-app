import React, { useRef } from 'react'
import Dices from '../Components/Dices'
import Bid from '../Components/Bid'
import ActionBar from '../Components/ActionBar'

export default function Player(props) {
  const currentPlayer = props.playerData

  const ref = useRef()

  let className = 'player'
  currentPlayer.isActive && (className += ' active')
  !currentPlayer.isComputer && (className += ' human')
  currentPlayer.isWrong && (className += ' wrong')
  currentPlayer.isRight && (className += ' right')

  return (
    <>
      <div ref={ref} className={className}>
        <div className="player__grid">
          <div className="player__header">
            <img
              src={currentPlayer.avatar}
              alt="Logo du joueur"
              className="player__header__avatar"
            />
            <h1 className="player__header__name">{currentPlayer.name}</h1>
          </div>
          <div className={'player__separator'}></div>
          <div className="player__bidTitle">
            <h2>Enchère</h2>
          </div>
          <Dices playerData={currentPlayer} />
          <Bid playerData={currentPlayer} />
        </div>
        <ActionBar playerData={currentPlayer} panelRef={ref} />
      </div>
    </>
  )
}
