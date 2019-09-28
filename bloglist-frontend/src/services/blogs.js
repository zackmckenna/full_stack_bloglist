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
  const response = await axios.post(baseUrl, newBlog,config)
  return response.data
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
    }
  )
  console.log(userBlogs)
  return userBlogs
}

export default { getAll, getById, createNew, setToken }
