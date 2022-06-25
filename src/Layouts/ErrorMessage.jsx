import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideErrorMessage, updateHasToPlay } from '../redux/store'

export default function ErrorMessage() {
  const activePlayers = useSelector((state) => state.players.activePlayers)
  const game = useSelector((state) => state.game)
  const dispatch = useDispatch()

  const closeErrorMessage = () => {
    activePlayers.forEach((item) => {
      item.isActive &&
        dispatch(updateHasToPlay({ player: item, hasToPlay: true }))
    })
    dispatch(hideErrorMessage())
  }

  return (
    <div className="errorMessage">
      <div onClick={closeErrorMessage} className="errorMessage__overlay"></div>
      <div className="errorMessage__window">
        <h1 className="errorMessage__header">Erreur !</h1>
        <h2 className="errorMessage__title">{game.errorMessage.title}</h2>
        <p className="errorMessage__body">{game.errorMessage.body}</p>
        <div onClick={closeErrorMessage} className="errorMessage__okBtn">
          ok
        </div>
      </div>
    </div>
  )
}
