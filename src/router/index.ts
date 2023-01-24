import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LogIn.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/onboarding/SignUp.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/ForgotPassword.vue')
  },
  {
    path: '/allow-access',
    name: 'AllowAccess',
    component: () => import('@/views/onboarding/AllowAccess.vue')
  },
  {
    path: '/allow-access/location',
    name: 'AllowAccessLocation',
    component: () => import('@/views/onboarding/AllowAccessLocation.vue')
  },
  {
    path: '/allow-access/bluetooth',
    name: 'AllowAccessBluetooth',
    component: () => import('@/views/onboarding/AllowAccessBluetooth.vue')
  },
  {
    path: '/allow-access/notifications',
    name: 'AllowAccessNotifications',
    component: () => import('@/views/onboarding/AllowAccessNotifications.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
