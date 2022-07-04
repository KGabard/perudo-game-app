import React from 'react'
import { useEffect } from 'react'
import useGameData from '../hooks/useGameData'
import usePlayersData from '../hooks/usePlayersData'
import useResetPlayers from '../hooks/useResetPlayers'
import Player from './Player'
import PlayerRank from './PlayerRank'

export default function Players() {
  const { activePlayers, eliminatedPlayers } = usePlayersData()
  const { game } = useGameData()
  const { resetPlayer } = useResetPlayers()

  useEffect(() => {
    activePlayers.forEach((item) => {
      resetPlayer(item)
    })
  }, [])

  return (
    <div className="players">
      {!game.isOver &&
        activePlayers.map((item) => {
          return (
            !item.isEliminated && <Player key={item.id} playerData={item} />
          )
        })}

      {
        //! Rajouter un entête qui précise que la partie est finie est que le classement est le suivant
        game.isOver &&
          activePlayers.map((item) => {
            return <PlayerRank key={item.id} playerData={item} rank={0} />
          })
      }
      {game.isOver &&
        eliminatedPlayers.map((item, index) => {
          return <PlayerRank key={item.id} playerData={item} rank={index + 1} />
        })}
    </div>
  )
}
