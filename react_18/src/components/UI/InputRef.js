import classes from './Input.module.css'

import { useEffect } from 'react'
import useInput from './../../hooks/ui/input'



const InputRef = props => {



  const inputHook = useInput({
    validationHandler: props.validationHandler,
    formActive: props.formActive,
    Ref: props.Ref,
    setRef: props.setRef
  })



  useEffect(() => {

    props.setRef(state => ({
      ...state,
      id: (props.input && props.input.id) || props.textarea.id,
      reset: inputHook.reset
    }))

  }, [props.setRef, (props.input && props.input.id) || props.textarea.id, inputHook.reset])


  return (

    <div className={ classes.input }>



      <label htmlFor={ (props.input && props.input.id) || props.textarea.id }>
        { props.label }
      </label>

      { props.input ? (
        <input
          { ...props.input }
          value={ props.Ref.value }
          onBlur={ inputHook.blurHandler }
          onInput={ inputHook.inputHandler }
        />
      ) : (
        <textarea
          { ...props.textarea }
          value={ props.Ref.value }
          onBlur={ inputHook.blurHandler }
          onInput={ inputHook.inputHandler }
        />
      ) }



    </div>

  )



}



export default InputRef