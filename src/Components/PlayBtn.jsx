import React from 'react'

export default function PlayBtn({ goToGame }) {
  return (
    <div className="playBtn" onClick={goToGame}>
      <span className="playBtn__letter">J</span>
      <span className="playBtn__letter">o</span>
      <span className="playBtn__letter">u</span>
      <span className="playBtn__letter">e</span>
      <span className="playBtn__letter">r</span>
    </div>
  )
}
