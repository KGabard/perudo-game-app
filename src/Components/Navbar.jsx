import React from 'react'
import { useDispatch } from 'react-redux'
import useGameData from '../hooks/useGameData'
import { updateActiveMenu } from '../redux/store'

export default function Navbar() {
  const { game } = useGameData()
  const dispatch = useDispatch()

  return (
    <ul className={game.gameMenu.isDisplayed ? 'navbar active' : 'navbar'}>
      <li
        className={
          game.gameMenu.isDisplayed ? 'navbar__item active' : 'navbar__item'
        }
        onClick={() => dispatch(updateActiveMenu('game'))}
      >
        Partie
      </li>
      <li
        className="navbar__item"
        onClick={() => dispatch(updateActiveMenu('controls'))}
      >
        Commande
      </li>
      <li
        className="navbar__item"
        onClick={() => dispatch(updateActiveMenu('rules'))}
      >
        Règles
      </li>
      <li
        className="navbar__item"
        onClick={() => dispatch(updateActiveMenu('settings'))}
      >
        Options
      </li>
    </ul>
  )
}
