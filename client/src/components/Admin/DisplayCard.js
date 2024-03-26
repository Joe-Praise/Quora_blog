import React from 'react'

const DisplayCard = (props) => {
  return (
    <div className={`displayCard ${props.className}`}>
        {/* <figure>
            <img src={props.img} alt="display card theme" />
        </figure> */}
        <div className='text-center'>
            <p className='fs-5'>{props.header}</p>
            <i className='fs-4 fw-bold'>{props.value}</i>
        </div>
    </div>
  )
}

export default DisplayCard