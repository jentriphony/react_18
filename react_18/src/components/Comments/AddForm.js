import classes from './AddForm.module.css'

import { useState, useCallback } from 'react'
import { fetchAction as sliceFetchAction } from './../../redux/pages/comments/comments'
import usePagesFetch from './../../hooks/pages/fetch'
import useForm from './../../hooks/ui/form'
import InputRef from './../UI/InputRef'



const AddForm = props => {
  
  
  
  const [textInput, setTextInput] = useState({
    value: '',
    valid: null
  })



  const validationHandler = useCallback(callbackProps => callbackProps.value.trim() !== '', [])

  const inputsGroupHandler = useCallback(callbackProps => {

    for(let iterator = 0; iterator < callbackProps.inputs.length; ++iterator)
      if(!callbackProps.inputs[iterator].id) return
    let inputsValues = {}
    let inputs = []
    for(let iterator = 0; iterator < callbackProps.inputs.length; ++iterator) {
      if(callbackProps.values) {
        inputsValues[callbackProps.inputs[iterator].id] = callbackProps.inputs[iterator].value
        continue
      }
      let input = {}
      for(let withIterator = 0; withIterator < callbackProps.with.length; ++withIterator)
        input[callbackProps.with[withIterator]] = callbackProps.inputs[iterator][callbackProps.with[withIterator]]
      inputs.push(input)
    }
    if(callbackProps.values) {
      inputsValues.id = `item_${ Math.floor(65536 * Math.random()) }`
      return inputsValues
    }
    return inputs

  }, [])
  
  const pagesFetchHookOnFinish = useCallback(() => props.onCancel(), [props.onCancel])



  const pagesFetchHook = usePagesFetch({
    sliceFetchAction,
    urlTail: 'list',
    configuration: {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputsGroupHandler({
        inputs: [textInput],
        values: true
      }))
    },
    onFinish: pagesFetchHookOnFinish,
    actionName: 'add',
    actionSliceTail: 'list'
  })

  const formHook = useForm({
    inputs: inputsGroupHandler({
      inputs: [textInput],
      with: [
        'valid',
        'reset'
      ]
    }),
    submitHandler: pagesFetchHook.handler
  })
  
  
  return (

    <form className={ classes.form } onSubmit={ formHook.submitHandler }>



      <InputRef
        label='text'
        textarea={ {
          id: 'text',
          rows: '4'
        } }
        validationHandler={ validationHandler }
        formActive={ formHook.active }
        Ref={ textInput }
        setRef={ setTextInput }
      />

      <div className={ classes.actions }>
        <button className='btn' type='submit'>
          add
        </button> 
      </div>



    </form>

  )



}



export default AddForm