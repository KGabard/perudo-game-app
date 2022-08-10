import React from 'react'
import { useDispatch } from 'react-redux'
import useGameData from '../hooks/useGameData'
import { activateMenu } from '../redux/features/gameSlice'
import { ReactComponent as HamburgerIcon } from '../Assets/Images/hamburger.svg'

export default function Navbar() {
  const { game } = useGameData()
  const dispatch = useDispatch()

  return (
    <nav
      className={
        game.gameMenu.isDisplayed ||
        game.controlsMenu.isDisplayed ||
        game.rulesMenu.isDisplayed ||
        game.settingsMenu.isDisplayed ||
        game.navigationMenu.isDisplayed
          ? 'navbar active'
          : 'navbar'
      }
    >
      <HamburgerIcon
        className={
          game.gameMenu.isDisplayed ||
          game.controlsMenu.isDisplayed ||
          game.rulesMenu.isDisplayed ||
          game.settingsMenu.isDisplayed ||
          game.navigationMenu.isDisplayed
            ? 'navbar__hamburger active'
            : 'navbar__hamburger'
        }
        onClick={() => dispatch(activateMenu('navigation'))}
      />
      <ul className="navbar__menusList">
        <li
          className={
            game.gameMenu.isDisplayed ? 'navbar__link active' : 'navbar__link'
          }
          onClick={() => dispatch(activateMenu('game'))}
        >
          Partie
        </li>
        <li
          className={
            game.controlsMenu.isDisplayed
              ? 'navbar__link active'
              : 'navbar__link'
          }
          onClick={() => dispatch(activateMenu('controls'))}
        >
          Commande
        </li>
        <li
          className={
            game.rulesMenu.isDisplayed ? 'navbar__link active' : 'navbar__link'
          }
          onClick={() => dispatch(activateMenu('rules'))}
        >
          Règles
        </li>
        <li
          className={
            game.settingsMenu.isDisplayed
              ? 'navbar__link active'
              : 'navbar__link'
          }
          onClick={() => dispatch(activateMenu('settings'))}
        >
          Options
        </li>
      </ul>
    </nav>
  )
}
