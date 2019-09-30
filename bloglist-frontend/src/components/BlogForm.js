import React from 'react'

const BlogForm = ( {
  handleSubmit,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
} ) => {
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
