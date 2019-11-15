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
        },
        {
          path: "/ui-elements/card/card-colors",
          name: "card-colors",
          component: () => import("@/views/ui-elements/card/CardColors.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Card" },
              { title: "Card Colors", active: true }
            ],
            pageTitle: "Card Colors",
            rule: "editor"
          }
        },
        {
          path: "/ui-elements/table",
          name: "table",
          component: () => import("@/views/ui-elements/table/Table.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Table", active: true }
            ],
            pageTitle: "Table",
            rule: "editor"
          }
        },
        {
          path: "/ui-elements/ag-grid-table",
          name: "ag-grid-table",
          component: () =>
            import("@/views/ui-elements/ag-grid-table/AgGridTable.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "agGrid Table", active: true }
            ],
            pageTitle: "agGrid Table",
            rule: "editor"
          }
        },
        {
          path: "/components/alert",
          name: "component-alert",
          component: () => import("@/views/components/vuesax/alert/Alert.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Alert", active: true }
            ],
            pageTitle: "Alert",
            rule: "editor"
          }
        },
        {
          path: "/components/avatar",
          name: "component-avatar",
          component: () =>
            import("@/views/components/vuesax/avatar/Avatar.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Avatar", active: true }
            ],
            pageTitle: "Avatar",
            rule: "editor"
          }
        },
        {
          path: "/components/breadcrumb",
          name: "component-breadcrumb",
          component: () =>
            import("@/views/components/vuesax/breadcrumb/Breadcrumb.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Breadcrumb", active: true }
            ],
            pageTitle: "Breadcrumb",
            rule: "editor"
          }
        },
        {
          path: "/components/button",
          name: "component-button",
          component: () =>
            import("@/views/components/vuesax/button/Button.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Button", active: true }
            ],
            pageTitle: "Button",
            rule: "editor"
          }
        },
        {
          path: "/components/button-group",
          name: "component-button-group",
          component: () =>
            import("@/views/components/vuesax/button-group/ButtonGroup.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Button Group", active: true }
            ],
            pageTitle: "Button Group",
            rule: "editor"
          }
        },
        {
          path: "/components/chip",
          name: "component-chip",
          component: () => import("@/views/components/vuesax/chip/Chip.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Chip", active: true }
            ],
            pageTitle: "Chip",
            rule: "editor"
          }
        },
        {
          path: "/components/collapse",
          name: "component-collapse",
          component: () =>
            import("@/views/components/vuesax/collapse/Collapse.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Collapse", active: true }
            ],
            pageTitle: "Collapse",
            rule: "editor"
          }
        },
        {
          path: "/components/dialogs",
          name: "component-dialog",
          component: () =>
            import("@/views/components/vuesax/dialogs/Dialogs.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Dialogs", active: true }
            ],
            pageTitle: "Dialogs",
            rule: "editor"
          }
        },
        {
          path: "/components/divider",
          name: "component-divider",
          component: () =>
            import("@/views/components/vuesax/divider/Divider.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Divider", active: true }
            ],
            pageTitle: "Divider",
            rule: "editor"
          }
        },
        {
          path: "/components/dropdown",
          name: "component-drop-down",
          component: () =>
            import("@/views/components/vuesax/dropdown/Dropdown.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Dropdown", active: true }
            ],
            pageTitle: "Dropdown",
            rule: "editor"
          }
        },
        {
          path: "/components/list",
          name: "component-list",
          component: () => import("@/views/components/vuesax/list/List.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "List", active: true }
            ],
            pageTitle: "List",
            rule: "editor"
          }
        },
        {
          path: "/components/loading",
          name: "component-loading",
          component: () =>
            import("@/views/components/vuesax/loading/Loading.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Loading", active: true }
            ],
            pageTitle: "Loading",
            rule: "editor"
          }
        },
        {
          path: "/components/navbar",
          name: "component-navbar",
          component: () =>
            import("@/views/components/vuesax/navbar/Navbar.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Navbar", active: true }
            ],
            pageTitle: "Navbar",
            rule: "editor"
          }
        },
        {
          path: "/components/notifications",
          name: "component-notifications",
          component: () =>
            import("@/views/components/vuesax/notifications/Notifications.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Notifications", active: true }
            ],
            pageTitle: "Notifications",
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
