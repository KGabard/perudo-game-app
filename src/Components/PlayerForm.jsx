import { ReactComponent as ArrowIcon } from '../Assets/Images/arrow.svg'
import useGameData from '../hooks/useGameData'

export default function PlayerForm({
  currentIndex,
  register,
  errors,
  setValue,
  watch,
  handleAvatarChange,
}) {
  const { game } = useGameData()

  const currentAvatar =
    game.playerImages[watch(`players.${currentIndex}.avatar`)]

  return (
    <div className="playerForm">
      <p className="playerForm__label">Joueur n°{currentIndex + 1}</p>
      <div className="playerForm__inputContainer">
        <input
          type="text"
          className={`playerForm__input ${
            errors.players?.[currentIndex]?.name ? 'isInvalid' : ''
          }`}
          name={`players[${currentIndex}]name`}
          placeholder="Nom du joueur..."
          {...register(`players.${currentIndex}.name`)}
        />
        <div className="playerForm__invalidMessage">
          {errors.players?.[currentIndex]?.name?.message}
        </div>
      </div>
      <div className="playerForm__avatarContainer">
        <img
          src={currentAvatar}
          alt="Avatar du joueur"
          className={'playerForm__avatar'}
        ></img>
        <ArrowIcon
          onClick={() => handleAvatarChange(currentIndex, 'previous')}
          className="playerForm__secondArrow"
          alt="Flèche haut"
        />
        <ArrowIcon
          onClick={() => handleAvatarChange(currentIndex, 'next')}
          className="playerForm__firstArrow"
          alt="Flèche bas"
        />
      </div>
      <div className="playerForm__computerContainer">
        <p className="playerForm__computerLabel">Ordinateur ?</p>
        <input
          type="checkbox"
          className={'playerForm__computerCheckBox'}
          name={`players[${currentIndex}]isComputer`}
          {...register(`players.${currentIndex}.isComputer`)}
        />
      </div>
    </div>
  )
}
