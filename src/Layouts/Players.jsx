import React from 'react'
import { useSelector } from 'react-redux'
import Player from './Player'
import PlayerRank from './PlayerRank'

export default function Players() {
  const activePlayers = useSelector((state) => state.players.activePlayers)

  const eliminatedPlayers = useSelector(
    (state) => state.players.eliminatedPlayers
  )

  if (activePlayers.length <= 1) {
    console.log('La partie est terminée')
    console.log(`Le gagnant est ${activePlayers[0].name}`)
    eliminatedPlayers.map((item, index) =>
      console.log(`${index + 2}eme : ${item.name}`)
    )
  }

  return (
    <div className="players">
      {activePlayers.length > 1
        ? activePlayers.map((item) => {
            return (
              !item.isEliminated && <Player key={item.id} playerData={item} />
            )
          })
        : eliminatedPlayers.map((item) => {
            return <PlayerRank key={item.id} playerData={item} />
          })}
    </div>
  )
}
