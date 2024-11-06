import ServiceStorage from '@/globals/storage'
import { createWebHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// layouts
const GuestLayout = () => import('@/layouts/GuestLayout.vue')
const DefaultLayout = () => import('@/layouts/DefaultLayout.vue')
// pages
const LoginPage = () => import('@/modules/auth/pages/Login.vue')
const RegisterPage = () => import('@/modules/register/pages/Register.vue')
const TasksPage = () => import('@/modules/tasks/pages/Tasks.vue')
const ProfilePage = () => import('@/modules/user/pages/Profile.vue')

const NotFoundPage = () => import('@/views/NotFound.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: DefaultLayout,

        children: [
            {
                path: '',
                name: 'Index',
                redirect: '/login',
            },
            {
                path: 'tasks',
                name: 'Tasks',
                component: TasksPage,
                meta: { requiresAuth: true },
            },
            {
                path: 'perfil',
                name: 'Profile',
                component: ProfilePage,
                meta: { requiresAuth: true },
            },
        ],
    },
    {
        path: '/',
        component: GuestLayout,
        children: [
            {
                path: 'login',
                name: 'Login',
                component: LoginPage,
            },
            {
                path: 'register',
                name: 'Register',
                component: RegisterPage,
            },
        ],
    },
    {
        path: '/:catchAll(.*)*',
        name: 'NotFound',
        component: NotFoundPage,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    console.log(from)
    const isAuthenticated = ServiceStorage.getToken() !== null

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})
export default router
