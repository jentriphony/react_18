import classes from './Navigation.module.css'

import { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'



const Navigation = () => {
  
  
  
  const pagesPathsSlice = useSelector(store => store.pagesPaths)



  const listDOMHandler = useCallback(() => {

    let navigationLinks = []
    for(const [, value] of Object.entries(pagesPathsSlice.quotes)) {
      navigationLinks.push((
        <li key={ value.path }>
          <NavLink activeClassName={ classes.active } to={ value.path }>
            { value.path.slice(1) }
          </NavLink>
        </li>
      ))
    }
    return navigationLinks

  }, [pagesPathsSlice.quotes])



  const [linksDOM, ] = useState((
    <ul>
      { listDOMHandler() }
    </ul>
  ))
  
  return (

    <nav className={ classes.nav }>



      { linksDOM }



    </nav>

  )



}



export default Navigation