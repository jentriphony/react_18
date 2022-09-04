import { createSlice } from '@reduxjs/toolkit'



const slice = createSlice({
  name: 'pagesUrls',
  initialState: {
    quotes: {
      fetch: {
        list: 'http://localhost:8000/api/comments'
      }
    },
    comments: {
      fetch: {
        list: 'http://localhost:8000/api/comments',
      }
    }
  },
  reducers: {}
})



export const reducer = slice.reducer
export const actions = slice.actions
export default slice