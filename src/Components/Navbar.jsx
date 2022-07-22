import React from 'react'
import { useDispatch } from 'react-redux'
import useGameData from '../hooks/useGameData'
import { activateMenu } from '../redux/store'

export default function Navbar() {
  const { game } = useGameData()
  const dispatch = useDispatch()

  return (
    <ul
      className={
        game.gameMenu.isDisplayed ||
        game.controlsMenu.isDisplayed ||
        game.rulesMenu.isDisplayed ||
        game.settingsMenu.isDisplayed
          ? 'navbar active'
          : 'navbar'
      }
    >
      <li
        className={
          game.gameMenu.isDisplayed ? 'navbar__item active' : 'navbar__item'
        }
        onClick={() => dispatch(activateMenu('game'))}
      >
        Partie
      </li>
      <li
        className={
          game.controlsMenu.isDisplayed ? 'navbar__item active' : 'navbar__item'
        }
        onClick={() => dispatch(activateMenu('controls'))}
      >
        Commande
      </li>
      <li
        className={
          game.rulesMenu.isDisplayed ? 'navbar__item active' : 'navbar__item'
        }
        onClick={() => dispatch(activateMenu('rules'))}
      >
        Règles
      </li>
      <li
        className={
          game.settingsMenu.isDisplayed ? 'navbar__item active' : 'navbar__item'
        }
        onClick={() => dispatch(activateMenu('settings'))}
      >
        Options
      </li>
    </ul>
  )
}
