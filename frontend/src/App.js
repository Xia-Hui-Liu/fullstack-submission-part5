import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'

import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')
  const blogFormRef = useRef()
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const notifyWith = (message) => {
    dispatch(setNotification(message))

    setTimeout(() => {
      dispatch(setNotification(null))
    }, 3000)
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      storageService.saveUser(user)
      notifyWith('welcome!')
    } catch (e) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const logout = async () => {
    setUser(null)
    storageService.removeUser()
    notifyWith('logged out')
  }

  const createBlog = async (newBlog) => {
    const createdBlog = await blogService.create(newBlog)
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`)
    setBlogs(blogs.concat(createdBlog))
    blogFormRef.current.toggleVisibility()
  }

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const updatedBlog = await blogService.update(blogToUpdate)
    dispatch(setNotification(`A like for the blog '${blog.title}' by '${blog.author}'`))
    setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
  }

  const remove = async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if (ok) {
      await blogService.remove(blog.id)
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
    }
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={notification} />
        <LoginForm login={login} />
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs.sort(byLikes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username===user.username}
            remove={() => remove(blog)}
          />
        )}
      </div>
    </div>
  )
}

export default App
