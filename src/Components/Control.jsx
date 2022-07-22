import React from 'react'

export default function Control(props) {
  return (
    <div className='control'>
        <img src={props.computerKey} alt={props.alt} className='control__key' />
        <p className="control__label">{props.label}</p>
    </div>
  )
}
