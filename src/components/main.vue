<template>
  <div class="layout-main">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: "layout-main"
  }
</script>

<style scoped>
  .layout-main {
    position: relative;
    width: 100%;
    min-height: 300px;
  }
</style>
