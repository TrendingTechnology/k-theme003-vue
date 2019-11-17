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
        },
        {
          path: "/components/pagination",
          name: "component-pagination",
          component: () =>
            import("@/views/components/vuesax/pagination/Pagination.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Pagination", active: true }
            ],
            pageTitle: "Pagination",
            rule: "editor"
          }
        },
        {
          path: "/components/popup",
          name: "component-popup",
          component: () => import("@/views/components/vuesax/popup/Popup.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Popup", active: true }
            ],
            pageTitle: "Popup",
            rule: "editor"
          }
        },
        {
          path: "/components/progress",
          name: "component-progress",
          component: () =>
            import("@/views/components/vuesax/progress/Progress.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Progress", active: true }
            ],
            pageTitle: "Progress",
            rule: "editor"
          }
        },
        {
          path: "/components/sidebar",
          name: "component-sidebar",
          component: () =>
            import("@/views/components/vuesax/sidebar/Sidebar.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Sidebar", active: true }
            ],
            pageTitle: "Sidebar",
            rule: "editor"
          }
        },
        {
          path: "/components/slider",
          name: "component-slider",
          component: () =>
            import("@/views/components/vuesax/slider/Slider.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Slider", active: true }
            ],
            pageTitle: "Slider",
            rule: "editor"
          }
        },
        {
          path: "/components/tabs",
          name: "component-tabs",
          component: () => import("@/views/components/vuesax/tabs/Tabs.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Tabs", active: true }
            ],
            pageTitle: "Tabs",
            rule: "editor"
          }
        },
        {
          path: "/components/tooltip",
          name: "component-tooltip",
          component: () =>
            import("@/views/components/vuesax/tooltip/Tooltip.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Tooltip", active: true }
            ],
            pageTitle: "Tooltip",
            rule: "editor"
          }
        },
        {
          path: "/components/upload",
          name: "component-upload",
          component: () =>
            import("@/views/components/vuesax/upload/Upload.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Components" },
              { title: "Upload", active: true }
            ],
            pageTitle: "Upload",
            rule: "editor"
          }
        },
        {
          path: "/extensions/select",
          name: "extra-component-select",
          component: () =>
            import("@/views/components/extra-components/select/Select.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Extra Components" },
              { title: "Select", active: true }
            ],
            pageTitle: "Select",
            rule: "editor"
          }
        },
        {
          path: "/extensions/quill-editor",
          name: "extra-component-quill-editor",
          component: () =>
            import(
              "@/views/components/extra-components/quill-editor/QuillEditor.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Extra Components" },
              { title: "Quill Editor", active: true }
            ],
            pageTitle: "Quill Editor",
            rule: "editor"
          }
        },
        {
          path: "/extensions/drag-and-drop",
          name: "extra-component-drag-and-drop",
          component: () =>
            import(
              "@/views/components/extra-components/drag-and-drop/DragAndDrop.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Extra Components" },
              { title: "Drag & Drop", active: true }
            ],
            pageTitle: "Drag & Drop",
            rule: "editor"
          }
        },
        {
          path: "/extensions/datepicker",
          name: "extra-component-datepicker",
          component: () =>
            import(
              "@/views/components/extra-components/datepicker/Datepicker.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Extra Components" },
              { title: "Datepicker", active: true }
            ],
            pageTitle: "Datepicker",
            rule: "editor"
          }
        },
        {
          path: "/extensions/datetime-picker",
          name: "extra-component-datetime-picker",
          component: () =>
            import(
              "@/views/components/extra-components/datetime-picker/DatetimePicker.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Extra Components" },
              { title: "Datetime Picker", active: true }
            ],
            pageTitle: "Datetime Picker",
            rule: "editor"
          }
        },
        {
          path: "/extensions/access-control",
          name: "extra-component-access-control",
          component: () =>
            import(
              "@/views/components/extra-components/access-control/AccessControl.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Extensions" },
              { title: "Access Control", active: true }
            ],
            pageTitle: "Access Control",
            rule: "editor"
          }
        },
        {
          path: "/extensions/i18n",
          name: "extra-component-i18n",
          component: () =>
            import("@/views/components/extra-components/I18n.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Extensions" },
              { title: "I18n", active: true }
            ],
            pageTitle: "I18n",
            rule: "editor"
          }
        },
        {
          path: "/extensions/carousel",
          name: "extra-component-carousel",
          component: () =>
            import("@/views/components/extra-components/carousel/Carousel.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Extensions" },
              { title: "Carousel", active: true }
            ],
            pageTitle: "Carousel",
            rule: "editor"
          }
        },
        {
          path: "/extensions/clipboard",
          name: "extra-component-clipboard",
          component: () =>
            import(
              "@/views/components/extra-components/clipboard/Clipboard.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Extensions" },
              { title: "Clipboard", active: true }
            ],
            pageTitle: "Clipboard",
            rule: "editor"
          }
        },
        {
          path: "/extensions/context-menu",
          name: "extra-component-context-menu",
          component: () =>
            import(
              "@/views/components/extra-components/context-menu/ContextMenu.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Extensions" },
              { title: "Context Menu", active: true }
            ],
            pageTitle: "Context Menu",
            rule: "editor"
          }
        },
        {
          path: "/extensions/star-ratings",
          name: "extra-component-star-ratings",
          component: () =>
            import(
              "@/views/components/extra-components/star-ratings/StarRatings.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Extensions" },
              { title: "Star Ratings", active: true }
            ],
            pageTitle: "Star Ratings",
            rule: "editor"
          }
        },
        {
          path: "/extensions/autocomplete",
          name: "extra-component-autocomplete",
          component: () =>
            import(
              "@/views/components/extra-components/autocomplete/Autocomplete.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Extensions" },
              { title: "Autocomplete", active: true }
            ],
            pageTitle: "Autocomplete",
            rule: "editor"
          }
        },
        {
          path: "/extensions/tree",
          name: "extra-component-tree",
          component: () =>
            import("@/views/components/extra-components/tree/Tree.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Extensions" },
              { title: "Tree", active: true }
            ],
            pageTitle: "Tree",
            rule: "editor"
          }
        },
        {
          path: "/import-export/import",
          name: "import-excel",
          component: () =>
            import(
              "@/views/components/extra-components/import-export/Import.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Extensions" },
              { title: "Import/Export" },
              { title: "Import", active: true }
            ],
            pageTitle: "Import Excel",
            rule: "editor"
          }
        },
        {
          path: "/import-export/export",
          name: "export-excel",
          component: () =>
            import(
              "@/views/components/extra-components/import-export/Export.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Extensions" },
              { title: "Import/Export" },
              { title: "Export", active: true }
            ],
            pageTitle: "Export Excel",
            rule: "editor"
          }
        },
        {
          path: "/import-export/export-selected",
          name: "export-excel-selected",
          component: () =>
            import(
              "@/views/components/extra-components/import-export/ExportSelected.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Extensions" },
              { title: "Import/Export" },
              { title: "Export Selected", active: true }
            ],
            pageTitle: "Export Excel",
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
