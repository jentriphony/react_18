import { createSlice } from '@reduxjs/toolkit'



const slice = createSlice({
  name: 'pagesInitial',
  initialState: {
    quotes: {
      fetch: {
        list: null
      }
    },
    comments: {
      fetch: {
        list: null
      }
    }
  },
  reducers: {
    set: (slice, props) => {
      const tailArray = props.payload.tail.split('.')
      let target = slice[tailArray[0]]
      for(let iterator = 1; iterator < tailArray.length - 1; ++iterator)
        target = target[tailArray[iterator]]
      target[tailArray[tailArray.length - 1]] = props.payload.value
      // slice[tailArray[0]][tailArray[1]][tailArray[2]] = props.payload.value
    }
  }
})



export const reducer = slice.reducer
export const actions = slice.actions
export default slice