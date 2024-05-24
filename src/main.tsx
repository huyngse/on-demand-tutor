import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/index.css'
import { Provider } from 'react-redux'
import { store } from './lib/redux/store'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  LoginPage,
  HomePage,
  ErrorPage,
  RecoverPasswordPage,
  ForgetPasswordPage,
  RegisterPage,
  TutorListPage,
  ClassListPage,
  TutorDetailPage
} from '@/pages';
import MainLayout from './layouts/MainLayout'
import LoginLayout from './layouts/LoginLayout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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
    path: '/tutor-list',
    element: (
      <MainLayout>
        <TutorListPage />
      </MainLayout>
    ),
  },
  {
    path: '/tutor/:id',
    element: (
      <MainLayout>
        <TutorDetailPage />
      </MainLayout>
    ),
  },
  {
    path: '/class-list',
    element: (
      <MainLayout>
        <ClassListPage />
      </MainLayout>
    ),
  },
  {
    path: '/login',
    element: (
      <LoginLayout>
        <LoginPage />
      </LoginLayout>
    ),
  },
  {
    path: '/recover-password',
    element: (
      <LoginLayout>
        <RecoverPasswordPage />
      </LoginLayout>
    ),
  },
  {
    path: '/forget-password',
    element: (
      <LoginLayout>
        <ForgetPasswordPage />
      </LoginLayout>
    ),
  },
  {
    path: '/register',
    element: (
      <LoginLayout>
        <RegisterPage />
      </LoginLayout>
    ),
  },
]);
const adminRouter = createBrowserRouter([
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
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer autoClose={3000}/>
    </Provider>
  </React.StrictMode>,
)
