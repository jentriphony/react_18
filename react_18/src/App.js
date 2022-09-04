import { useSelector } from 'react-redux'
import { getFull as pagesPathsSliceGetFull } from './redux/pages/paths'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Quotes from './pages/Quotes'
import Quote from './pages/Quote'
import AddQuote from './pages/AddQuote'
import NotFound from './pages/NotFound'



function App() {



  const pagesPathsSlice = useSelector(store => store.pagesPaths)

  const quotePagePath = { path: null }
  pagesPathsSliceGetFull({
    target: { path: '/quote' },
    result: quotePagePath,
    currentElement: pagesPathsSlice.quotes.list,
    currentPath: ''
  })
  
  
  return (

    <Layout>



      <Switch>
        <Route path='/' exact>
          <Redirect to={ pagesPathsSlice.quotes.list.path } />
        </Route>

        <Route path={ pagesPathsSlice.quotes.list.path } exact>
          <Quotes />
        </Route>

        <Route path={ `${ quotePagePath.path }/:id` }>
          <Quote />
        </Route>

        <Route path={ pagesPathsSlice.quotes.addQuote.path }>
          <AddQuote />
        </Route>

        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>



    </Layout>

  )



}



export default App