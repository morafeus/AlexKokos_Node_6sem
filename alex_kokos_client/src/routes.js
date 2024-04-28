import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Course from './pages/Course'
import MainPage from './pages/MainPage'
import My_main from './pages/My_main'
import Profile from './pages/Profile'
import MyCourse from './pages/MyCourse'
import {ADMIN_ROUTE, MAIN_ROUTE, LOGIN_ROUTE, REGESTRATE_ROUTE, COURSE_ROUTE, MY_COURSE_ROUTE, MY_PROFILE, MY_MAIN_ROUTE} from './utils/consts'

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
]

export const authRoutes = [
    {
        path: MY_MAIN_ROUTE,
        Component: My_main
    },
    {
        path: MY_PROFILE,
        Component: Profile
    },
    {
        path: MY_COURSE_ROUTE,
        Component: MyCourse
    },

]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGESTRATE_ROUTE,
        Component: Auth
    },
    {
        path: COURSE_ROUTE + '/:id',
        Component: Course
    },
]