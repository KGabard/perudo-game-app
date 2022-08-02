import { useDispatch } from 'react-redux'
import ComputerBluff from '../Components/ComputerBluff'
import ComputerSpeed from '../Components/ComputerSpeed'
import Music from '../Components/Music'
import usePlayersData from '../hooks/usePlayersData'
import { updateHasToPlay } from '../redux/features/playersSlice'
import { hideMenu, updateMenuHeight } from '../redux/features/gameSlice'
import { useEffect, useRef } from 'react'
import SoundEffects from '../Components/SoundEffects'

export default function SettingsMenu() {
  const { activePlayers } = usePlayersData()
  const dispatch = useDispatch()

  const windowRef = useRef()

  const closeMenu = () => {
    activePlayers.forEach((item) => {
      item.isActive &&
        dispatch(updateHasToPlay({ player: item, hasToPlay: true }))
    })
    dispatch(hideMenu('settings'))
  }

  useEffect(() => {
    dispatch(
      updateMenuHeight({
        menu: 'settings',
        height: windowRef.current.clientHeight,
      })
    )
  }, [])

  return (
    <div className="settingsMenu">
      <div onClick={closeMenu} className="settingsMenu__overlay"></div>
      <div className="settingsMenu__window" ref={windowRef}>
        <h1 className="settingsMenu__header">Options</h1>
        <ComputerSpeed />
        <ComputerBluff />
        <SoundEffects />
        <Music />
        <div onClick={closeMenu} className="settingsMenu__okBtn">
          ok
        </div>
      </div>
    </div>
  )
}
