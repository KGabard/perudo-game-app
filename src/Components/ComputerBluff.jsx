import useGameData from '../hooks/useGameData'
import { useDispatch } from 'react-redux'
import { toggleComputerBluff } from '../redux/features/gameSlice'

export default function ComputerBluff() {
  const { game } = useGameData()
  const dispatch = useDispatch()

  return (
    <div className="computerBluff">
      <p className="computerBluff__label">L'ordinateur bluff ?</p>
      <div
        onClick={() => dispatch(toggleComputerBluff())}
        className="computerBluff__bluff"
      >
        {game.computerBluff ? 'Oui' : 'Non'}
      </div>
    </div>
  )
}
