import React from 'react'
import { useEffect } from 'react'
import NewGameBtn from '../Components/NewGameBtn'
import useGameData from '../hooks/useGameData'
import usePlayersData from '../hooks/usePlayersData'
import useResetPlayers from '../hooks/useResetPlayers'
import EndGameMessage from './EndGameMessage'
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

  const thereIsNoPlayers =
    activePlayers.length === 0 && eliminatedPlayers.length === 0

  return (
    <div className="players">
      {thereIsNoPlayers && <NewGameBtn addedClass={'alone'} />}
      {!game.isOver &&
        activePlayers.map((item) => {
          return (
            !item.isEliminated && <Player key={item.id} playerData={item} />
          )
        })}

      {game.isOver && !thereIsNoPlayers && <EndGameMessage />}
      {game.isOver &&
        activePlayers.map((item) => {
          return <PlayerRank key={item.id} playerData={item} rank={0} />
        })}
      {game.isOver &&
        eliminatedPlayers.map((item, index) => {
          return <PlayerRank key={item.id} playerData={item} rank={index + 1} />
        })}
    </div>
  )
}
