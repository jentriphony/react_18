import { createSlice } from '@reduxjs/toolkit'



const slice = createSlice({
  name: 'layoutHeaderNotification',
  initialState: {
    visible: null,
    status: null,
    message: null
  },
  reducers: {
    set: (slice, props) => {
      slice.visible = props.payload.visible || null
      slice.status = props.payload.status || null
      slice.message = props.payload.message || null
    },
    unset: slice => {
      slice.visible = null
      slice.status = null
      slice.message = null
    }
  }
})



export const reducer = slice.reducer
export const actions = slice.actions
export default slice