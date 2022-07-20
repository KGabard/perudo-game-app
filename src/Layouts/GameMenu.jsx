import { useDispatch } from 'react-redux'
import PlayerForm from '../Components/PlayerForm'
import PlayersNumber from '../Components/PlayersNumber'
import useGameData from '../hooks/useGameData'
import { hideGameMenu, setNewPlayers, updateIsOver } from '../redux/store'
import { v4 as uuidv4 } from 'uuid'
import usePlayersData from '../hooks/usePlayersData'
import useResetPlayers from '../hooks/useResetPlayers'
import { useEffect, useState } from 'react'

export default function GameMenu() {
  const dispatch = useDispatch()
  const { game } = useGameData()
  const { activePlayers } = usePlayersData()
  const { resetPlayer } = useResetPlayers()

  const [gameHasToStart, setGameHasToStart] = useState(false)

  const startGame = () => {
    dispatch(setNewPlayers(game.gameMenu.players))
    dispatch(updateIsOver(false))
    setGameHasToStart(true)
  }

  useEffect(() => {
    if (gameHasToStart) {
      activePlayers.forEach((item) => {
        resetPlayer(item)
      })
      closeGameMenu()
      // setGameHasToStart(false)
    }
  }, [gameHasToStart])

  const closeGameMenu = () => {
    dispatch(hideGameMenu())
  }

  return (
    <div className="gameMenu">
      <div onClick={closeGameMenu} className="gameMenu__overlay"></div>
      <div className="gameMenu__window">
        <h1 className="gameMenu__header">Nouvelle Partie !</h1>
        <PlayersNumber />
        {game.gameMenu.players.map((item, index) => {
          return <PlayerForm key={uuidv4()} playerIndex={index} />
        })}
        <div onClick={startGame} className="gameMenu__okBtn">
          ok
        </div>
      </div>
    </div>
  )
}
