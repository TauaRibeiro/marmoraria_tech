import store from '@/store'
import HomePage from '@/views/homePage.vue'
import LoginPage from '@/views/loginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      name: 'login-module',
      component: LoginPage,
      meta: { requiresGuest: true },
    },
    {
      path: '/home',
      name: 'dash-module',
      component: HomePage,
      meta: {requiresAuth: true}
    }
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('Caiu aqui')
    next('/login')
  } else {
    next()
  }
})

export default router
