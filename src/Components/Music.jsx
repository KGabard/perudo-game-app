import React from 'react'
import useGameData from '../hooks/useGameData'
import { useDispatch } from 'react-redux'
import {
  nextMusic,
  previousMusic,
  toggleIsMusicPlaying,
} from '../redux/features/gameSlice'
import { ReactComponent as PlayBtn } from '../Assets/Images/musicPlay.svg'
import { ReactComponent as PauseBtn } from '../Assets/Images/musicPause.svg'
import { ReactComponent as NextBtn } from '../Assets/Images/musicNext.svg'
import { ReactComponent as PrevBtn } from '../Assets/Images/musicPrev.svg'

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
        <PrevBtn
          onClick={() => dispatch(previousMusic())}
          alt="Bouton précédent"
          className="music__prevBtn"
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
        <NextBtn
          onClick={() => dispatch(nextMusic())}
          alt="Bouton suivant"
          className="music__nextBtn"
        />
      </div>
    </div>
  )
}
