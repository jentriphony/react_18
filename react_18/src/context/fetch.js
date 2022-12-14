import { createContext } from 'react'



const Context = createContext()
export const Provider = props => {



  const handler = async handlerProps => {

    handlerProps.onStart && handlerProps.onStart(handlerProps.onStartProps && handlerProps.onStartProps)
    try {
      const response = await fetch(handlerProps.url, handlerProps.configuration)
      if(!response.ok) throw new Error('error_fetch')
      let data = await response.json()
      if(handlerProps.dataTail) {
        const dataTailArray = handlerProps.dataTail.split('.')
        for(let iterator = 0; iterator < dataTailArray.length; ++iterator)
          data = data[dataTailArray[iterator]]
      }
      handlerProps.onSuccess && handlerProps.onSuccess({
        props: handlerProps.onSuccessProps,
        data
      })
      handlerProps.onFinish && handlerProps.onFinish({ data })
      return data
    } catch(error) {
      handlerProps.onError && handlerProps.onError({
        props: handlerProps.onErrorProps,
        errorMessage: error.message
      })
      handlerProps.onFinish && handlerProps.onFinish({ errorMessage: error.message })
      return { errorMessage: error.message }
    }


  }
  
  
  return (

    <Context.Provider value={ { handler } }>



      { props.children }



    </Context.Provider>

  )



}



export default Context