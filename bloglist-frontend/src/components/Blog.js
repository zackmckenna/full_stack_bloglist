import React, { useState, useEffect } from 'react'
import LikeButton from './LikeButton'
import DeleteBlogButton from './DeleteBlogButton'
import blogsService from '../services/blogs'

/*import LikeButton from './LikeButton'*/

const Blog = ({ blog, reloadBlogs, setErrorMessage }) => {

  const [ visible, setVisible ] = useState(false)
  const [ likeCounter, setLikeCounter ] = useState(0)

  const currentUser = (JSON.parse(window.localStorage.loggedBlogappUser))

  console.log(blog)

  useEffect(() => {
    if (blog.likes === undefined) {
      blog.likes = 0
    }
    setLikeCounter(blog.likes)
  }, [blog.likes])

  const hideWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeClick = ( event ) => {
    event.stopPropagation()
    handleLike(event.target.value)
    reloadBlogs()
  }

  const handleDeleteClick = ( event ) => {
    event.stopPropagation()
    const check = window.confirm(`Are you sure you want to delete ${blog.title}?`)
    check === true ? handleDelete(event.target.value) : setErrorMessage(`${blog.title} not deleted`)
  }

  const handleDelete = async deletedBlog => {
    try{
      await blogsService.deleteBlog(deletedBlog)
      reloadBlogs()
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async likedBlog => {

    try{
      await blogsService.likeBlog({
        likedBlog
      })
      const response = await blogsService.getById(likedBlog)
      console.log(response.likes)
      setLikeCounter(response.likes)
    } catch(exception){
      console.log(exception)
    }

  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  /*const handleClick = ( event ) => {
    console.log(event.parent)
    console.log(event.target.value)
    event.stopPropagation()
  }*/
  let showDelete = { display: '' }
  if (currentUser.id === blog.user.id){
    showDelete = { display: '' }
  } else {
    showDelete = { display: 'none' }
  }

  return (
  <>
  <div className='blog'>
    <div style={hideWhenVisible}>
      <div style={blogStyle}>
        <div className='blogContent' onClick={toggleVisibility}>
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
          <div className='likesDiv'>
            {likeCounter} likes <LikeButton handleLikeClick={handleLikeClick} likes={blog.likes} blogId={blog.id} key={blog.id}/>
          </div>
        </div>
        <div style={showDelete}>
          <DeleteBlogButton handleDeleteClick={handleDeleteClick} key={blog.id} blogId={blog.id}/>
        </div>
      </div>
    </div>
  </div>
  </>
  )
}
export default Blog

