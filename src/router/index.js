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
        },
        {
          path: "/ui-elements/data-list/thumb-view",
          name: "data-list-thumb-view",
          component: () =>
            import(
              "@/views/ui-elements/data-list/thumb-view/DataListThumbView.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Data List" },
              { title: "Thumb View", active: true }
            ],
            pageTitle: "Thumb View",
            rule: "editor"
          }
        },
        {
          path: "/ui-elements/grid/vuesax",
          name: "grid-vuesax",
          component: () =>
            import("@/views/ui-elements/grid/vuesax/GridVuesax.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Grid" },
              { title: "Vuesax", active: true }
            ],
            pageTitle: "Grid",
            rule: "editor"
          }
        },
        {
          path: "/ui-elements/grid/tailwind",
          name: "grid-tailwind",
          component: () =>
            import("@/views/ui-elements/grid/tailwind/GridTailwind.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Grid" },
              { title: "Tailwind", active: true }
            ],
            pageTitle: "Tailwind Grid",
            rule: "editor"
          }
        },
        {
          path: "/ui-elements/colors",
          name: "colors",
          component: () => import("@/views/ui-elements/colors/Colors.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Colors", active: true }
            ],
            pageTitle: "Colors",
            rule: "editor"
          }
        },
        {
          path: "/ui-elements/card/basic",
          name: "basic-cards",
          component: () => import("@/views/ui-elements/card/CardBasic.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Card" },
              { title: "Basic Cards", active: true }
            ],
            pageTitle: "Basic Cards",
            rule: "editor"
          }
        },
        {
          path: "/ui-elements/card/statistics",
          name: "statistics-cards",
          component: () =>
            import("@/views/ui-elements/card/CardStatistics.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Card" },
              { title: "Statistics Cards", active: true }
            ],
            pageTitle: "Statistics Card",
            rule: "editor"
          }
        },
        {
          path: "/ui-elements/card/analytics",
          name: "analytics-cards",
          component: () => import("@/views/ui-elements/card/CardAnalytics.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Card" },
              { title: "Analytics Card", active: true }
            ],
            pageTitle: "Analytics Card",
            rule: "editor"
          }
        },
        {
          path: "/ui-elements/card/card-actions",
          name: "card-actions",
          component: () => import("@/views/ui-elements/card/CardActions.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Card" },
              { title: "Card Actions", active: true }
            ],
            pageTitle: "Card Actions",
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
