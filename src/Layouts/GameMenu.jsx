import PlayerForm from '../Components/PlayerForm'
import PlayersNumber from '../Components/PlayersNumber'
import useGameMenu from '../hooks/useGameMenu'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import useGameData from '../hooks/useGameData'
import usePlayersData from '../hooks/usePlayersData'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { updateMenuHeight } from '../redux/features/gameSlice'

export default function GameMenu() {
  const { game } = useGameData()
  const { activePlayers } = usePlayersData()

  const windowRef = useRef()
  const dispatch = useDispatch()

  // form validation rules
  const validationSchema = Yup.object().shape({
    players: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .required('Le nom est requis.')
          .min(2, 'Le nom trop petit !')
          .max(10, 'Le nom est trop long !'),
        avatar: Yup.string().required("L'avatar est requis."),
        isComputer: Yup.boolean(),
      })
    ),
  })

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
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
    },
  }

  // functions to build form returned by useForm() and useFieldArray() hooks
  const { register, control, handleSubmit, formState, watch, setValue } =
    useForm(formOptions)
  const { errors } = formState
  const { fields, append, remove } = useFieldArray({ name: 'players', control })

  const numberOfPlayers = watch('players').length

  const { handleAvatarChange, addPlayer, removePlayer, startGame, closeMenu } =
    useGameMenu({
      watch: watch,
      setValue: setValue,
      append: append,
      remove: remove,
    })

  useEffect(() => {
    dispatch(
      updateMenuHeight({ menu: 'game', height: windowRef.current.clientHeight })
    )
  }, [numberOfPlayers])

  return (
    <div className="gameMenu">
      <div onClick={closeMenu} className="gameMenu__overlay"></div>
      <div className="gameMenu__window" ref={windowRef}>
        <h1 className="gameMenu__header">Nouvelle Partie ?</h1>
        <form onSubmit={handleSubmit(startGame)} className="gameMenu__form">
          <PlayersNumber
            playersNumber={numberOfPlayers}
            addPlayer={addPlayer}
            removePlayer={removePlayer}
          />
          {fields.map((item, index) => {
            return (
              <PlayerForm
                key={item.id}
                // Précédement: key={uuidv4()}. Cependant la clé générée aléatoirement entraine une perte de focus des inputs à chaque re-render ! (Pas pratique quand on tape son nom par exemple)
                // Conclusion générer une clé différente pour chaque élément mais toujours la même après un re-render !
                currentIndex={index}
                register={register}
                errors={errors}
                setValue={setValue}
                watch={watch}
                handleAvatarChange={handleAvatarChange}
              />
            )
          })}
          <div className="gameMenu__okBtnContainer">
            {!game.isOver && activePlayers.length > 0 && (
              <p className="gameMenu__alertMessage">
                {'Une partie est en cours.\n Ceci réinitialisera la partie.'}
              </p>
            )}
            <button type="submit" className="gameMenu__okBtn">
              ok
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
