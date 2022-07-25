import arrowIcon from '../Assets/Images/arrow.svg'
import emptyAvatar from '../Assets/Images/PlayerImageEmpty.png'
import useGameData from '../hooks/useGameData'

export default function PlayerForm({
  currentPlayer,
  currentIndex,
  handleNameChange,
  handleAvatarChange,
  toggleIsComputer,
}) {
  // const currentIndex = props.playerIndex
  // const { game, setAvatar } = useGameData()
  // const dispatch = useDispatch()

  // const currentPlayer = game.gameMenu.players[currentIndex]

  // const currentPlayer = player
  // const currentIndex = index

  // const [nameIsValid, setNameIsValid] = useState(true)
  // const [currentName, setCurrentName] = useState('')

  // const checkName = (name) => {
  //   let nameIsValid = false
  //   if (name.length >= 2 && name.length <= 10) nameIsValid = true
  //   setNameIsValid(nameIsValid)
  //   setCurrentName(currentIndex, name)
  // }

  // useEffect(() => {
  //   setCurrentName(currentPlayer.name)
  // }, [currentPlayer.name])
  const { game } = useGameData()

  return (
    <div className="playerForm">
      <p className="playerForm__label">Joueur n°{currentIndex + 1}</p>
      <input
        type="text"
        className={'playerForm__input'}
        name="name"
        // className={
        //   nameIsValid ? 'playerForm__input' : 'playerForm__input wrong'
        // }
        placeholder="Nom du joueur..."
        title="Le nom doit comporter entre 2 et 10 caractères."
        // onChange={(e) => setCurrentName(e.target.value)}
        onChange={(e) => handleNameChange(e, currentIndex)}
        // onBlur={() => setName(currentIndex, currentName)}
        value={currentPlayer.name}
      />
      <div className="playerForm__avatarContainer">
        <img
          src={game.playerImages[currentPlayer.avatar]}
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
          onClick={(e) => {
            toggleIsComputer(e, currentIndex)
          }}
          value={currentPlayer.isComputer}
          name="isComputer"
        />
      </div>
    </div>
  )
}
