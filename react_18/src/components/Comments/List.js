import classes from './List.module.css'

import { Fragment } from 'react'
import Item from './Item'



const List = props => {
  

  
  return (

    <Fragment>



      { props.list.length > 0 && (
        <ul className={ classes.list }>
          { props.list.map(item => (
            <Item key={ item.id } item={ item } />
          )) }
        </ul>
      ) }



    </Fragment>

  )



}



export default List