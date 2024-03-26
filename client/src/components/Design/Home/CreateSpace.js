import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";


const CreateSpace = (props) => {
  return (
    <div to={props.to} className="row align-items-center interest--hover py-2 rounded cursor-pointer link--underline d-flex">
      <div className="col-auto pe-0">
       <IoIosAddCircleOutline/>
      </div>
      <p className="col m-0 mt-1 ps-0 font-tiny text-secondary text-truncate">{props.value}</p>
    </div>
  )
}

export default CreateSpace