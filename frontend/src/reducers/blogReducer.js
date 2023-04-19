import { createSlice } from '@reduxjs/toolkit'
// import { blogService } from '../services/blogs'

const initialState = {
  blogs: [],
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog: (state, action) => {
      state.blogs.push(action.payload)
    },
    updateBlog: (state, action) => {
      const blogIndex = state.blogs.findIndex(blog => blog.id === action.payload.id)
      if (blogIndex !== -1) {
        state.blogs[blogIndex] = action.payload
      }
    },
    removeBlog: (state, action) => {
      const blogIndex = state.blogs.findIndex(blog => blog.id === action.payload)
      if (blogIndex !== -1) {
        state.blogs.splice(blogIndex, 1)
      }
    },
    likeBlog: (state, action) => {
      const blogIndex = state.blogs.findIndex(blog => blog.id === action.payload)
      if (blogIndex !== -1) {
        state.blogs[blogIndex].likes++
      }
    },
    setBlogs (state, action ) {
      return action.payload
    }
  },
})

// export const initializeBlog = () => {
//   return async dispatch => {
//     const blogs = await blogService.getAll()
//     dispatch(setBlogs(blogs))
//   }
// }

export const { addBlog, updateBlog, removeBlog, likeBlog } = blogSlice.actions

export default blogSlice.reducer
