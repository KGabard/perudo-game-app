import React from 'react'
import { useSelector } from 'react-redux/'
import useStoreData from './useStoreData'

export default function useBid() {
  const [activePlayers, game] = useStoreData()

  return [
    increaseBidCount,
    decreaseBidCount,
    increaseBidValue,
    decreaseBidValue,
    setBidCount,
    setBidValue,
  ]
}
