import './Styles/main.scss'
import Footer from './Layouts/Footer'
import GameTable from './Layouts/GameTable'
import { useDispatch } from 'react-redux'
import ErrorMessage from './Layouts/ErrorMessage'
import { useEffect } from 'react'
import useGameData from './hooks/useGameData'
import GameMenu from './Layouts/GameMenu'
import ControlsMenu from './Layouts/ControlsMenu'
import RulesMenu from './Layouts/RulesMenu'
import SettingsMenu from './Layouts/SettingsMenu'
import useMusic from './hooks/useMusic'
import { useState } from 'react'
import HomePage from './Layouts/HomePage'
import {
  updateDicesAreRolling,
  updateIsPause,
} from './redux/features/gameSlice'
import usePlayersData from './hooks/usePlayersData'
import { updateHasToPlay } from './redux/features/playersSlice'
import useSoundEffects from './hooks/useSoundEffects'
import useDices from './hooks/useDices'

function App() {
  const [homePageActive, setHomePageActive] = useState(true)
  const [gameTableActive, setGameTableActive] = useState(false)
  const { game } = useGameData()
  const { activePlayers } = usePlayersData()
  const { hidePlayersDices, showPlayersDices } = useDices()

  const { playSound } = useSoundEffects()

  const dispatch = useDispatch()
  useEffect(() => {
    game.errorMessage.isDisplayed ||
    game.endTurnMessage.isDisplayed ||
    game.gameMenu.isDisplayed ||
    game.controlsMenu.isDisplayed ||
    game.rulesMenu.isDisplayed ||
    game.settingsMenu.isDisplayed ||
    game.dicesAreRolling
      ? dispatch(updateIsPause(true))
      : dispatch(updateIsPause(false))
  }, [
    dispatch,
    game.errorMessage.isDisplayed,
    game.endTurnMessage.isDisplayed,
    game.gameMenu.isDisplayed,
    game.controlsMenu.isDisplayed,
    game.rulesMenu.isDisplayed,
    game.settingsMenu.isDisplayed,
    game.dicesAreRolling,
  ])

  useEffect(() => {
    if (game.dicesAreRolling && !game.isOver && activePlayers.length > 1) {
      playSound('diceRoll')
      showPlayersDices()
      setTimeout(() => {
        hidePlayersDices()
        dispatch(updateDicesAreRolling(false))
      }, 1200)
    }
  }, [game.dicesAreRolling])

  useMusic()

  return (
    <>
      <div className="app">
        {homePageActive && (
          <HomePage
            setHomePageActive={setHomePageActive}
            setGameTableActive={setGameTableActive}
          />
        )}
        {game.errorMessage.isDisplayed && <ErrorMessage />}
        {game.gameMenu.isDisplayed && <GameMenu />}
        {game.controlsMenu.isDisplayed && <ControlsMenu />}
        {game.rulesMenu.isDisplayed && <RulesMenu />}
        {game.settingsMenu.isDisplayed && <SettingsMenu />}
        {gameTableActive && <GameTable />}
        {gameTableActive && <Footer />}
      </div>
    </>
  )
}

export default App
