<template>
  <div class="empty">
    <img src="../assets/img/empty_2.png" alt="">
    <div class="empty-txt">{{EmptyTip}}</div>
  </div>
</template>

<script>
  export default {
    name: "empty",
    props: ["EmptyTip"],
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
  .empty {
    padding: 200px 0;
  }

  .empty img {
    display: block;
    margin: 0 auto;
    width: 128px;
  }

  .empty .empty-txt {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.5;
    text-align: center;
    color: #999;
  }
</style>
