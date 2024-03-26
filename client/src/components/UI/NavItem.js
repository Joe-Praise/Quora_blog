import React from 'react'
import { NavLink } from 'react-router-dom'

const NavItem = (props) => {
  return (
    <li className={`col-1 text-center g-0 py-2 py-xl-2 m-0 col-lg-auto ${props.className}`} onClick={props.onClick}>
        <NavLink to={props.to} className={props.linkClassName}>
        {props.children}
        </NavLink>
        {
          props.title &&
          <span className='nav-title'>{props.title}</span>
        }
    </li>
  )
}

export default NavItem