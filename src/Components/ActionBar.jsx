import { useState } from 'react'
import useActionBar from '../hooks/useActionBar'

export default function ActionBar(props) {
  const [play, setPlay] = useState({ isPlaying: false, payload: '' })

  const currentPlayer = props.playerData

  useActionBar({
    player: currentPlayer,
    panelRef: props.panelRef,
    play: play,
    setPlay: setPlay,
  })

  return (
    <div
      className={
        !currentPlayer.isComputer && currentPlayer.isActive
          ? 'actionBar actionBar--displayed'
          : 'actionBar'
      }
    >
      <div
        className="actionBar__bidBtn"
        onClick={() => {
          setPlay({ isPlaying: true, payload: 'makeBid' })
        }}
      >
        Enchérir
      </div>
      <div
        className="actionBar__dudoBtn"
        onClick={() => {
          setPlay({ isPlaying: true, payload: 'dudo' })
        }}
      >
        Dudo
      </div>
      <div
        className="actionBar__calzaBtn"
        onClick={() => {
          setPlay({ isPlaying: true, payload: 'calza' })
        }}
      >
        Calza
      </div>
    </div>
  )
}
