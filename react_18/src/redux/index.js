import { configureStore } from "@reduxjs/toolkit"
import { reducer as quotesPageSliceReducer } from './pages/quotes/quotes'
import { reducer as commentsPageSliceReducer } from './pages/comments/comments'
import { reducer as layoutHeaderNotificationSliceReducer } from './ui/layout-header-notification'
import { reducer as pagesUrlsSliceReducer } from './pages/urls'
import { reducer as pagesPathsSliceReducer } from './pages/paths'
import { reducer as pagesInitialSliceReducer } from './pages/initial'



const store = configureStore({
  reducer: {
    quotesPage: quotesPageSliceReducer,
    commentsPage: commentsPageSliceReducer,
    layoutHeaderNotification: layoutHeaderNotificationSliceReducer,
    pagesUrls: pagesUrlsSliceReducer,
    pagesPaths: pagesPathsSliceReducer,
    pagesInitial: pagesInitialSliceReducer
  }
})



export default store