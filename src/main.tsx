import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/index.css'
import { Provider } from 'react-redux'
import { store } from './lib/redux/store'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoginPage, HomePage, ErrorPage } from '@/pages';
import MainLayout from './layouts/MainLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    errorElement: (
      <MainLayout>
        <ErrorPage />
      </MainLayout>
    ),
    children: [
      {
        path: '/',
        element: (
          <HomePage />
        ),
      },
      {
        path: '/home',
        element: (
          <HomePage />
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
