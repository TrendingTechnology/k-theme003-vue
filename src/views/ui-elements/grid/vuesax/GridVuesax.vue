<template>
  <div id="kdev-grid-demo">
    <grid-overview></grid-overview>
    <grid-design-concept></grid-design-concept>
    <grid-column-offset></grid-column-offset>
    <grid-flex-layout></grid-flex-layout>
    <grid-flex-alignment></grid-flex-alignment>
    <grid-flex-order></grid-flex-order>
    <grid-responsive-layout></grid-responsive-layout>
  </div>
</template>

<script>
import GridOverview from "./GridOverview.vue";
import GridDesignConcept from "./GridDesignConcept.vue";
import GridColumnOffset from "./GridColumnOffset.vue";
import GridFlexLayout from "./GridFlexLayout.vue";
import GridFlexAlignment from "./GridFlexAlignment.vue";
import GridFlexOrder from "./GridFlexOrder.vue";
import GridResponsiveLayout from "./GridResponsiveLayout.vue";

export default {
  components: {
    GridOverview,
    GridDesignConcept,
    GridColumnOffset,
    GridFlexLayout,
    GridFlexAlignment,
    GridFlexOrder,
    GridResponsiveLayout
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/kdev/pages/grid.scss";
</style>
