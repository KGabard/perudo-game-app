import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateHasToPlay } from '../redux/features/playersSlice'
import useActions from './useActions'
import useBidData from './useBidData'
import useComputer from './useComputer'
import useDices from './useDices'
import useGameData from './useGameData'
import usePlayersData from './usePlayersData'

export default function useActionBar({ player, panelRef, play, setPlay }) {
  const { game } = useGameData()
  const { activatePlayer } = usePlayersData()
  const { makeBid, endTurn } = useActions()
  const { computerPlay } = useComputer()
  const {
    increaseBidCount,
    decreaseBidCount,
    increaseBidValue,
    decreaseBidValue,
  } = useBidData()
  const { showDices, hideDices } = useDices()

  const dispatch = useDispatch()

  const computeTime = () => {
    const time =
      (8000 + Math.random() * 8000) *
      Math.pow(0.7, Math.pow(game.computerSpeed.speed, 1.6))
    return time
  }

  useEffect(() => {
    if (!play.isPlaying || game.isPause) return
    switch (play.payload) {
      case 'makeBid':
        makeBid(player)
        break
      case 'dudo':
        endTurn(player, 'dudo')
        break
      case 'calza':
        endTurn(player, 'calza')
        break

      default:
        break
    }
    setPlay({ ...play, isPlaying: false })
  }, [play])

  useEffect(() => {
    if (player.hasToPlay && !game.isPause) {
      dispatch(updateHasToPlay({ player: player, hasToPlay: false }))
      activatePlayer(player, panelRef)
      player.isComputer &&
        setTimeout(() => {
          setPlay(computerPlay(player))
        }, computeTime())
    }
  }, [player.hasToPlay, game.isPause])

  useEffect(() => {
    const keyDown = (event) => {
      if (!player.isComputer && player.isActive) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault()
            decreaseBidCount(player)
            break
          case 'ArrowUp':
            event.preventDefault()
            increaseBidCount(player)
            break
          case 'ArrowLeft':
            event.preventDefault()
            decreaseBidValue(player)
            break
          case 'ArrowRight':
            event.preventDefault()
            increaseBidValue(player)
            break
          case 'Enter':
            event.preventDefault()
            setPlay({ isPlaying: true, payload: 'makeBid' })
            break
          case 'Shift':
            event.preventDefault()
            setPlay({ isPlaying: true, payload: 'dudo' })
            break
          case 'Control':
            event.preventDefault()
            setPlay({ isPlaying: true, payload: 'calza' })
            break
          case '0':
            event.preventDefault()
            showDices(player)
            break
          default:
            return
        }
      }
    }

    const keyUp = (event) => {
      if (!player.isComputer && player.isActive) {
        switch (event.key) {
          case '0':
            event.preventDefault()
            hideDices(player)
            break
          default:
            return
        }
      }
    }

    window.addEventListener('keydown', keyDown)
    window.addEventListener('keyup', keyUp)

    return () => {
      window.removeEventListener('keydown', keyDown)
      window.removeEventListener('keyup', keyUp)
    }
  }, [player])
}
