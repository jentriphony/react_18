import { fetchAction as sliceFetchAction } from './../redux/pages/comments/comments'
import usePagesInitialFetch from './../hooks/pages/initial-fetch'
import Comments from './../components/Comments/Comments'



const Page = () => {



  const pagesInitialFetchHook = usePagesInitialFetch({
    sliceTail: 'commentsPage',
    pagesInitialSliceTail: 'comments.fetch.list',
    sliceFetchAction,
    urlTail: 'list',
    dataTail: 'data',
    actionName: 'set',
    actionSliceTail: 'list'
  }).slice


  return (

    <Comments sliceList={ pagesInitialFetchHook.list } />

  )



}



export default Page