import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import useEndTurnMessage from '../hooks/useEndTurnMessage'
import useGameData from '../hooks/useGameData'
import { expandEndTurnMessage } from '../redux/store'

export default function EndTurnMessage() {
  const { game } = useGameData()
  const { nextTurn } = useEndTurnMessage()

  const dispatch = useDispatch()

  const ref = useRef()

  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }, [])

  let className = 'endTurnMessage'
  game.endTurnMessage.isWrong && (className += ' wrong')
  game.endTurnMessage.isRight && (className += ' right')
  game.endTurnMessage.isExpanded && (className += ' expanded')

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
