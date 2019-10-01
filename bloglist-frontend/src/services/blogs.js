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

const deleteBlog = async blogId => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

const likeBlog = async likedBlogId => {
  try{
    const request = await axios.get(`${baseUrl}/${likedBlogId.likedBlog}`)
    const config = {
      headers: { Authorization: token },
    }
    const updatedBlog = request.data
    updatedBlog.likes +=1
    const response = await axios.put(`${baseUrl}/${likedBlogId.likedBlog}`, updatedBlog, config)
    return response.data
  } catch (exception){
    console.log(exception)
  }
}

const getByUserId = async userId => {
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

const getById = async blogId => {
  const request = await axios.get(`${baseUrl}/${blogId}`)
  console.log(request.data)
  return request.data
}

export default { getAll, getByUserId, createNew, setToken, likeBlog, deleteBlog, getById }
