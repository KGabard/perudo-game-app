import React from 'react'
import { useDispatch } from 'react-redux'
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
        <div onClick={closeMenu} className="settingsMenu__okBtn">
          ok
        </div>
      </div>
    </div>
  )
}
