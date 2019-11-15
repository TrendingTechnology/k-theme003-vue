import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

import auth from "@/service/auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "",
      component: () => import("@/layouts/main/Main.vue"),
      children: [
        {
          path: "/",
          redirect: "/dashboard/analytics"
        },
        {
          path: "/dashboard/analytics",
          name: "dashboard-analytics",
          component: () => import("@/views/dashboard/Analytics.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/dashboard/ecommerce",
          name: "dashboard-ecommerce",
          component: () => import("@/views/dashboard/ECommerce.vue"),
          meta: {
            rule: "admin"
          }
        },
        {
          path: "/apps/email",
          redirect: "/apps/email/inbox"
        },
        {
          path: "/apps/email/:filter",
          name: "email",
          component: () => import("@/views/apps/email/Email.vue"),
          meta: {
            rule: "editor",
            parent: "email"
          }
        },
        {
          path: "/apps/chat",
          name: "chat",
          component: () => import("@/views/apps/chat/Chat.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/apps/todo",
          redirect: "/apps/todo/all"
        },
        {
          path: "/apps/todo/:filter",
          name: "todo",
          component: () => import("@/views/apps/todo/Todo.vue"),
          meta: {
            rule: "editor",
            parent: "todo"
          }
        },
        {
          path: "/apps/calendar/vue-simple-calendar",
          name: "calendar-simple-calendar",
          component: () => import("@/views/apps/calendar/SimpleCalendar.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/apps/eCommerce/shop",
          name: "ecommerce-shop",
          component: () => import("@/views/apps/eCommerce/ECommerceShop.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "eCommerce" },
              { title: "Shop", active: true }
            ],
            pageTitle: "Shop",
            rule: "editor"
          }
        },
        {
          path: "/apps/eCommerce/wish-list",
          name: "ecommerce-wish-list",
          component: () =>
            import("@/views/apps/eCommerce/ECommerceWishList.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "eCommerce", url: "/apps/eCommerce/shop" },
              { title: "Wish List", active: true }
            ],
            pageTitle: "Wish List",
            rule: "editor"
          }
        },
        {
          path: "/apps/eCommerce/checkout",
          name: "ecommerce-checkout",
          component: () =>
            import("@/views/apps/eCommerce/ECommerceCheckout.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "eCommerce", url: "/apps/eCommerce/shop" },
              { title: "Checkout", active: true }
            ],
            pageTitle: "Checkout",
            rule: "editor"
          }
        },
        {
          path: "/ui-elements/data-list/list-view",
          name: "data-list-list-view",
          component: () =>
            import(
              "@/views/ui-elements/data-list/list-view/DataListListView.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Data List" },
              { title: "List View", active: true }
            ],
            pageTitle: "List View",
            rule: "editor"
          }
        }
      ]
    }
  ]
});

router.afterEach(() => {
  const appLoading = document.getElementById("loading-bg");

  if (appLoading) {
    appLoading.style.display = "none";
  }
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(() => {
    const firebaseCurrentUser = firebase.auth().currentUser;

    if (to.meta.authRequired) {
      if (!(auth.isAuthenticated() || firebaseCurrentUser)) {
        router.push({ path: "/pages/login", query: { to: to.path } });
      }
    }

    return next();
  });
});

export default router;
