import React from 'react'
import blogsService from '../services/blogs'


const CreateNewForm = ( props ) => {

  const handleCreateNew = async (props) => {
    try{
      const blog = await blogsService.createNew(props)
      console.log(blog)
    } catch(exception) {
      console.log(exception)
    }
  }

  return (
  <form onSubmit={handleCreateNew(props.title,props.author,props.url)}>
      <div>
        title
        <input
        type='text'
        value={props.title}
        name='Title'
        onChange={props.handleTitleChange}
        />
      </div>
      <div>
        author
        <input
        type='text'
        value={props.author}
        name='Author'
        onChange={props.handleAuthorChange}
        />
      </div>
      <div>
      url
        <input
        type='text'
        value={props.url}
        name='Url'
        onChange={props.handleUrlChange}
        />
      </div>
      <button type='submit'>create new</button>
    </form>
  )
}

export default CreateNewForm
