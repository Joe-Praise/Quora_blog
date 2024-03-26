import React from 'react'
import { Link } from 'react-router-dom'

const DropDownLink = (props) => {
  return (
    <Link to={props.to} className="d-flex align-items-center rounded createPost--btn p-1 py-2 link--underline">
    {props.children}
    <span className='text-dark ps-2'>{props.value}</span>
</Link>
  )
}

export default DropDownLink