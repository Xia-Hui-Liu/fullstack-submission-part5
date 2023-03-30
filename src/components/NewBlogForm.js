import React, { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title, author, url
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type='text'
            value={title}
            name='title'
            id='title'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type='text'
            value={author}
            name='author'
            id='author'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input
            type='url'
            value={url}
            name='url'
            id='url'
            onChange={handleUrlChange}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
