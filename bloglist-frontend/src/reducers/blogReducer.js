import blogsService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  console.log('state now:', state)
  console.log('action:', action)
  switch(action.type) {
    case 'INITIALIZE_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'VOTE_BLOG':
      console.log(action.data)
      const id = action.data.id
      const blogToChange = state.find(a => a.id === id)
      const changedBlog = {
        ...blogToChange,
        votes: blogToChange.votes + 1
      }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.createNew(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newAnecdote,
    })
  }
}

export const voteBlog = (id) => {
  return async dispatch => {
    const blogToVote = await anecdoteService.findById(id)
    dispatch({
      type: 'VOTE_BLOG',
      data: blogToVote
    })
    const updatedAnecdote = {...blogToVote, votes: blogToVote.votes + 1}
    console.log(updatedAnecdote)
    const response = await blogService.update(updatedAnecdote)
    return response.data
  }
}

export default blogsReducer
