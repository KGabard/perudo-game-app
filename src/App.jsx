import './Styles/main.scss'
import Footer from './Layouts/Footer'
import GameTable from './Layouts/GameTable'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from './Layouts/ErrorMessage'
import { updatePause } from './redux/store'
import { useEffect } from 'react'
import useTest from './hooks/test'

function App() {
  const activePlayers = useSelector((state) => state.players.activePlayers)
  const game = useSelector((state) => state.game)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(updatePause())
  }, [game.errorMessage.isDisplayed, game.endTurnMessage.isDisplayed])

  // activePlayers.forEach((item) => {
  //   console.log(`${item.name} doit jouer ? ${item.hasToPlay}`)
  // })
  // console.log('')

  return (
    <>
      <div className="app">
        {game.errorMessage.isDisplayed && <ErrorMessage />}
        <GameTable />
        <Footer />
      </div>
    </>
  )
}

export default App
