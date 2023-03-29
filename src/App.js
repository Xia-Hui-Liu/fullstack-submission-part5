
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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
    sessionStorage.removeItem('loggedIn')
    setUser(null)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleCreate = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    } catch (exception) {
      setMessage('something went wrong')
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }


  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            usernameChange={handleUsernameChange}
            passwordChange={handlePasswordChange}
          />
        </Togglable>
      </div>
    )}
  return(
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p> {user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <NewBlogForm createBlog={handleCreate} />
      {blogs.sort((a,b) => {
        return b.likes - a.likes
      }).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      )}
    </div>
  )
}

export default App