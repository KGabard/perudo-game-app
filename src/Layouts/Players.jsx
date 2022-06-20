import React from 'react'
import { useSelector } from 'react-redux'
import Player from './Player'

export default function Players() {
  const playersData = useSelector(state => state.players)

  return (
    <div className='players'>
      {playersData.map(item => {
        return <Player key={item.id} playerData={item} />
      })}
    </div>
  )
}
