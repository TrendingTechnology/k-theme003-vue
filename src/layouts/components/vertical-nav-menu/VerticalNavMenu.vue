<template>
  <div class="parentx">
    <vs-sidebar
      class="v-nav-menu items-no-padding"
      v-model="isVerticalNavMenuActive"
      ref="verticalNavMenu"
      default-index="-1"
      :click-not-close="clickNotClose"
      :reduce-not-rebound="reduceNotRebound"
      :parent="parent"
      :hiddenBackground="clickNotClose"
      :reduce="reduce"
      v-hammer:swipe.left="onSwipeLeft"
    >
      <div @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <div class="header-sidebar flex items-end justify-between" slot="header">
          <router-link tag="div" class="vx-logo cursor-pointer flex items-center" to="/">
            <img :src="logo" alt="logo" class="w-10 mr-4" v-if="logo" />
            <span class="vx-logo-text" v-show="isMouseEnter || !reduce" v-if="title">{{ title }}</span>
          </router-link>

          <div>
            <template v-if="showCloseButton">
              <feather-icon
                icon="XIcon"
                class="m-0 cursor-pointer"
                @click="$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)"
              />
            </template>

            <template v-else-if="!showCloseButton && !verticalNavMenuItemsMin">
              <feather-icon
                id="btnVNavMenuMinToggler"
                class="mr-0 cursor-pointer"
                :icon="reduce ? 'CircleIcon' : 'DiscIcon'"
                svg-classes="stroke-current"
                @click="toggleReduce(!reduce)"
              />
            </template>
          </div>
        </div>

        <div class="shadow-bottom" v-show="showShadowBottom" />

        <VuePerfectScrollbar
          ref="verticalNavMenuPs"
          class="scroll-area-v-nav-menu pt-2"
          :settings="settings"
          @ps-scroll-y="psSectionScroll"
        >
          <template v-for="(item, index) in menuItemsUpdated">
            <span
              v-if="item.header && !verticalNavMenuItemsMin"
              class="navigation-header truncate"
              :key="`header-${index}`"
            >{{ $t(item.i18n) || item.header }}</span>

            <template v-else-if="!item.header">
              <v-nav-menu-item
                v-if="!item.submenu"
                :key="`item-${index}`"
                :index="index"
                :to="item.slug !== 'external' ? item.url : null"
                :href="item.slug === 'external' ? item.url : null"
                :icon="item.icon"
                :target="item.target"
                :isDisabled="item.isDisabled"
                :slug="item.slug"
              >
                <span
                  v-show="!verticalNavMenuItemsMin"
                  class="truncate"
                >{{ $t(item.i18n) || item.name }}</span>
                <vs-chip
                  class="ml-auto"
                  :color="item.tagColor"
                  v-if="item.tag && (isMouseEnter || !reduce)"
                >{{ item.tag }}</vs-chip>
              </v-nav-menu-item>

              <template v-else>
                <v-nav-menu-group
                  :key="`group-${index}`"
                  :openHover="openGroupHover"
                  :group="item"
                  :groupIndex="index"
                  :open="isGroupActive(item)"
                />
              </template>
            </template>
          </template>
        </VuePerfectScrollbar>
      </div>
    </vs-sidebar>

    <div
      v-if="!isVerticalNavMenuActive"
      class="v-nav-menu-swipe-area"
      v-hammer:swipe.right="onSwipeAreaSwipeRight"
    />
  </div>
</template>


<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import VNavMenuGroup from "./VerticalNavMenuGroup.vue";
import VNavMenuItem from "./VerticalNavMenuItem.vue";

