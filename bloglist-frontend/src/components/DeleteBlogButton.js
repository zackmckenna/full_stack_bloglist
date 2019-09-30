import React from 'react'

const DeleteBlogButton = (props) => {

  return (
  <button value={props.blogId} onClick={props.handleDeleteClick}>delete</button>
  )
}

export default DeleteBlogButton
