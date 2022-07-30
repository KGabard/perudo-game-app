import React from 'react'
import { useState } from 'react'
import Footer from './Footer'
import logo from '../Assets/Images/logo.png'
import PlayBtn from '../Components/PlayBtn'

export default function HomePage({ setHomePageActive, setGameTableActive }) {
  const [isInTransition, setIsInTransition] = useState(false)

  const goToGame = () => {
    setIsInTransition(true)
    setGameTableActive(true)
    setTimeout(() => {
      setHomePageActive(false)
    }, 1000)
  }

  return (
    <div className={`homePage${isInTransition ? ' inTransition' : ''}`}>
      <div
        className={`homePage__headerContainer${
          isInTransition ? ' inTransition' : ''
        }`}
      >
        <h1 className="homePage__header">{'Perudo\nGame'}</h1>
        <PlayBtn goToGame={goToGame} />
      </div>
      <div
        className={`homePage__logoContainer${
          isInTransition ? ' inTransition' : ''
        }`}
      >
        <img src={logo} className="homePage__logo" alt="Peroquet et dés" />
      </div>
      <Footer />
    </div>
  )
}
