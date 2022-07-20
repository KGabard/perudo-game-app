import './Styles/main.scss'
import Footer from './Layouts/Footer'
import GameTable from './Layouts/GameTable'
import { useDispatch } from 'react-redux'
import ErrorMessage from './Layouts/ErrorMessage'
import { updateIsPause } from './redux/store'
import { useEffect } from 'react'
import useGameData from './hooks/useGameData'
import GameMenu from './Layouts/GameMenu'

function App() {
  const { game } = useGameData()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(updateIsPause())
  }, [dispatch, game.errorMessage.isDisplayed, game.endTurnMessage.isDisplayed])

  return (
    <>
      <div className="app">
        {game.errorMessage.isDisplayed && <ErrorMessage />}
        {game.gameMenu.isDisplayed && <GameMenu />}
        <GameTable />
        <Footer />
      </div>
    </>
  )
}

export default App
