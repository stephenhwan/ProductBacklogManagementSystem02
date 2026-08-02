import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue'),
        meta: { guestOnly: true },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/RegisterView.vue'),
        meta: { guestOnly: true },
    },
    {
        path: '/',
        component: () => import('../views/DashboardView.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'for-me',
                component: () => import('../components/home/home.vue'), // danh sách project
            },
            {
                path: 'words',
                name: 'words-list',
                component: () => import('../components/word/WordList.vue'),
            },
            {
                path: 'words/test',
                name: 'word-test',
                component: () => import('../components/word/WordTest.vue'), 
                meta: { roles: ['admin']},
            },
            {
                path: 'words/create',
                name: 'word-create',
                component: () => import('../components/word/WordCreate.vue'),
            },
            {
                path: 'words/:slug',
                name: 'word-detail',
                component: () => import('../components/word/WordDetail.vue'),
                props: true,
            },
            {
                path: 'words/:slug/edit',
                name: 'word-edit',
                component: () => import('../components/word/WordEdit.vue'),
                props: true,
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'no-found',
        component: () => import('../views/NotFoundView.vue'),
    },   
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  // Make sure we've attempted to restore the session before guarding routes.
  if (!authStore.isReady) {
    await authStore.init()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: 'dashboard' }
  }

  return true
})
export default router
