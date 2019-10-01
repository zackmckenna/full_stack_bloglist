import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'

const BlogForm = ( {
  handleSubmit,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
} ) => {

  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleAuthorChange: PropTypes.func.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    handleUrlChange: PropTypes.func.isRequired,
    title: PropTypes.func.isRequired,
    author: PropTypes.func.isRequired,
    url: PropTypes.func.isRequired
  }

  return (
    <div>

      <h2>create a new entry</h2>

      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
          name='Title'
          value={title}
          onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
          name='Author'
          value={author}
          onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
          name='Url'
          value={url}
          onChange={handleUrlChange}
          />
        </div>
        <button type ='submit'>save</button>
      </form>
    </div>
  )
}

/*const handleCreateNew = async (props) => {
    try{
      const blog = await blogsService.createNew({

      })
      console.log(blog)
    } catch(exception) {
      console.log(exception)
    }
  }
}*/

export default BlogForm
