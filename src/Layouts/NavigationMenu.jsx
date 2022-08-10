import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { activateMenu, hideMenu, updateMenuHeight } from '../redux/features/gameSlice'
import { updateHasToPlay } from '../redux/features/playersSlice'

import usePlayersData from '../hooks/usePlayersData'
import { useRef } from 'react'

export default function NavigationMenu() {
  const { activePlayers } = usePlayersData()
  const dispatch = useDispatch()

  const windowRef = useRef()

  const closeMenu = () => {
    activePlayers.forEach((item) => {
      item.isActive &&
        dispatch(updateHasToPlay({ player: item, hasToPlay: true }))
    })
    dispatch(hideMenu('navigation'))
  }

  useEffect(() => {
    dispatch(
      updateMenuHeight({
        menu: 'navigation',
        height: windowRef.current.clientHeight,
      })
    )
  }, [])

  return (
    <div className="navigationMenu">
      <div onClick={closeMenu} className="navigationMenu__overlay"></div>
      <div className="navigationMenu__window" ref={windowRef}>
        <ul className="navigationMenu__menusList">
          <li
            className="navigationMenu__link"
            onClick={() => dispatch(activateMenu('game'))}
          >
            Partie
          </li>
          <li
            className="navigationMenu__link"
            onClick={() => dispatch(activateMenu('controls'))}
          >
            Commandes
          </li>
          <li
            className="navigationMenu__link"
            onClick={() => dispatch(activateMenu('rules'))}
          >
            Règles
          </li>
          <li
            className="navigationMenu__link"
            onClick={() => dispatch(activateMenu('settings'))}
          >
            Options
          </li>
        </ul>
      </div>
    </div>
  )
}
