import React from 'react'
import useGameData from '../hooks/useGameData'

export default function PlayerRank(props) {
  const currentPlayer = props.playerData
  const { game } = useGameData()

  let className = 'playerRank'

  switch (props.rank) {
    case 0:
      className += ' first'
      break
    case 1:
      className += ' second'
      break
    case 2:
      className += ' third'
      break

    default:
      break
  }

  return (
    <div className={className}>
      <div className="playerRank__rank">{`#${props.rank + 1}`}</div>
      <div className="playerRank__header">
        <img
          src={game.playerImages[currentPlayer.avatar]}
          alt="Logo du joueur"
          className="playerRank__header__avatar"
        />
        <h1 className="playerRank__header__name">{currentPlayer.name}</h1>
      </div>
    </div>
  )
}
