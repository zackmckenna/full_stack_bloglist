import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

/*export const useResource = (request) => {

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const likeBlog = async id => {
  try{
    const request = await axios.get(`${baseUrl}/${id.likedBlog}`)
    const config = {
      headers: { Authorization: token },
    }
    const updatedBlog = request.data
    updatedBlog.likes +=1
    const response = await axios.put(`${baseUrl}/${id.likedBlog}`, updatedBlog, config)
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

const getById = async idd => {
  const request = await axios.get(`${baseUrl}/${id}`)
  console.log(request.data)
  return request.data
}

return {
  getAll,
  getByUserId,
  createNew,
  setToken,
  likeBlog,
  deleteBlog,
  getById
}*/



