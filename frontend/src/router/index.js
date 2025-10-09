import store from '@/store'
import HomePage from '@/views/homePage.vue'
import LoginPage from '@/views/loginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      name: 'login-module',
      component: LoginPage,
      meta: { requiresGuest: true },
    },
    {
      path: '/dashboard',
      name: 'dash-module',
      component: HomePage,
      meta: {requiresGuest: true}
    }
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next('')
  } else {
    next()
  }
})

export default router
