import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import usePlayersData from '../hooks/usePlayersData'
import useGameData from '../hooks/useGameData'
import { updateHasToPlay } from '../redux/store'
import useActions from '../hooks/useActions'
import useComputer from '../hooks/useComputer'
import useBidData from '../hooks/useBidData'

export default function ActionBar(props) {
  const [play, setPlay] = useState({ isPlaying: false, payload: '' })

  const currentPlayer = props.playerData

  const { activatePlayer } = usePlayersData()
  const { game } = useGameData()
  const { makeBid, endTurn } = useActions()
  const { computerPlay } = useComputer()

  const { previousBid } = useBidData()

  const dispatch = useDispatch()

  useEffect(() => {
    if (!play.isPlaying || game.isPause) return
    switch (play.payload) {
      case 'makeBid':
        makeBid(currentPlayer)
        break
      case 'dudo':
        endTurn(currentPlayer, 'dudo')
        break
      case 'calza':
        endTurn(currentPlayer, 'calza')
        break

      default:
        break
    }
    setPlay({ ...play, isPlaying: false })
  }, [play])

  useEffect(() => {
    if (currentPlayer.hasToPlay) {
      console.log(`${currentPlayer.name} joue:`);
      dispatch(updateHasToPlay({ player: currentPlayer, hasToPlay: false }))
      activatePlayer(currentPlayer, props.panelRef)
      currentPlayer.isComputer &&
        setTimeout(() => {
          setPlay(computerPlay(currentPlayer))
        }, 1000 + Math.random()*2000)
    }
  }, [currentPlayer.hasToPlay])

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
