import classes from './List.module.css'

import {
  useState,
  useCallback,
  useEffect,
  Fragment
} from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import Item from './Item'
import NotFound from './NotFound'



const List = props => {



  const [list, setList] = useState(null)



  const pagesInitialSlice = useSelector(store => store.pagesInitial)



  const routerHistoryHook = useHistory()
  const routerLocationHook = useLocation()
  const sort = new URLSearchParams(routerLocationHook.search).get('sort')
  const sortingHandler = useCallback(() => routerHistoryHook.push({
    pathname: routerLocationHook.pathname,
    search: `?sort=${ sort === 'ascending' ? 'descending' : 'ascending' }`
  }), [routerHistoryHook.push, routerHistoryHook.location.pathname, sort])



  useEffect(() => {

    setList({
      list: JSON.parse(JSON.stringify(props.list)),
      sort: null
    })

  }, [props.list])

  if(list && list.list && list.list.length > 0)
    if(sort === 'ascending' && list.sort !== 'ascending')
      setList(state => ({
        list: JSON.parse(JSON.stringify(state.list)).sort((item_1, item_2) => +item_1.id.slice(5) - +item_2.id.slice(5)),
        sort: 'ascending'
      }))
    else if(sort === 'descending' && list.sort !== 'descending')
      setList(state => ({
        list: JSON.parse(JSON.stringify(state.list)).sort((item_1, item_2) => +item_1.id.slice(5) - +item_2.id.slice(5)).reverse(),
        sort: 'descending'
      }))
  
  
  return (

    <Fragment>



      { list && list.list.length > 0 ? (
        <Fragment>
          <button
            className={ classes['sort-button'] }
            type='button'
            onClick={ sortingHandler }
          >
            { `sort_${ sort === 'ascending' ? 'descending' : 'ascending' }` }
          </button>
          <ul className={ classes.list }>
            { list.list.map(item => (
              <Item key={ item.id } item={ item } />
            )) }
          </ul>
        </Fragment>
      ) : pagesInitialSlice.quotes.fetch.list && (
        <NotFound />
      ) }



    </Fragment>

  )



}



export default List