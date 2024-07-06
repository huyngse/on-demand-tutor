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
    AdminManageAccountPage,
    AdminUpdateAccountPage,
    TutorProfilePage,
    TutorDashboardPage,
    TutorUpdateProfilePage,
    TutorCertification,
    AdminManageTutorPage,
    AdminTutorDetailPage,
    AdminUpdateTutorPage,
    StudentProfilePage,
    StudentUpdateProfilePage,
    TutorClassPage,
    TutorCreateClassPage,
    TutorClassDetailPage,
    TutorUpdateClassPage,
    ClassDetailPage,
    AdminManageClassPage,
    StudentClassPage,
    StudentClassDetailPage,
} from '@/pages';
import MainLayout from '@/layouts/MainLayout'
import LoginLayout from '@/layouts/LoginLayout'
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from '@/layouts/AdminLayout'
import ProtectedRoute from './ProtectedRoute';
import TutorLayout from '@/layouts/TutorLayout';
import StudentLayout from '@/layouts/StudentLayout';
import { Roles } from '@/constants/roles';
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
            <ProtectedRoute roles={[Roles.Admin]}>
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
            {
                path: '/admin/manage-account',
                element: (
                    <AdminManageAccountPage />
                ),
            },
            {
                path: '/admin/account/:accountId/edit',
                element: (
                    <AdminUpdateAccountPage />
                ),
            },
            {
                path: '/admin/manage-tutor',
                element: (
                    <AdminManageTutorPage />
                ),
            },
            {
                path: '/admin/tutor/:tutorId',
                element: (
                    <AdminTutorDetailPage />
                ),
            },
            {
                path: '/admin/tutor/:tutorId/edit',
                element: (
                    <AdminUpdateTutorPage />
                ),
            },
            {
                path: '/admin/manage-class',
                element: (
                    <AdminManageClassPage />
                ),
            },
        ],
    },
    // ############################## TUTOR #################################
    {
        path: '/tutor',
        element: (
            <ProtectedRoute roles={[Roles.Tutor]}>
                <TutorLayout>
                    <Outlet />
                </TutorLayout>
            </ProtectedRoute>

        ),
        errorElement: (
            <TutorLayout>
                <ErrorPage />
            </TutorLayout>
        ),
        children: [
            {
                path: '/tutor/',
                element: (
                    <TutorDashboardPage />
                ),
            },
            {
                path: '/tutor/dashboard',
                element: (
                    <TutorDashboardPage />
                ),
            },
            {
                path: '/tutor/profile',
                element: (
                    <TutorProfilePage />
                ),
            },
            {
                path: '/tutor/profile/edit',
                element: (
                    <TutorUpdateProfilePage />
                ),
            },
            {
                path: '/tutor/certification',
                element: (
                    <TutorCertification />
                ),
            },
            {
                path: '/tutor/class',
                element: (
                    <TutorClassPage />
                ),
            },
            {
                path: '/tutor/class/:classId',
                element: (
                    <TutorClassDetailPage />
                ),
            },
            {
                path: '/tutor/class/:classId/edit',
                element: (
                    <TutorUpdateClassPage />
                ),
            },
            {
                path: '/tutor/class/create',
                element: (
                    <TutorCreateClassPage />
                ),
            },
        ],
    },
    // ############################## STUDENT #################################
    {
        path: '/student',
        element: (
            <ProtectedRoute roles={[Roles.Student]}>
                <StudentLayout>
                    <Outlet />
                </StudentLayout>
            </ProtectedRoute>

        ),
        errorElement: (
            <StudentLayout>
                <ErrorPage />
            </StudentLayout>
        ),
        children: [
            {
                path: '/student/',
                element: (
                    <StudentProfilePage />
                ),
            },
            {
                path: '/student/class',
                element: (
                    <StudentClassPage />
                ),
            },
            {
                path: '/student/class/:bookingId',
                element: (
                    <StudentClassDetailPage />
                ),
            },
            {
                path: '/student/profile',
                element: (
                    <StudentProfilePage />
                ),
            },
            {
                path: '/student/profile/edit',
                element: (
                    <StudentUpdateProfilePage />
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
        path: '/tutor/:tutorId',
        element: (
            <MainLayout>
                <TutorDetailPage />
            </MainLayout>
        ),
    },
    {
        path: '/class/:classId',
        element: (
            <MainLayout>
                <ClassDetailPage />
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