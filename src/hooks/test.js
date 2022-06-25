import React from 'react'
import { useSelector } from 'react-redux'

export default function useTest() {
  const myPlayers = useSelector((state) => state.players.activePlayers)
  const myGame = useSelector((state) => state.game)

  return [myPlayers, myGame]
}
