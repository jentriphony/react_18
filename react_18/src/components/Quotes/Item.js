import classes from './Item.module.css'

import { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFull as pagesPathsSliceGetFull } from './../../redux/pages/paths'
import Modal from './../UI/Modal'



const Item = props => {



  const [fullScreenActive, setFullScreen] = useState(null)
  
  
  
  const pagesPathsSlice = useSelector(store => store.pagesPaths)



  const fullPathHandler = useCallback(() => {

    const result = { path: null }
    pagesPathsSliceGetFull({
      target: { path: '/quote' },
      result,
      currentElement: pagesPathsSlice.quotes.list,
      currentPath: ''
    })
    return result

  }, [])

  const fullScreenActivationHandler = useCallback(event => event.preventDefault() || setFullScreen(state => !state), [])



  const [path, setPath] = useState(fullPathHandler().path)
  
  
  return (

    <li className={ classes.item }>



      <figure>
        <blockquote>
          <Link to={ `${ path }/${ props.item.id }` }>
            { props.item.text }
          </Link>
        </blockquote>

        <figcaption>{ props.item.author }</figcaption>
      </figure>

      <a
        className='btn'
        href='#'
        onClick={ fullScreenActivationHandler }
      >
        full_screen
      </a>

      { fullScreenActive && (
        <Modal onBackdropClick={ fullScreenActivationHandler }>
          <figure className={ classes['full-screen'] }>
            <blockquote>
              <Link to={ `${ path }/${ props.item.id }` }>
                { props.item.text }
              </Link>
            </blockquote>

            <figcaption>{ props.item.author }</figcaption>
          </figure>
        </Modal>
      ) }



    </li>

  )



}



export default Item