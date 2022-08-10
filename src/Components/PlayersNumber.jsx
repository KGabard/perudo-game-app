import { ReactComponent as ArrowIcon } from '../Assets/Images/arrow.svg'

export default function PlayersNumber({
  playersNumber,
  addPlayer,
  removePlayer,
}) {
  return (
    <div className="playersNumber">
      <p className="playersNumber__label">Nombre de joueurs ?</p>
      <div className="playersNumber__numberContainer">
        <div className="playersNumber__number">{playersNumber}</div>
        <ArrowIcon
          onClick={() => addPlayer()}
          className="playersNumber__secondArrow"
          alt="Flèche haut"
        />
        <ArrowIcon
          onClick={() => removePlayer()}
          className="playersNumber__firstArrow"
          alt="Flèche bas"
        />
      </div>
    </div>
  )
}
