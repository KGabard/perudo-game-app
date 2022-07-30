import useGameData from '../hooks/useGameData'
import arrowIcon from '../Assets/Images/arrow.svg'
import { useDispatch } from 'react-redux'
import {
  decreaseComputerSpeed,
  increaseComputerSpeed,
} from '../redux/features/gameSlice'

export default function ComputerSpeed() {
  const { game } = useGameData()
  const dispatch = useDispatch()

  return (
    <div className="computerSpeed">
      <p className="computerSpeed__label">Vitesse ordinateur :</p>
      <div className="computerSpeed__numberContainer">
        <div className="computerSpeed__number">{game.computerSpeed.speed}</div>
        <img
          onClick={() => dispatch(increaseComputerSpeed())}
          src={arrowIcon}
          className="computerSpeed__upArrow"
          alt="Flèche haut"
        ></img>
        <img
          onClick={() => dispatch(decreaseComputerSpeed())}
          src={arrowIcon}
          className="computerSpeed__downArrow"
          alt="Flèche bas"
        ></img>
      </div>
    </div>
  )
}
