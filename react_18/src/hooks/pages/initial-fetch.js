import {
  useState,
  useCallback,
  useContext,
  useEffect
} from 'react'
import FetchContext from './../../context/fetch'
import { useSelector, useDispatch } from 'react-redux'
import { actions as pagesInitialSliceActions } from './../../redux/pages/initial'



const Hook = props => {



  const fetchContext = useContext(FetchContext)



  const pagesInitialSlice = useSelector(store => store.pagesInitial)

  const pagesSlice = useSelector(store => store[props.sliceTail])



  const dispatch = useDispatch()
  
  
  
  const onFinish = useCallback(onFinishProps => dispatch(pagesInitialSliceActions.set({
    tail: props.pagesInitialSliceTail,
    value: onFinishProps.errorMessage ? false : true
  })), [dispatch, props.pagesInitialSliceTail])

  const getPagesInitialSliceWithTail = useCallback(() => {

    let pagesInitialSliceWithTail = pagesInitialSlice
    const pagesInitialSliceTailArray = props.pagesInitialSliceTail.split('.')
    for(let iterator = 0; iterator < pagesInitialSliceTailArray.length; ++iterator)
      pagesInitialSliceWithTail = pagesInitialSliceWithTail[pagesInitialSliceTailArray[iterator]]
    return pagesInitialSliceWithTail
    
  }, [pagesInitialSlice, props.pagesInitialSliceTail])

  
  
  const [pagesInitialSliceWithTail, ] = useState(getPagesInitialSliceWithTail())
  
  
  
  useEffect(() => {

    !pagesInitialSliceWithTail && dispatch(props.sliceFetchAction({
      onStart: props.onStart,
      handler: fetchContext.handler,
      urlTail: props.urlTail,
      configuration: props.configuration,
      dataTail: props.dataTail,
      onSuccess: props.onSuccess,
      onSuccessProps: props.onSuccessProps,
      onError: props.onError,
      onErrorProps: props.onErrorProps,
      onFinish,
      actionName: props.actionName,
      actionProps: props.actionProps,
      actionSliceTail: props.actionSliceTail
    }))

  }, [
    pagesInitialSliceWithTail,
    dispatch,
    props.onStart,
    fetchContext.handler,
    props.urlTail,
    props.configuration,
    props.dataTail,
    props.onSuccess,
    props.onSuccessProps,
    props.onError,
    props.onErrorProps,
    onFinish,
    props.actionName,
    props.actionProps,
    props.actionSliceTail
  ])


  return { slice: pagesSlice }



}



export default Hook