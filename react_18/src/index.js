import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/index'
import { BrowserRouter } from 'react-router-dom'
import { Provider as FetchProvider } from './context/fetch'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(

  // <React.StrictMode>



    <Provider store={ store }>
      <FetchProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FetchProvider>
    </Provider>



  // </React.StrictMode>

)