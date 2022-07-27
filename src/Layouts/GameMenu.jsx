import PlayerForm from '../Components/PlayerForm'
import PlayersNumber from '../Components/PlayersNumber'
import { useState } from 'react'
import useGameMenu from '../hooks/useGameMenu'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import useGameData from '../hooks/useGameData'
import { useEffect } from 'react'

export default function GameMenu() {
  const { game } = useGameData()

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

  console.log(watch('players'))

  const numberOfPlayers = watch('players').length

  const { handleAvatarChange, addPlayer, removePlayer, startGame, closeMenu } =
    useGameMenu({
      watch: watch,
      setValue: setValue,
      append: append,
      remove: remove,
    })

  return (
    <div className="gameMenu">
      <div onClick={closeMenu} className="gameMenu__overlay"></div>
      <div className="gameMenu__window">
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
          <button type="submit" className="gameMenu__okBtn">
            ok
          </button>
        </form>
      </div>
    </div>
  )
}
