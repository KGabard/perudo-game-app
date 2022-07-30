import React from 'react'
import { useDispatch } from 'react-redux'
import { activateMenu } from '../redux/features/gameSlice'

export default function NewGameBtn({ addedClass }) {
  const dispatch = useDispatch()

  return (
    <div
      className={`newGameBtn ${addedClass}`}
      onClick={() => dispatch(activateMenu('game'))}
    >
      Nouvelle Partie
    </div>
  )
}
