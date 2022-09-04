import { useCallback, useContext } from 'react'
import FetchContext from './../../context/fetch'
import { useDispatch } from 'react-redux'



const Hook = props => {



  const fetchContext = useContext(FetchContext)



  const dispatch = useDispatch()


  
  const handler = useCallback(() => dispatch(props.sliceFetchAction({
    onStart: props.onStart,
    handler: fetchContext.handler,
    urlTail: props.urlTail,
    configuration: props.configuration,
    dataTail: props.dataTail,
    onSuccess: props.onSuccess,
    onSuccessProps: props.onSuccessProps,
    onError: props.onError,
    onErrorProps: props.onErrorProps,
    onFinish: props.onFinish,
    onFinishProps: props.onFinishProps,
    actionName: props.actionName,
    actionProps: props.actionProps,
    actionSliceTail: props.actionSliceTail
  })), [
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
    props.onFinish,
    props.onFinishProps,
    props.actionName,
    props.actionProps,
    props.actionsSliceTail
  ])


  return { handler }



}



export default Hook