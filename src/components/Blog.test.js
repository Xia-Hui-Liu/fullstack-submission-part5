import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import axios from 'axios'
import Blog from './Blog'

jest.mock('axios')

describe('Blog', () => {
  const blog ={
    id: '641a01501d1ab52d8d62b44f',
    title: 'second time',
    author: 'Sherry',
    url: 'www.secondtime.com',
    likes: 5,
    user: {
      name: 'Admini'
    }
  }

  const blogs = [blog]
  let setBlogs

  beforeEach(() => {
    setBlogs = jest.fn()
    render(<Blog blog={blog} blogs={blogs} setBlogs={setBlogs} />)
  })

  test('renders title and author', () => {
    expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeDefined()
  })

  test('renders details when view button is clicked', () => {
    fireEvent.click(screen.getByText('view'))
    expect(screen.getByText(blog.url)).toBeDefined()
    expect(screen.getByText(`likes ${blog.likes}`)).toBeDefined()
    expect(screen.getByText(blog.user.name)).toBeDefined()
  })

  test('should update likes when like button is clicked', async() => {
    axios.put.mockResolvedValueOnce({
      data: {
        ...blog,
        likes: blog.likes + 1
      }
    })

    fireEvent.click(screen.getByText('like'))
    await screen.findByText(`likes ${blog.likes + 1}`)

    expect(screen.getByText(`likes ${blog.likes + 1}`)).toBeDefined()
    expect(setBlogs).toHaveBeenCalledWith([{
      ...blog,
      likes: blog.likes + 1
    }])
  })
})