import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        {
          path: '/',
          redirect: '/dashboard/analytics'
        },
        {
          path: '/dashboard/analytics',
          name: 'dashboard-analytics',
          component: () => import('./views/dashboard/Analytics.vue')
        }
      ]
    }
  ]
});

export default router;
