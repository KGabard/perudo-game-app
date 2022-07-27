import arrowIcon from '../Assets/Images/arrow.svg'
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
        <img
          onClick={() => handleAvatarChange(currentIndex, 'previous')}
          src={arrowIcon}
          className="playerForm__upArrow"
          alt="Flèche haut"
        ></img>
        <img
          onClick={() => handleAvatarChange(currentIndex, 'next')}
          src={arrowIcon}
          className="playerForm__downArrow"
          alt="Flèche bas"
        ></img>
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
