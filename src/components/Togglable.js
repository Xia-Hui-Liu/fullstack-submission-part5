import { useState } from 'react'
import NewBlogForm from './NewBlogForm'
import blogService from '../services/blogs'

const Togglable = ({ setMessage, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
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
      setMessage(null)
    }, 5000)
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


  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>Create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <NewBlogForm
          handleCreate={handleCreate}
          title={title}
          author={author}
          url={url}
          titleChange={handleTitleChange}
          authorChange={handleAuthorChange}
          urlChange={handleUrlChange}
        />
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable