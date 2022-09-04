import classes from './Comments.module.css'

import { useState } from 'react'
import AddForm from './AddForm'
import List from './List'



const Comments = props => {



  const [addFormActive, setAddFormActive] = useState(null)



  const addFormActivationHandler = () => setAddFormActive(state => !state)


  return (

    <section className={ classes.comments }>



      <h2>comments</h2>

      <button className='btn' onClick={ addFormActivationHandler }>
        { addFormActive ? 'cancel' : 'add' }
      </button>

      { addFormActive && (
        <AddForm onCancel={ addFormActivationHandler } />
      ) }

      <List list={ props.sliceList } />


    </section>
    
  )



}



export default Comments