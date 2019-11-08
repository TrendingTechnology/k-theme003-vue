<template>
  <div
    class="vs-sidebar-group"
    :class="[
      {'vs-sidebar-group-open'            : openItems        },
      {'vs-sidebar-group-active'          : open             },
      {'disabled-item pointer-events-none': group.isDisabled }
    ]"
    @mouseover="mouseover"
    @mouseout="mouseout"
  >
    <div @click="clickGroup" class="group-header w-full">
      <span class="flex items-center w-full">
        <feather-icon
          v-if="group.icon  || (this.groupIndex > Math.floor(this.groupIndex))"
          :icon="group.icon  || 'CircleIcon'"
          :svgClasses="{ 'w-3 h-3' : this.groupIndex % 1 != 0 }"
        />

        <span
          v-show="!verticalNavMenuItemsMin"
          class="truncate mr-3 select-none"
        >{{ $t(group.i18n) || group.name }}</span>

        <vs-chip
          class="ml-auto mr-4"
          :color="group.tagColor"
          v-if="group.tag && !verticalNavMenuItemsMin"
        >{{ group.tag }}</vs-chip>
      </span>

      <feather-icon
        v-show="!verticalNavMenuItemsMin"
        :class="[{'rotate90' : openItems}, 'feather-grp-header-arrow']"
        icon="ChevronRightIcon"
        svg-classes="w-4 h-4"
      />

      <span class="vs-sidebar--tooltip">{{ $t(group.i18n) || group.name }}</span>
    </div>

    <ul ref="items" :style="styleItems" class="vs-sidebar-group-items">
      <li v-for="(groupItem, index) in group.submenu" :key="index">
        <v-nav-menu-group
          v-if="groupItem.submenu"
          :group="groupItem"
          :groupIndex="Number(`${groupIndex}.${index}`)"
          :open="isGroupActive(groupItem)"
          :openHover="openHover"
        />

        <v-nav-menu-item
          v-else
          icon-small
          :index="groupIndex + '.' + index"
          :to="groupItem.slug !== 'external' ? groupItem.url : null"
          :href="groupItem.slug === 'external' ? groupItem.url : null"
          :icon="itemIcon(groupIndex + '.' + index)"
          :slug="groupItem.slug"
          :target="groupItem.target"
        >
          <span class="truncate">{{ $t(groupItem.i18n) || groupItem.name }}</span>
          <vs-chip
            class="ml-auto"
            :color="groupItem.tagColor"
            v-if="groupItem.tag"
          >{{ groupItem.tag }}</vs-chip>
        </v-nav-menu-item>
      </li>
    </ul>
  </div>
</template>


<script>
import VNavMenuItem from "./VerticalNavMenuItem.vue";

export default {
  name: "v-nav-menu-group",
  props: {
    openHover: { type: Boolean, default: false },
    open: { type: Boolean, default: false },
    group: { type: Object },
    groupIndex: { type: Number }
  },
  components: {
    VNavMenuItem
  },
  data: () => ({
    maxHeight: "0px",
    openItems: false
  }),
  computed: {
    verticalNavMenuItemsMin() {
      return this.$store.state.verticalNavMenuItemsMin;
    },
    styleItems() {
      return { maxHeight: this.maxHeight };
    },
    itemIcon() {
      return index => {
        if (!((index.match(/\./g) || []).length > 1)) return "CircleIcon";
      };
    },
    isGroupActive() {
      return item => {
        const path = this.$route.fullPath;
        let open = false;
        const routeParent = this.$route.meta
          ? this.$route.meta.parent
          : undefined;

        let func = item => {
          if (item.submenu) {
            item.submenu.forEach(item => {
              if ((path == item.url || routeParent == item.slug) && item.url) {
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
    }
  },
  watch: {
    $route() {
      if (this.verticalNavMenuItemsMin) return;

      let scrollHeight = this.scrollHeight;

      if (this.openItems && !this.open) {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = `${0}px`;
        }, 50);
      } else if (this.open) {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = "none";
        }, 300);
      }
    },
    maxHeight() {
      this.openItems = this.maxHeight != "0px";
    },
    "$store.state.verticalNavMenuItemsMin"(val) {
      let scrollHeight = this.$refs.items.scrollHeight;

      if (!val && this.open) {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = "none";
        }, 300);
      } else {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = "0px";
        }, 50);
      }
      if (val && this.open) {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = "0px";
        }, 250);
      }
    }
  },
  methods: {
    clickGroup() {
      if (!this.openHover) {
        let thisScrollHeight = this.$refs.items.scrollHeight;

        if (this.maxHeight == "0px") {
          this.maxHeight = `${thisScrollHeight}px`;
          setTimeout(() => {
            this.maxHeight = "none";
          }, 300);
        } else {
          this.maxHeight = `${thisScrollHeight}px`;
          setTimeout(() => {
            this.maxHeight = `${0}px`;
          }, 50);
        }

        this.$parent.$children.map(child => {
          if (child.isGroupActive) {
            if (child !== this && !child.open && child.maxHeight != "0px") {
              setTimeout(() => {
                child.maxHeight = `${0}px`;
              }, 50);
            }
          }
        });
      }
    },
    mouseover() {
      if (this.openHover) {
        let scrollHeight = this.$refs.items.scrollHeight;
        this.maxHeight = `${scrollHeight}px`;
      }
    },
    mouseout() {
      if (this.openHover) {
        let scrollHeight = 0;
        this.maxHeight = `${scrollHeight}px`;
      }
    }
  },
  mounted() {
    this.openItems = this.open;
    if (this.open) {
      this.maxHeight = "none";
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/scss/kdev/components/verticalNavMenuGroup.scss";
</style>
