import PlayerForm from '../Components/PlayerForm'
import PlayersNumber from '../Components/PlayersNumber'
import { useState } from 'react'
import useGameMenu from '../hooks/useGameMenu'

export default function GameMenu() {
  //! Dynamic form : https://www.freecodecamp.org/news/build-dynamic-forms-in-react/
  //! React hook form : https://www.kaherecode.com/tutorial/validation-des-formulaires-en-react-a-l-aide-de-react-hook-form-et-yup-6210f5f2daf45

  const [formData, setFormData] = useState({
    players: [
      {
        name: '',
        avatar: 0,
        isComputer: false,
      },
      {
        name: '',
        avatar: 1,
        isComputer: false,
      },
    ],
  })

  const {
    handleAvatarChange,
    increasePlayersNumber,
    decreasePlayersNumber,
    handleNameChange,
    toggleIsComputer,
    handleFormSubmit,
    closeMenu,
  } = useGameMenu({ formData: formData, setFormData: setFormData })

  return (
    <div className="gameMenu">
      <div onClick={closeMenu} className="gameMenu__overlay"></div>
      <div className="gameMenu__window">
        <h1 className="gameMenu__header">Nouvelle Partie ?</h1>
        <form className="gameMenu__form">
          <PlayersNumber
            playersNumber={formData.players.length}
            increasePlayersNumber={increasePlayersNumber}
            decreasePlayersNumber={decreasePlayersNumber}
          />
          {formData.players.map((item, index) => {
            return (
              <PlayerForm
                key={index}
                // Précédement: key={uuidv4()}. Cependant la clé générée aléatoirement entraine une perte de focus des inputs à chaque re-render ! (Pas pratique quand on tape son nom par exemple)
                // Conclusion générer une clé différente pour chaque élément mais toujours la même après un re-render !
                currentPlayer={item}
                currentIndex={index}
                handleNameChange={handleNameChange}
                handleAvatarChange={handleAvatarChange}
                toggleIsComputer={toggleIsComputer}
              />
            )
          })}
          <div onClick={handleFormSubmit} className="gameMenu__okBtn">
            ok
          </div>
        </form>
      </div>
    </div>
  )
}
