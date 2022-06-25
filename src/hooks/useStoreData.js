import React from 'react'
import { useSelector } from 'react-redux'

export default function useStoreData() {
  const activePlayers = useSelector((state) => state.players.activePlayers)
  const game = useSelector((state) => state.game)
  const maxDicesPerPlayer = game.

  return [activePlayers, game, maxDicesPerPlayer, totalPlayersDices]
}
