import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hideMenu, updateMenuHeight } from '../redux/features/gameSlice'
import { updateHasToPlay } from '../redux/features/playersSlice'
import { v4 as uuidv4 } from 'uuid'

import upArrowKey from '../Assets/Images/upArrowKey.png'
import rightArrowKey from '../Assets/Images/rightArrowKey.png'
import downArrowKey from '../Assets/Images/downArrowKey.png'
import leftArrowKey from '../Assets/Images/leftArrowKey.png'
import enterKey from '../Assets/Images/enterKey.png'
import majKey from '../Assets/Images/majKey.png'
import ctrlKey from '../Assets/Images/ctrlKey.png'
import zeroKey from '../Assets/Images/zeroKey.png'

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
