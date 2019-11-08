<template functional>
  <footer class="the-footer flex-wrap justify-between" :class="classes">
    <span>
      COPYRIGHT @ {{ new Date().getFullYear() }}
      <a href="" target="_blank" rel="nofollow">kdevsoftware</a>, All rights Reserved
    </span>
    <span class="md:flex hidden items-center">
      <span>Hand-crafted & Made with</span>
      <feather-icon icon="HeartIcon" svgClasses="stroke-current text-danger w-6 h-6" class="ml-2" />
    </span>
  </footer>
</template>

<script>
export default {
  name: "the-footer",
  props: {
    classes: {
      type: String
    }
  }
};
</script>
