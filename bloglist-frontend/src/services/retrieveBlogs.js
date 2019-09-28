import axios from 'axios'
const baseUrl = '/api/blogs'

const retrieveBlogs = async userId => {
  const response = await axios.get(baseUrl)

  console.log(response)

  return response.blogs.map(blog => blog.id === userId)

}

export default { retrieveBlogs }
