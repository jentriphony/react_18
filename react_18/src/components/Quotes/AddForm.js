import classes from './AddForm.module.css'

import { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, Prompt } from 'react-router-dom'
import { fetchAction as sliceFetchAction } from './../../redux/pages/quotes/quotes'
import usePagesFetch from './../../hooks/pages/fetch'
import useForm from './../../hooks/ui/form'
import InputRef from './../UI/InputRef'
import Card from './../UI/Card'
import LoadingSpinner from './../UI/LoadingSpinner'



const AddForm = props => {



  const [
    [authorInput, setAuthorInput],
    [textInput, setTextInput],
    [fetchError, setFetchError]
  ] = [
    useState({
      value: '',
      valid: null
    }),
    useState({
      value: '',
      valid: null
    }),
    useState(false)
  ]



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

  const pagesPathsSlice = useSelector(store => store.pagesPaths)
  const historyHook = useHistory()
  const pagesFetchHookOnFinish = useCallback(callbackProps => {

    if(callbackProps.errorMessage) {
      setFetchError(true)
      return
    }
    setFetchError(false)
    historyHook.push(pagesPathsSlice.quotes.list.path)

  }, [historyHook.push, pagesPathsSlice.quotes.list.path])



  const pagesFetchHook = usePagesFetch({
    sliceFetchAction,
    urlTail: 'list',
    configuration: {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputsGroupHandler({
        inputs: [
          authorInput,
          textInput
        ],
        values: true
      }))
    },
    onFinish: pagesFetchHookOnFinish,
    actionName: 'add',
    actionSliceTail: 'list'
  })
  
  const formHook = useForm({
    inputs: inputsGroupHandler({
      inputs: [
        authorInput,
        textInput
      ],
      with: [
        'valid',
        'reset'
      ]
    }),
    submitHandler: pagesFetchHook.handler
  })


  return (

    <Card>



      <form
        className={ classes.form }
        onFocus={ formHook.focusHandler }
        onSubmit={ formHook.submitHandler }
      >
        { props.isLoading && (
          <div className={ classes.loading }>
            <LoadingSpinner />
          </div>
        ) }

        <InputRef
          label='author'
          input={ {
            id: 'author',
            type: 'text'
          } }
          formActive={ formHook.active }
          validationHandler={ validationHandler }
          Ref={ authorInput }
          setRef={ setAuthorInput }
        />

        <InputRef
          label='text'
          textarea={ {
            id: 'text',
            rows: '4'
          } }
          formActive={ formHook.active }
          validationHandler={ validationHandler }
          Ref={ textInput }
          setRef={ setTextInput }
        />

        <div className={ classes.actions }>
          <button className='btn' type='submit'>
            add
          </button>
        </div>
      </form>

      <Prompt when={ formHook.focused && fetchError } message={ location => `go to ${ location.pathname.slice(1) } ?` } />



    </Card>

  )



}



export default AddForm