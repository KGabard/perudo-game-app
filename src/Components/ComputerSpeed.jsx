import useGameData from '../hooks/useGameData'
import { ReactComponent as ArrowIcon } from '../Assets/Images/arrow.svg'
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
        <ArrowIcon
          onClick={() => dispatch(increaseComputerSpeed())}
          className="computerSpeed__secondArrow"
          alt="Flèche haut"
          />
        <ArrowIcon
          onClick={() => dispatch(decreaseComputerSpeed())}
          className="computerSpeed__firstArrow"
          alt="Flèche bas"
        />
      </div>
    </div>
  )
}
