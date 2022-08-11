import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hideMenu, updateMenuHeight } from '../redux/features/gameSlice'
import { updateHasToPlay } from '../redux/features/playersSlice'
import { v4 as uuidv4 } from 'uuid'

import upArrowKey from '../Assets/Images/key-up-arrow.png'
import rightArrowKey from '../Assets/Images/key-right-arrow.png'
import downArrowKey from '../Assets/Images/key-down-arrow.png'
import leftArrowKey from '../Assets/Images/key-left-arrow.png'
import enterKey from '../Assets/Images/key-enter.png'
import majKey from '../Assets/Images/key-maj.png'
import ctrlKey from '../Assets/Images/key-ctrl.png'
import zeroKey from '../Assets/Images/key-zero.png'

import Control from '../Components/Control'
import usePlayersData from '../hooks/usePlayersData'
import { useRef } from 'react'

export default function ControlsMenu() {
  const { activePlayers } = usePlayersData()
  const dispatch = useDispatch()

  const windowRef = useRef()

  const closeMenu = () => {
    activePlayers.forEach((item) => {
      item.isActive &&
        dispatch(updateHasToPlay({ player: item, hasToPlay: true }))
    })
    dispatch(hideMenu('controls'))
  }

  useEffect(() => {
    dispatch(
      updateMenuHeight({
        menu: 'controls',
        height: windowRef.current.clientHeight,
      })
    )
  }, [])

  return (
    <div className="controlsMenu">
      <div onClick={closeMenu} className="controlsMenu__overlay"></div>
      <div className="controlsMenu__window" ref={windowRef}>
        <h1 className="controlsMenu__header">Commandes</h1>
        <div className="controlsMenu__controls">
          <Control
            key={uuidv4()}
            computerKey={upArrowKey}
            alt={'Touche flèche du haut'}
            label={': Augmenter le nombre de dés'}
          />
          <Control
            key={uuidv4()}
            computerKey={downArrowKey}
            alt={'Touche flèche du bas'}
            label={': Diminuer le nombre de dés'}
          />
          <Control
            key={uuidv4()}
            computerKey={rightArrowKey}
            alt={'Touche flèche de droite'}
            label={': Augmenter la valeur du dé'}
          />
          <Control
            key={uuidv4()}
            computerKey={leftArrowKey}
            alt={'Touche flèche de gauche'}
            label={': Diminuer la valeur du dé'}
          />
          <Control
            key={uuidv4()}
            computerKey={enterKey}
            alt={'Touche entrée'}
            label={': Enchérir'}
          />
          <Control
            key={uuidv4()}
            computerKey={majKey}
            alt={'Touche Maj'}
            label={': Dudo'}
          />
          <Control
            key={uuidv4()}
            computerKey={ctrlKey}
            alt={'Touche Ctrl'}
            label={': Calza'}
          />
          <Control
            key={uuidv4()}
            computerKey={zeroKey}
            alt={'Touche 0'}
            label={': Montrer les dés'}
          />
        </div>
        <div onClick={closeMenu} className="controlsMenu__okBtn">
          ok
        </div>
      </div>
    </div>
  )
}
