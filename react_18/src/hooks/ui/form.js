import { useState, useCallback } from 'react'
import { Prompt } from 'react-router-dom'



const Hook = props => {



  const [active, setActive] = useState(null)

  const [focused, setFocused] = useState(null)


  
  const focusHandler = useCallback(() => setFocused(true))
  
  const reset = useCallback(() => {

    active && setActive(false)
    for(let iterator = 0; iterator < props.inputs.length; ++iterator)
      props.inputs[iterator].reset()

  }, [active, props.inputs])
  
  const submitHandler = useCallback(event => {

    event.preventDefault()
    for(let iterator = 0; iterator < props.inputs.length; ++iterator)
      if(!props.inputs[iterator].valid) {
        !active && setActive(true)
        return
      }
    props.submitHandler()
    reset()
    
  }, [props.inputs, active, props.submitHandler, reset])


  return {
    focused,
    focusHandler,
    active,
    submitHandler
  }



}



export default Hook