export default {
  name: "v-nav-menu",
  components: {
    VNavMenuGroup,
    VNavMenuItem,
    VuePerfectScrollbar
  },
  props: {
    logo: { type: String },
    openGroupHover: { type: Boolean, default: false },
    parent: { type: String },
    reduceNotRebound: { type: Boolean, default: true },
    navMenuItems: { type: Array, required: true },
    title: { type: String }
  },
  data: () => ({
    clickNotClose: false,
    isMouseEnter: false,
    reduce: false,
    showCloseButton: false,
    settings: {
      maxScrollbarLength: 60,
      wheelSpeed: 1,
      swipeEasing: true
    },
    showShadowBottom: false
  }),
  computed: {
    isGroupActive() {
      return item => {
        const path = this.$route.fullPath;
        const routeParent = this.$route.meta
          ? this.$route.meta.parent
          : undefined;
        let open = false;

        let func = item => {
          if (item.submenu) {
            item.submenu.forEach(item => {
              if (
                item.url &&
                (path === item.url || routeParent === item.slug)
              ) {
                open = true;
              } else if (item.submenu) {
                func(item);
              }
            });
          }
        };
        func(item);
        return open;
      };
    },
    menuItemsUpdated() {
      let clone = this.navMenuItems.slice();

      for (let [index, item] of this.navMenuItems.entries()) {
        if (item.header && item.items.length && (index || 1)) {
          let i = clone.findIndex(ix => ix.header === item.header);
          for (let [subIndex, subItem] of item.items.entries()) {
            clone.splice(i + 1 + subIndex, 0, subItem);
          }
        }
      }

      return clone;
    },
    isVerticalNavMenuActive: {
      get() {
        return this.$store.state.isVerticalNavMenuActive;
      },
      set(val) {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", val);
      }
    },
    layoutType() {
      return this.$store.state.mainLayoutType;
    },
    reduceButton: {
      get() {
        return this.$store.state.reduceButton;
      },
      set(val) {
        this.$store.commit("TOGGLE_REDUCE_BUTTON", val);
      }
    },
    isVerticalNavMenuReduced() {
      return Boolean(this.reduce && this.reduceButton);
    },
    verticalNavMenuItemsMin() {
      return this.$store.state.verticalNavMenuItemsMin;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  },
  watch: {
    $route() {
      if (this.isVerticalNavMenuActive && this.showCloseButton)
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", false);
    },
    reduce(val) {
      const verticalNavMenuWidth = val ? "reduced" : "default";
      this.$store.dispatch("updateVerticalNavMenuWidth", verticalNavMenuWidth);

      setTimeout(function() {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    },
    layoutType() {
      this.setVerticalNavMenuWidth();
    },
    reduceButton() {
      this.setVerticalNavMenuWidth();
    },
    windowWidth() {
      this.setVerticalNavMenuWidth();
    }
  },
  methods: {
    onSwipeLeft() {
      if (this.isVerticalNavMenuActive && this.showCloseButton)
        this.isVerticalNavMenuActive = false;
    },
    onSwipeAreaSwipeRight() {
      if (!this.isVerticalNavMenuActive && this.showCloseButton)
        this.isVerticalNavMenuActive = true;
    },
    psSectionScroll() {
      this.showShadowBottom =
        this.$refs.verticalNavMenuPs.$el.scrollTop > 0 ? true : false;
    },
    mouseEnter() {
      if (this.reduce)
        this.$store.commit("UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN", false);
      this.isMouseEnter = true;
    },
    mouseLeave() {
      if (this.reduce)
        this.$store.commit("UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN", true);
      this.isMouseEnter = false;
    },
    setVerticalNavMenuWidth() {
      if (this.windowWidth > 1200) {
        if (this.layoutType === "vertical") {
          this.reduce = this.reduceButton ? true : false;

          this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", true);

          const verticalNavMenuItemsMin =
            this.reduceButton && !this.isMouseEnter ? true : false;
          this.$store.commit(
            "UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN",
            verticalNavMenuItemsMin
          );

          this.clickNotClose = true;
          this.showCloseButton = false;

          const verticalNavMenuWidth = this.isVerticalNavMenuReduced
            ? "reduced"
            : "default";
          this.$store.dispatch(
            "updateVerticalNavMenuWidth",
            verticalNavMenuWidth
          );

          return;
        }
      }

      this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", false);

      if (this.reduceButton) this.reduce = false;

      this.showCloseButton = true;
      this.clickNotClose = false;

      this.$store.dispatch("updateVerticalNavMenuWidth", "no-nav-menu");

      this.$store.commit("UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN", false);
    },
    toggleReduce(val) {
      this.reduceButton = val;
      this.setVerticalNavMenuWidth();
    }
  },
  mounted() {
    this.setVerticalNavMenuWidth();
  }
};
</script>


<style lang="scss">
@import "@/assets/scss/kdev/components/verticalNavMenu.scss";
</style>
