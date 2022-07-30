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
import { updateIsPause } from './redux/features/gameSlice'

function App() {
  const [homePageActive, setHomePageActive] = useState(true)
  const [gameTableActive, setGameTableActive] = useState(false)
  const { game } = useGameData()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(updateIsPause())
  }, [
    dispatch,
    game.errorMessage.isDisplayed,
    game.endTurnMessage.isDisplayed,
    game.gameMenu.isDisplayed,
    game.controlsMenu.isDisplayed,
    game.rulesMenu.isDisplayed,
    game.settingsMenu.isDisplayed,
  ])

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
