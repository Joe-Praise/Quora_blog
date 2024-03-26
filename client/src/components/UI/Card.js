import React from 'react'

const Card = (props) => {

  return (
    <div className={`card border-radius ${props.className}`}>
    {props.children}
    </div>
  )
}

export default Card