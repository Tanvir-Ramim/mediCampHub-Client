import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import Router from './routes/Router.jsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './Authentication/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <AuthProvider>
    <React.StrictMode>
   <RouterProvider router={Router}/>
  </React.StrictMode>
    </AuthProvider>
  </HelmetProvider>,
)
