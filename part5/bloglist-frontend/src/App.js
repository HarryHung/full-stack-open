import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() =>{
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
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

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
        setMessage('wrong username or password')
        setMessageType('error')
        setTimeout(() => {
          setMessage('')
          setMessageType('')
        }, 5000)
      }
    }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog.data))
      setMessage(`a new blog ${returnedBlog.data.title} by ${returnedBlog.data.author} added`)
      setMessageType('info')
      setTimeout(() => {
        setMessage('')
        setMessageType('')
      }, 5000)
      
      blogFormRef.current.toggleVisibility()

      setNewTitle('')
      setNewAuthor('')
      setNewURL('')
    } catch (exception) {
        setMessage(exception.response.data.error)
        setMessageType('error')
        setTimeout(() => {
          setMessage('')
          setMessageType('')
        }, 5000)
      }
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new note' ref = {blogFormRef}>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>title:<input value={newTitle} onChange={(event) => setNewTitle(event.target.value)}/></div>
        <div>author:<input value={newAuthor} onChange={(event) => setNewAuthor(event.target.value)}/></div>
        <div>url:<input value={newURL} onChange={(event) => setNewURL(event.target.value)}/></div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} type={messageType} />
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>      
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType} />
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App