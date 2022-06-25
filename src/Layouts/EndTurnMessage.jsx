import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  hideEndTurnMessage,
  expandEndTurnMessage,
  updateHasToReset,
  updateHasToPlay,
  incrementTurnCounter,
} from '../redux/store'

export default function EndTurnMessage() {
  const activePlayers = useSelector((state) => state.players.activePlayers)
  const game = useSelector((state) => state.game)
  const dispatch = useDispatch()

  const ref = useRef()

  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }, [])

  let className = 'endTurnMessage'
  game.endTurnMessage.isWrong
    ? (className += ' wrong')
    : (className += ' right')
  game.endTurnMessage.isExpanded && (className += ' expanded')

  const nextTurn = () => {
    activePlayers.forEach((item) => {
      dispatch(updateHasToReset({ player: item, hasToReset: true }))
      item.isWrong &&
        dispatch(updateHasToPlay({ player: item, hasToPlay: true }))
      item.isRight &&
        dispatch(updateHasToPlay({ player: item, hasToPlay: true }))
    })
    dispatch(hideEndTurnMessage())
    dispatch(incrementTurnCounter())
    
  }

  return (
    <div ref={ref} className={className}>
      <h1 className="endTurnMessage__header">{game.endTurnMessage.header}</h1>
      <div className="endTurnMessage__titleContainer">
        <h2 className="endTurnMessage__title">{game.endTurnMessage.title}</h2>
        <p className="endTurnMessage__subtitle">
          {game.endTurnMessage.subtitle}
        </p>
        {!game.endTurnMessage.isExpanded && (
          <div
            onClick={() => {
              dispatch(expandEndTurnMessage())
            }}
            className="endTurnMessage__expandBtn"
          >
            Détails
          </div>
        )}
      </div>
      <p className="endTurnMessage__body">{game.endTurnMessage.body}</p>
      <div
        onClick={() => {
          nextTurn()
        }}
        className="endTurnMessage__nextTurnBtn"
      >
        Tour suivant
      </div>
    </div>
  )
}
