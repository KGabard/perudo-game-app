import { useEffect } from 'react'
import { useState } from 'react'
import useGameData from './useGameData'

export default function useMenuHeight() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuHeight, setMenuHeight] = useState(0)

  const { game } = useGameData()

  const marginTop = 112

  useEffect(() => {
    game.gameMenu.isDisplayed ||
    game.controlsMenu.isDisplayed ||
    game.rulesMenu.isDisplayed ||
    game.settingsMenu.isDisplayed
      ? setIsMenuOpen(true)
      : setIsMenuOpen(false)

    const gameMenuHeight = game.gameMenu.height + marginTop
    const controlsMenuHeight = game.controlsMenu.height + marginTop
    const rulesMenuHeight = game.rulesMenu.height + marginTop
    const settingsMenuHeight = game.settingsMenu.height + marginTop

    game.gameMenu.isDisplayed && setMenuHeight(gameMenuHeight)
    game.controlsMenu.isDisplayed && setMenuHeight(controlsMenuHeight)
    game.rulesMenu.isDisplayed && setMenuHeight(rulesMenuHeight)
    game.settingsMenu.isDisplayed && setMenuHeight(settingsMenuHeight)
  }, [
    game.gameMenu.isDisplayed,
    game.controlsMenu.isDisplayed,
    game.rulesMenu.isDisplayed,
    game.settingsMenu.isDisplayed,
    game.gameMenu.height,
    game.controlsMenu.height,
    game.rulesMenu.height,
    game.settingsMenu.height,
  ])

  return { isMenuOpen: isMenuOpen, menuHeight: menuHeight }
}
