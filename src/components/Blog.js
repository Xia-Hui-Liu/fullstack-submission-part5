import React, { useState } from 'react'

const Blog = ({blog}) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  return (
    <div className='blog-style'>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    </div>  
  )
    }

export default Blog