import { createRouter, createWebHistory } from 'vue-router'
import Terminal from '../components/terminal.vue'
import Landing from '../components/landing.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
    },
    {
      path: '/terminal',
      name: 'Terminal',
      component: Terminal,
    },
  ],
})
export default router
