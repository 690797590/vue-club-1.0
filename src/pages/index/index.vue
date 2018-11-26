<template>
  <div class="index">
    <div class="main clearfix">
      <div class="main-l">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
      </div>
      <div class="main-r">
        <type-list></type-list>
        <hot-link></hot-link>
      </div>
    </div>
  </div>
</template>

<script>
  import TypeList from '../type-list/list'
  import HotLink from '../hot-link/list'

  export default {
    name: "index",
    components: {
      TypeList,
      HotLink
    }
  }
</script>

<style scoped>
  .main {
    margin: 20px auto 0;
    width: 1000px;
    clear: both;
  }

  .main .main-l {
    position: relative;
    float: left;
    width: 75%;
    min-height: 400px;
  }

  .main .main-r {
    position: relative;
    float: left;
    width: 25%;
  }
</style>
