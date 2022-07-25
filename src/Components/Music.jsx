import React from 'react'
import useGameData from '../hooks/useGameData'

import playBtn from '../Assets/Images/playMusic.png'
import pauseBtn from '../Assets/Images/pauseMusic.png'
import nextBtn from '../Assets/Images/nextMusic.png'
import prevBtn from '../Assets/Images/prevMusic.png'
import { useDispatch } from 'react-redux'
import { nextMusic, previousMusic, toggleIsMusicPlaying } from '../redux/store'

export default function Music() {
  const { game } = useGameData()
  const currentMusic = game.music.list[game.music.current]
  const dispatch = useDispatch()

  return (
    <div className="music">
      <p className="music__label">{`Musique : ${currentMusic.name[0].toUpperCase() + currentMusic.name.substring(1)}`}</p>
      <div className="music__player">
        <img
          onClick={() => dispatch(previousMusic())}
          src={prevBtn}
          alt="Bouton précédent"
          className="music__prevBtn"
        />
        <img
          onClick={() => dispatch(toggleIsMusicPlaying())}
          src={game.music.isPlaying ? pauseBtn : playBtn}
          alt="Bouton play"
          className="music__playBtn"
        />
        <img
          onClick={() => dispatch(nextMusic())}
          src={nextBtn}
          alt="Bouton suivant"
          className="music__nextBtn"
        />
      </div>
    </div>
  )
}
