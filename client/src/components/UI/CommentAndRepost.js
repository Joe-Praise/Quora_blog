import React from 'react'

const CommentAndRepost = (props) => {
  return (
    <div className="d-flex justify-content-center align-items-center rounded-pill createPost--btn w-auto p-1 cursor-pointer me-2" onClick={props.onAction}>
        {props.children}
        <span className='text-secondary ps-1'>{props.value}</span>
    </div>
  )
}

export default CommentAndRepost