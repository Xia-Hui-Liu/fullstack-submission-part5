
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    sessionStorage.setItem('loggedIn', false)
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleCreate = (e) => {
    e.preventDefault()
    try {
      const blogObject = { title, author, url }
      blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      })
    } catch (exception) {
      setMessage('something went wrong')
    }
    setTimeout(() => {
      setMessage('something went wrong' ?? null)
    }, 5000)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }


  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <LoginForm 
        handleLogin={handleLogin} 
        username={username} 
        password={password} 
        userNameChange={handleUsernameChange}
        passwordChange={handlePasswordChange} />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p> {user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <div>
      <h2>create new</h2>
      <NewBlogForm 
      handleCreate={handleCreate} 
      title={title} 
      author={author} 
      url={url}  
      titleChange={handleTitleChange}
      authorChange={handleAuthorChange}
      urlChange={handleUrlChange}
       />
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}    
    </div>
  )
}

export default App