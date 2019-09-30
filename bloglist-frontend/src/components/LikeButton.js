import React from 'react'

const LikeButton = ({ handleLikeClick, blogId }) => {

  return (
    <>
    <button value={blogId} onClick={handleLikeClick}>Like</button>
    </>
  )
}

export default LikeButton
