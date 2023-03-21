import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const handleUpdate = (e) => {
    e.preventDefault()

    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    blogService.update(blog.id, updatedBlog)
    setLikes(likes + 1)
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
    }
  }

  return (
    <div className='blog-style'>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {likes} <button onClick={handleUpdate}>like</button></p>
        <p>{blog.user.name}</p>
        <button type='button' onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

export default Blog
