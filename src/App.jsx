import './Styles/main.scss'
import Footer from './Layouts/Footer'
import GameTable from './Layouts/GameTable'
import { useDispatch } from 'react-redux'
import ErrorMessage from './Layouts/ErrorMessage'
import { updateIsPause } from './redux/store'
import { useEffect } from 'react'
import useGameData from './hooks/useGameData'
import GameMenu from './Layouts/GameMenu'
import ControlsMenu from './Layouts/ControlsMenu'
import RulesMenu from './Layouts/RulesMenu'
import SettingsMenu from './Layouts/SettingsMenu'
import useMusic from './hooks/useMusic'
import usePlayersData from './hooks/usePlayersData'

function App() {
  const { game } = useGameData()

  const {eliminatedPlayers} = usePlayersData()
  useEffect(() => {
    console.log("Eliminated players :");
    console.log(eliminatedPlayers);
  }, [eliminatedPlayers])

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(updateIsPause())
  }, [dispatch, game.errorMessage.isDisplayed, game.endTurnMessage.isDisplayed])

  useMusic()

  return (
    <>
      <div className="app">
        {game.errorMessage.isDisplayed && <ErrorMessage />}
        {game.gameMenu.isDisplayed && <GameMenu />}
        {game.controlsMenu.isDisplayed && <ControlsMenu />}
        {game.rulesMenu.isDisplayed && <RulesMenu />}
        {game.settingsMenu.isDisplayed && <SettingsMenu />}
        <GameTable />
        <Footer />
      </div>
    </>
  )
}

export default App
