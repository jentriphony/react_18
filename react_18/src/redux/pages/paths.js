import { createSlice } from '@reduxjs/toolkit'



const slice = createSlice({
  name: 'pagesPaths',
  initialState: {
    quotes: {
      list: {
        path: '/quotes',
        children: {
          item: {
            path: '/quote',
            children: {
              withComments: {
                path: '/comments',
                children: null
              }
            }
          }
        }
      },
      addQuote: {
        path: '/add-quote',
        children: null
      }
    }
  },
  reducers: {}
})
export const getFull = (props) => {

  if(props.result.path)
    return
  if(props.currentElement.path === props.target.path) {
    props.result.path = props.currentPath + props.currentElement.path
    return
  }
  if(props.currentElement.children)
    for(const [, value] of Object.entries(props.currentElement.children))
      getFull({
        target: props.target,
        result: props.result,
        currentElement: value,
        currentPath: props.currentPath + props.currentElement.path
      })
      
}



export const reducer = slice.reducer
export const actions = slice.actions
export default slice