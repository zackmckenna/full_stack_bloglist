import React, { useState, useEffect } from 'react'
import blogServices from '../services/blogs'

const LikeButton = (props) => {
  const [ likesCounter, setLikesCounter ] = useState(0)

  useEffect(() => {
    setLikesCounter(props.likes)
  }, [props.likes])

  console.log(props.blogId)

  const initiateLike = async () => {
      await blogServices.likeBlog(props.blogId)
  }
  const handleLikeClick = ( event ) => {
    event.stopPropagation()
    initiateLike(props.blogId)
    setLikesCounter(likesCounter + 1)
  }

  return (
    <>
    <p>{likesCounter} likes</p><button onClick={handleLikeClick}>Like</button>
    </>
  )
}

export default LikeButton
