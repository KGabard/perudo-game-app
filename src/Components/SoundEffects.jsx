import { ReactComponent as SpeakerOn } from '../Assets/Images/speaker-on.svg'
import { ReactComponent as SpeakerOff } from '../Assets/Images/speaker-off.svg'
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
        <SpeakerOff
          className="soundEffects__mute"
          onClick={() => dispatch(toggleSoundEffectsMute())}
        />
      ) : (
        <SpeakerOn
          className="soundEffects__mute"
          onClick={() => dispatch(toggleSoundEffectsMute())}
        />
      )}
    </div>
  )
}
