import React from 'react'
import logo from '../Assets/Images/logo.png'
import Navbar from '../Components/Navbar'

export default function Header() {
  return (
    <div className="header">
      <img className="header__logo" src={logo} alt="peroquet" />
      <Navbar />
    </div>
  )
}
