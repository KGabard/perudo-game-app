import { useEffect } from 'react'
import { useRef } from 'react'
import NewGameBtn from '../Components/NewGameBtn'

export default function EndGameMessage() {
  const ref = useRef()

  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }, [])

  return (
    <div ref={ref} className={'endGameMessage'}>
      <h1 className="endGameMessage__header">La partie est terminée !</h1>
      <p className="endGameMessage__body">Ci-après le classement final.</p>
      <NewGameBtn />
    </div>
  )
}
