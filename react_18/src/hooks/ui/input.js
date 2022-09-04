import { useState, useCallback } from 'react'



const Hook = props => {


  const [active, setActive] = useState(null)



  const inputHandler = useCallback(event => props.setRef(state => ({
    ...state,
    value: event.target.value
  })) || ((active || props.formActive) && !props.Ref.valid && props.setRef(state => ({
    ...state,
    valid: props.validationHandler({ value: event.target.value })
  }))), [
    props.setRef,
    active,
    props.formActive,
    props.Ref.valid,
    props.validationHandler
  ])

  const blurHandler = useCallback(() => (!active && setActive(true)) || props.setRef(state => ({
    ...state,
    valid: props.validationHandler({ value: props.Ref.value })
  })), [active, props.setRef, props.Ref.value])

  const reset = useCallback(() => (active && setActive(false)) || props.setRef(state => ({
    ...state,
    value: '',
    valid: null
  })), [props.setRef])


  return {
    showError: (active || props.formActive) && !props.Ref.valid,
    inputHandler,
    blurHandler,
    reset
  }



}



export default Hook