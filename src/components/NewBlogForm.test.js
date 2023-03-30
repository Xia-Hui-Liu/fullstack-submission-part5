import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

describe('NewBlogForm', () => {
  test('calls event handler with correct details when a new blog is created', async() => {
    const onSubmit = jest.fn()
    const user = userEvent.setup()
    render(<NewBlogForm createBlog={onSubmit} />) 

    const titleInput = screen.getByLabelText('Title') 
    const authorInput = screen.getByLabelText('Author')
    const urlInput = screen.getByLabelText('URL')

    const testBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://www.example.com/test-blog',
    }

    await user.type(titleInput, testBlog.title)
    await user.type(authorInput, testBlog.author)
    await user.type(urlInput, testBlog.url)
    await user.click(screen.getByText('create'))

    expect(onSubmit.mock.calls).toHaveLength(1)
    expect(onSubmit.mock.calls[0][0].title).toBe('Test Blog')
  })
})
