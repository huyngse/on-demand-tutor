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
    TutorDetailPage,
    AdminDashboardPage,
} from '@/pages';
import MainLayout from '@/layouts/MainLayout'
import LoginLayout from '@/layouts/LoginLayout'
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from '@/layouts/AdminLayout'
import ProtectedRoute from './ProtectedRoute';
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
        path: '/admin',
        element: (
            <ProtectedRoute roles={["admin"]}>
                <AdminLayout>
                    <Outlet />
                </AdminLayout>
            </ProtectedRoute>

        ),
        errorElement: (
            <AdminLayout>
                <ErrorPage />
            </AdminLayout>
        ),
        children: [
            {
                path: '/admin/',
                element: (
                    <AdminDashboardPage />
                ),
            },
            {
                path: '/admin/dashboard',
                element: (
                    <AdminDashboardPage />
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


const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter