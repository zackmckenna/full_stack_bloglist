import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogsService from './services/blogs'
import BlogForm from './components/BlogForm'
import { useField } from './hooks'

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
      blogsService
        .getAll().then(initialBlogs => {
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
      blogsService
        .getAll().then(initialBlogs => {
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

  if (user === null && loggedIn === false) {
    return (
      <>
      <div>
        <h2>Log in to application</h2>
      </div>
      <h2>{errorMessage}</h2>
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
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
      <Togglable buttonLabel='create new'>
        <BlogForm
          url={url}
          title={title}
          author={author}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleSubmit={handleCreateNew}
          handleUrlChange={({ target }) => setUrl(target.value)}
        />
      </Togglable>
        <div>
          <br>
          </br>
        </div>

      <div className='blogDiv'>
        {blogs.sort((a,b) => b.likes - a.likes).map(blog => {
          return <Blog
            setErrorMessage={setErrorMessage}
            reloadBlogs={reloadBlogs}
            key={blog.id}
            blog={blog}
          />
        })}
      </div>
    </>

  )
}


export default App
