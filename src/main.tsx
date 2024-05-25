import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/index.css'
import { Provider } from 'react-redux'
import { store } from './lib/redux/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './components/AppRouter'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
      <ToastContainer autoClose={3000} />
    </Provider>
  </React.StrictMode>,
)
