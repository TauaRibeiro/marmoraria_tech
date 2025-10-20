import store from '@/store'
import HomePage from '@/views/homePage.vue'
import LoginPage from '@/views/loginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login-module',
      component: LoginPage,
      meta: { requiresAuth: false },
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

  if(!isAuthenticated && to.meta.requiresAuth){
    next('/login')
  }else if(isAuthenticated && to.fullPath === '/login'){
    next('/home')
  }else{
    next()
  }
})


export default router
