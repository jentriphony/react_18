import { createSlice } from '@reduxjs/toolkit'
import { actions as layoutHeaderNotificationSliceActions } from './../../ui/layout-header-notification'
import pagesUrlsSlice from './../urls'



const slice = createSlice({
  name: 'quotesPage',
  initialState: { list: [] },
  reducers: {
    set: (slice, props) => {
      if(props.payload.errorMessage) return
      const sliceTailArray = props.payload.sliceTail.split('.')
      if(sliceTailArray.length === 1) {
        slice[sliceTailArray[0]] = props.payload.data
        return
      }
      let sliceWithTail = slice
      for(let iterator = 0; iterator < sliceTailArray.length - 1; ++iterator)
        sliceWithTail = sliceWithTail[sliceTailArray[iterator]]
      sliceWithTail[sliceTailArray[sliceTailArray.length - 1]] = props.payload.data
    },
    add: (slice, props) => {
      if(props.payload.errorMessage) return
      const sliceTailArray = props.payload.sliceTail.split('.')
      if(sliceTailArray.length === 1) {
        slice[sliceTailArray[0]].push(props.payload.data)
        return
      }
      let sliceWithTail = slice
      for(let iterator = 0; iterator < sliceTailArray.length - 1; ++iterator)
        sliceWithTail = sliceWithTail[sliceTailArray[iterator]]
      sliceWithTail[sliceTailArray[sliceTailArray.length - 1]].push(props.payload.data)
    }
  }
})
export const fetchAction = props => {
  return async dispatch => {
    const onStart = () => {
      dispatch(layoutHeaderNotificationSliceActions.set({
        visible: true,
        status: 'loading',
        message: `quotes_page_fetch_${ props.actionName }`
      }))
      props.onStart && props.onStart()
    }
    const onSuccess = successProps => {
      dispatch(layoutHeaderNotificationSliceActions.set({
        visible: true,
        status: 'success',
        message: `quotes_page_fetch_${ props.actionName }`
      }))
      props.onSuccess && props.onSuccess({
        props: props.onSuccessProps,
        data: successProps
      })
    }
    const onError = errorProps => {
      dispatch(layoutHeaderNotificationSliceActions.set({
        visible: true,
        status: 'error',
        message: `quotes_page_fetch_${ props.actionName }`
      }))
      props.onError && props.onError({
        props: props.onErrorProps,
        errorMessage: errorProps
      })
    }
    const result = await props.handler({
      onStart,
      url: pagesUrlsSlice.getInitialState().quotes.fetch[props.urlTail],
      configuration: props.configuration,
      dataTail: props.dataTail,
      onSuccess,
      onError,
      onFinish: props.onFinish
    })
    const resultProp = result.errorMessage ? { errorMessage: result.errorMessage } : { data: result }
    return dispatch(slice.actions[props.actionName]({
      props: props.actionProps,
      ...resultProp,
      sliceTail: props.actionSliceTail
    }))
  }
}



export const reducer = slice.reducer
export const actions = slice.actions
export default slice