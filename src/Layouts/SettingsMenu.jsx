import React from 'react'
import { useDispatch } from 'react-redux'
import ComputerBluff from '../Components/ComputerBluff'
import ComputerSpeed from '../Components/ComputerSpeed'
import Music from '../Components/Music'
import { hideMenu } from '../redux/store'

export default function SettingsMenu() {
  const dispatch = useDispatch()

  const closeMenu = () => {
    dispatch(hideMenu('settings'))
  }

  return (
    <div className="settingsMenu">
      <div onClick={closeMenu} className="settingsMenu__overlay"></div>
      <div className="settingsMenu__window">
        <h1 className="settingsMenu__header">Options</h1>
        <ComputerSpeed />
        <ComputerBluff />
        <Music />
        <div onClick={closeMenu} className="settingsMenu__okBtn">
          ok
        </div>
      </div>
    </div>
  )
}
