import React, {useState, useEffect } from 'react'
import LikeButton from './LikeButton'

/*import LikeButton from './LikeButton'*/

const Blog = ({ blog, handleLike }) => {

  const [ visible, setVisible ] = useState(false)

  const hideWhenVisible = { display: visible ? 'none': ''}
  const showWhenVisible = { display: visible ? '': 'none'}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  /*const handleClick = ( event ) => {
    console.log(event.parent)
    console.log(event.target.value)
    event.stopPropagation()
  }*/
  console.log(blog.likes)

  return (
  <>
  <div style={hideWhenVisible}>
    <div style={blogStyle}>
    <div onClick={toggleVisibility}>
      {blog.title} {blog.author}
    </div>
    </div>
  </div>
  <div style={showWhenVisible}>
    <div style={blogStyle}>
    <div onClick={toggleVisibility}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        added by {blog.user.name}
      </div>
      <div>
        <LikeButton likes={blog.likes} blogId={blog.id} key={blog.id}/>
      </div>
    </div>
    </div>
  </div>
  </>
  )
}
export default Blog

