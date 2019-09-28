import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogsService from './services/blogs'

const App = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ blogs, setBlogs ] = useState([])
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ loginMessage, setLoginMessage ] = useState('')
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ notification, setNotification ] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const userId = user.id
      blogsService
      .getById(userId).then(initialBlogs => {
        setBlogs(initialBlogs)
      })
    }
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log(localStorage)
      setUser(user)
      blogsService.setToken(user.token)
      const userBlogs = await blogsService.getById(user.id)
      setBlogs(userBlogs)
      setLoginMessage(`${user.name} is logged in`)
      setUsername('')
      setPassword('')
      setLoggedIn(true)
    } catch (exception){
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const reloadBlogs = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const userId = user.id
      blogsService
      .getById(userId).then(initialBlogs => {
        setBlogs(initialBlogs)
      })
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setLoggedIn(false)
    setUser(null)
    localStorage.clear()
  }

  const handleCreateNew = async (event) => {
    event.preventDefault()
    try{
      await blogsService.createNew({
        title, author, url,
      })
      setAuthor('')
      setTitle('')
      setUrl('')
      reloadBlogs()
      setNotification(`a new blog ${title} by ${author} has been added`)
      setTimeout(() => {
        setNotification('')
      }, 5000)
    } catch(exception) {
      console.log(exception)
    }
  }

  const createNewForm = () => (
    <form onSubmit={handleCreateNew}>
      <div>
        title
        <input
        type='text'
        value={title}
        name='Title'
        onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
        type='text'
        value={author}
        name='Author'
        onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
      url
        <input
        type='text'
        value={url}
        name='Url'
        onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create new</button>
    </form>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          password
            <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
  )

  if (user === null && loggedIn === false) {
    console.log(localStorage)
    return (
      <>
      <div>
        <h2>Log in to application</h2>
      </div>
      <h2>{errorMessage}</h2>
      <div>
        {loginForm()}
      </div>
    </>
    )
  }

  return (
    <>
      <div>
        <h3>Blogs</h3>
      </div>
      <div>
        <h2>{loginMessage}</h2>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div>
        <Notification notification={notification}/>
      </div>
      <div>
          {blogs.map(blog => {
            return <Blog key={blog.id} blog={blog}/>
          })}
      </div>
      <div>
        <h2>Create New Entry</h2>
      </div>
      <div>
        {createNewForm()}
      </div>
    </>

  )
}


export default App;
