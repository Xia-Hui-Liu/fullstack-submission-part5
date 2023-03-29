import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

describe('NewBlogForm', () => {
  test('calls event handler with correct details when a new blog is created', () => {
    const onSubmit = jest.fn()
    render(<NewBlogForm onSubmit={onSubmit} />)
    screen.debug()

    const titleInput = screen.getByLabelText('Title')
    const authorInput = screen.getByLabelText('Author')
    const urlInput = screen.getByLabelText('URL')

    const testBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://www.example.com/test-blog',
    }

    userEvent.type(titleInput, testBlog.title)
    userEvent.type(authorInput, testBlog.author)
    userEvent.type(urlInput, testBlog.url)
    userEvent.click(screen.getByRole('button', { name: 'Create' }))

    expect(onSubmit.mock.calls).toHaveLength(1)
    expect(onSubmit.mock.calls[0][0].title).toBe('Test Blog')
  })
})
