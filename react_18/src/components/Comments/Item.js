import classes from './Item.module.css'



const Item = props => {



  return (

    <li className={ classes.item }>



      <p>{ props.item.text }</p>



    </li>

  )



}



export default Item