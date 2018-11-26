<template>
  <div class="page404">
    <div class="error-wrap">
      <h3>您要找的页面不存在</h3>
      <div class="sub-title">可能是因为您的链接地址有误、该文章已经被作者删除或转为私密状态。</div>
      <router-link to="/index/list" class="back">返回「杜老师」首页</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "page404"
  }
</script>

<style scoped>
  .error-wrap {
    margin: 20px auto -50px;
    width: 1000px;
    height: 513px;
    background: url(../../assets/img/404.jpeg) no-repeat;
    background-size: cover;
    text-align: center;
    color: #fff;
    overflow: hidden;
  }

  .error-wrap h3 {
    margin: 329px 0 20px 0;
    font-weight: bold;
  }

  .error-wrap .sub-title {
    margin: 10px 0 30px 0;
    font-size: 14px;
  }

  .error-wrap .back {
    padding: 13px 0;
    width: 160px;
    font-size: 15px;
    border-radius: 40px;
    color: #ffffff;
    background-color: #ff6700;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    white-space: nowrap;
    user-select: none;
  }

  .error-wrap .back:hover {
    opacity: .7;
  }
</style>
