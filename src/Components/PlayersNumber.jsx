import useGameData from '../hooks/useGameData'
import arrowIcon from '../Assets/Images/arrow.svg'

export default function PlayersNumber() {
  const { game, increasePlayersNumber, decreasePlayersNumber } = useGameData()

  return (
    <div className="playersNumber">
      <p className="playersNumber__label">Nombre de joueurs ?</p>
      <div className="playersNumber__numberContainer">
        <div className="playersNumber__number">
          {game.gameMenu.players.length}
        </div>
        <img
          onClick={() => increasePlayersNumber()}
          src={arrowIcon}
          className="playersNumber__upArrow"
          alt="Flèche haut"
        ></img>
        <img
          onClick={() => decreasePlayersNumber()}
          src={arrowIcon}
          className="playersNumber__downArrow"
          alt="Flèche bas"
        ></img>
      </div>
    </div>
  )
}
