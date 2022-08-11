import React from 'react'
import useGameData from '../hooks/useGameData'
import { useDispatch } from 'react-redux'
import {
  nextMusic,
  previousMusic,
  toggleIsMusicPlaying,
} from '../redux/features/gameSlice'
import { ReactComponent as PlayBtn } from '../Assets/Images/music-play.svg'
import { ReactComponent as PauseBtn } from '../Assets/Images/music-pause.svg'
import { ReactComponent as ChangeBtn } from '../Assets/Images/music-change.svg'

export default function Music() {
  const { game } = useGameData()
  const currentMusic = game.music.list[game.music.current]
  const dispatch = useDispatch()

  return (
    <div className="music">
      <p className="music__label">{`Musique : ${
        currentMusic.name[0].toUpperCase() + currentMusic.name.substring(1)
      }`}</p>
      <div className="music__player">
        <ChangeBtn
          onClick={() => dispatch(previousMusic())}
          alt="Bouton précédent"
          className="music__changeBtn prev"
        />
        {game.music.isPlaying ? (
          <PauseBtn
            onClick={() => dispatch(toggleIsMusicPlaying())}
            alt="Bouton play"
            className="music__playBtn"
          />
        ) : (
          <PlayBtn
            onClick={() => dispatch(toggleIsMusicPlaying())}
            alt="Bouton play"
            className="music__playBtn"
          />
        )}
        <ChangeBtn
          onClick={() => dispatch(nextMusic())}
          alt="Bouton suivant"
          className="music__changeBtn next"
        />
      </div>
    </div>
  )
}
