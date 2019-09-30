import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const likeBlog = async likedBlogId => {
  try{
  console.log(likedBlogId)
  const request = await axios.get(`${baseUrl}/${likedBlogId}`)
  console.log(request.data)
  console.log(request.data.likes)

  const config = {
    headers: { Authorization: token },
  }
  const updatedBlog = request.data
  console.log(updatedBlog)
  updatedBlog.likes +=1
  console.log(updatedBlog)
  const response = await axios.put(`${baseUrl}/${likedBlogId}`, updatedBlog, config)
  console.log(response)
} catch (exception){
  console.log(exception)
}
}

const getById = async userId => {
  const request = await axios.get(baseUrl)
  console.log(request)
  const filteredBlogs = request.data.filter(blog => {
    return blog.user !== undefined
  })

  console.log(filteredBlogs)
  const userBlogs = filteredBlogs.filter(blog => {
    if (blog.user.id === userId) {
      return blog
    }
    return ''
  })
  console.log(userBlogs)
  return userBlogs
}

export default { getAll, getById, createNew, setToken, likeBlog }
