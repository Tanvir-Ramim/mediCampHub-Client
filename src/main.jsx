import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import Router from './routes/Router.jsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './Authentication/AuthProvider.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
    <AuthProvider>
    <React.StrictMode>
   <RouterProvider router={Router}/>
  </React.StrictMode>
    </AuthProvider>
  </HelmetProvider>
  </QueryClientProvider>,
)
