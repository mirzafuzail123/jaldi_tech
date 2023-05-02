import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import FacebookContextProvider from './Context/FacebookContextProvider'
import BackendContextProvider from './Context/BackendContextProvider'
import CustomRouter from './utils/Router'
import app from './utils/Firebase'

import {
  RouterProvider,
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BackendContextProvider>
    <FacebookContextProvider>
      <CustomRouter />
    </FacebookContextProvider>
  </BackendContextProvider>

)
