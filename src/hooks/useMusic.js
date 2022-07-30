import { useState } from 'react'
import { useEffect } from 'react'
import useGameData from './useGameData'

export default function useMusic() {
  const { game } = useGameData()

  const [trackList, setTrackList] = useState([])

  useEffect(() => {
    const newTrackList = []
    game.music.list.forEach((item) => {
      newTrackList.push(new Audio(item.url))
    })
    newTrackList.forEach((item) => {
      item.loop = true
    })
    setTrackList(newTrackList)
  }, [])

  useEffect(() => {
    if (trackList) {
      trackList.forEach((music) => {
        music.pause()
      })
      if (game.music.isPlaying) {
        trackList[game.music.current].play()
      }
    }
  }, [game.music])
}
