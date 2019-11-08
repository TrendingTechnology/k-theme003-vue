import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth';

import auth from '@/service/auth';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: () => import('@/layouts/main/Main.vue'),
      children: [
        {
          path: '/',
          redirect: '/dashboard/analytics'
        },
        {
          path: '/dashboard/analytics',
          name: 'dashboard-analytics',
          component: () => import('@/views/dashboard/Analytics.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/dashboard/ecommerce',
          name: 'dashboard-ecommerce',
          component: () => import('@/views/dashboard/ECommerce.vue'),
          meta: {
            rule: 'admin'
          }
        },
        {
          path: '/apps/email',
          redirect: '/apps/email/inbox'
        },
        {
          path: '/apps/email/:filter',
          name: 'email',
          component: () => import('@/views/apps/email/Email.vue'),
          meta: {
            rule: 'editor',
            parent: 'email'
          }
        },
        {
          path: '/apps/chat',
          name: 'chat',
          component: () => import('@/views/apps/chat/Chat.vue'),
          meta: {
            rule: 'editor'
          }
        }
      ]
    }
  ]
});

router.afterEach(() => {
  const appLoading = document.getElementById('loading-bg');

  if (appLoading) {
    appLoading.style.display = 'none';
  }
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(() => {
    const firebaseCurrentUser = firebase.auth().currentUser;

    if (to.meta.authRequired) {
      if (!(auth.isAuthenticated() || firebaseCurrentUser)) {
        router.push({ path: '/pages/login', query: { to: to.path } });
      }
    }

    return next();
  });
});

export default router;
