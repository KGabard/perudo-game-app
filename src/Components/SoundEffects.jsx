import { ReactComponent as SoundOn } from '../Assets/Images/soundOn.svg'
import { ReactComponent as SoundOff } from '../Assets/Images/soundOff.svg'
import { useDispatch } from 'react-redux'
import { toggleSoundEffectsMute } from '../redux/features/gameSlice'
import useGameData from '../hooks/useGameData'

export default function SoundEffects() {
  const { game } = useGameData()
  const dispatch = useDispatch()

  return (
    <div className="soundEffects">
      <p className="soundEffects__label">Effets sonores :</p>
      {game.soundEffects.muted ? (
        <SoundOff
          className="soundEffects__mute"
          onClick={() => dispatch(toggleSoundEffectsMute())}
        />
      ) : (
        <SoundOn
          className="soundEffects__mute"
          onClick={() => dispatch(toggleSoundEffectsMute())}
        />
      )}
    </div>
  )
}
