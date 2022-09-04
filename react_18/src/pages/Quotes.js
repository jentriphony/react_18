import classes from './Quotes.module.css'

import { fetchAction as sliceFetchAction } from './../redux/pages/quotes/quotes'
import usePagesInitialFetch from './../hooks/pages/initial-fetch'
import List from './../components/Quotes/List'



const Page = () => {
  

  


  
  
  const slice = usePagesInitialFetch({
    pagesInitialSliceTail: 'quotes.fetch.list',
    sliceFetchAction,
    urlTail: 'list',
    dataTail: 'data',
    actionName: 'set',
    actionSliceTail: 'list',
    sliceTail: 'quotesPage'
  }).slice
  
  
  return (

    <section className={ classes.quotes }>



      <h1>quotes</h1>

      <List list={ slice.list } />



    </section>

  )



}




export default Page