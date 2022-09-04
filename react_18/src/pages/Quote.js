import classes from './Quote.module.css'

import { Fragment } from 'react'
import {
  Link,
  Route,
  useRouteMatch
} from 'react-router-dom'
import { fetchAction as sliceFetchAction } from './../redux/pages/quotes/quotes'
import useInitialFetch from './../hooks/pages/initial-fetch'
import Comments from './Comments'
import NotFound from './NotFound'



const Page = () => {
  
  
  
  const slice = useInitialFetch({
    pagesInitialSliceTail: 'quotes.fetch.list',
    sliceFetchAction,
    urlTail: 'list',
    dataTail: 'data',
    actionName: 'set',
    actionSliceTail: 'list',
    sliceTail: 'quotesPage'
  }).slice
  
  
  
  const routerRouteMatchHook = useRouteMatch()

  const quote = slice.list.length > 0 && (slice.list.find(item => item.id === routerRouteMatchHook.params.id))

  
  return (

    <section className={ classes.quote }>



      <h1>quote</h1>

      { quote ? (
        <Fragment>
          <span>{ quote.author }</span>

          <span>{ quote.text }</span>

          <Route path={ `${ routerRouteMatchHook.url }` } exact>
            <Link to={ `${ routerRouteMatchHook.url }/comments` }>
              show comments
            </Link>
          </Route>

          <Route path={ `${ routerRouteMatchHook.url }/comments` }>
            <Link to={ `${ routerRouteMatchHook.url }` }>
              hide
            </Link>
          </Route>

          <Route path={ `${ routerRouteMatchHook.path }/comments` }>
            <Comments />
          </Route>
        </Fragment>
      ) : slice.list.length > 0 && (
        <NotFound message='quote_not_found' />
      ) }
    


    </section>

  )



}



export default Page