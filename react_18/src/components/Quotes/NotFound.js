import classes from './NotFound.module.css'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const NotFound = () => {



  const pagesPathsSlice = useSelector(store => store.pagesPaths)
  
  
  return (
    
    <div className={ classes['not-found'] }>



      <p>quotes_not_found</p>

      <Link to={ pagesPathsSlice.quotes.addQuote.path } className='btn'>
        add
      </Link>



    </div>

  )



}



export default NotFound