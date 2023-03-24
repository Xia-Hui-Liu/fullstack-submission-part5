import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const handleUpdate = async () => {
    try {
      const updatedBlog = await blogService.update(blog.id,{
        ...blog,
        likes: blog.likes + 1
      })
      setLikes(likes + 1)
      setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
    }
  }

  return (
    <div className='blog-style'>
      {blog.title} {blog.author} <button data-testid={`view-button-${blog.id}`} onClick={toggleVisibility}>view</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {likes} <button onClick={handleUpdate}>like</button></p>
        <p>{blog.user.name}</p>
        <button type='button' data-testid={`remove-button-${blog.id}`} onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

export default Blog
