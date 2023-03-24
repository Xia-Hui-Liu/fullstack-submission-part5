// import React from 'react'
// import { render, screen, fireEvent } from '@testing-library/react'
// import NewBlogForm from './NewBlogForm'

// describe('<NewBlogForm />', () => {
//   test('submitting the form calls the handleCreate function with the correct values', () => {
//     const handleCreate = jest.fn()
//     const title = 'Test title'
//     const author = 'Test author'
//     const url = 'http://example.com'
//     render(
//       <NewBlogForm
//         handleCreate={handleCreate}
//         title={title}
//         author={author}
//         url={url}
//         titleChange={}
//         authorChange={}
//         urlChange={}
//       />
//     )

//     const titleInput = screen.getByLabelText('Title Content')
//     fireEvent.change(titleInput, { target: { value: 'New title' } })

//     const authorInput = screen.getByLabelText('Test author')
//     fireEvent.change(authorInput, { target: { value: 'New author' } })

//     const urlInput = screen.getByLabelText('http://example.com')
//     fireEvent.change(urlInput, { target: { value: 'http://new-example.com' } })

//     const sendButton = screen.getByText('create')
//     fireEvent.click(sendButton)

//     expect(handleCreate).toHaveBeenCalledTimes(1)
//     expect(handleCreate).toHaveBeenCalledWith({
//       title: 'New title',
//       author: 'New author',
//       url: 'http://new-example.com',
//     })
//   })
// })
