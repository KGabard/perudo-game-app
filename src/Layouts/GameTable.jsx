import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import useGameData from '../hooks/useGameData'
import useMenuHeight from '../hooks/useMenuHeight'
import EndTurnMessage from './EndTurnMessage'
import Header from './Header'
import Players from './Players'

export default function GameTable() {
  const { game } = useGameData()

  const [gameTableHeight, setGameTableHeight] = useState(0)
  const { isMenuOpen, menuHeight } = useMenuHeight()
  const gameTableRef = useRef()

  useEffect(() => {
    let baseHeight = 0

    for (let element of gameTableRef.current.children) {
      baseHeight += element.clientHeight
    }

    const maxHeight = Math.max(menuHeight, baseHeight)

    setGameTableHeight(maxHeight)
  }, [menuHeight, isMenuOpen])

  return (
    <div
      className="gameTable"
      ref={gameTableRef}
      style={
        isMenuOpen
          ? {
              height: `${gameTableHeight}px`,
            }
          : {}
      }
    >
      <Header />
      <div className="gameTable__content">
        {game.endTurnMessage.isDisplayed && <EndTurnMessage />}
        <Players />
      </div>
    </div>
  )
}
