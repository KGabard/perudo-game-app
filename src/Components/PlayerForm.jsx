import useGameData from '../hooks/useGameData'
import { useDispatch } from 'react-redux'
import arrowIcon from '../Assets/Images/arrow.svg'
import { toggleIsComputer, updatePlayerName } from '../redux/store'
import emptyAvatar from '../Assets/Images/PlayerImageEmpty.png'
import { useEffect, useState } from 'react'

export default function PlayerForm(props) {
  const currentIndex = props.playerIndex
  const { game, setAvatar } = useGameData()
  const dispatch = useDispatch()

  const currentPlayer = game.gameMenu.players[currentIndex]

  const [nameIsValid, setNameIsValid] = useState(true)
  const [currentName, setCurrentName] = useState('')

  const checkName = (name) => {
    let nameIsValid = false
    if (name.length >= 2 && name.length <= 10) nameIsValid = true
    setNameIsValid(nameIsValid)
    setCurrentName(name)
  }

  useEffect(() => {
    setCurrentName(currentPlayer.name)
  }, [currentPlayer.name])

  return (
    <div className="playerForm">
      <p className="playerForm__label">Joueur n°{currentIndex + 1}</p>
      <input
        type="text"
        className={
          nameIsValid ? 'playerForm__input' : 'playerForm__input wrong'
        }
        placeholder="Nom du joueur..."
        title="Le nom doit comporter entre 2 et 10 caractères."
        onChange={(e) => checkName(e.target.value)}
        onBlur={(e) =>
          dispatch(
            updatePlayerName({
              index: currentIndex,
              name: currentName,
            })
          )
        }
        value={currentName}
      />
      <div className="playerForm__avatarContainer">
        <img
          src={currentPlayer.avatar ? currentPlayer.avatar : emptyAvatar}
          alt="Avatar du joueur"
          className={
            currentPlayer.avatar
              ? 'playerForm__avatar'
              : 'playerForm__avatar wrong'
          }
        ></img>
        <img
          onClick={() => setAvatar(currentIndex, 'previous')}
          src={arrowIcon}
          className="playerForm__upArrow"
          alt="Flèche haut"
        ></img>
        <img
          onClick={() => setAvatar(currentIndex, 'next')}
          src={arrowIcon}
          className="playerForm__downArrow"
          alt="Flèche bas"
        ></img>
      </div>
      <div className="playerForm__computerContainer">
        <p className="playerForm__computerLabel">Ordinateur ?</p>
        <div
          className={
            currentPlayer.isComputer
              ? 'playerForm__computerCheckBox checked'
              : 'playerForm__computerCheckBox'
          }
          onClick={() => {
            dispatch(toggleIsComputer(currentIndex))
          }}
        ></div>
      </div>
    </div>
  )
}
