<template>
    <footer class="layout-footer">
      <div class="footer">
        <span class="footer-l">Powered by <a href="//dulaoshi.club">杜老湿个人博客</a> V1.0</span>
          <span>
          Copyright © 2018-2018 杜老湿&小明同学 版权所有
        </span>
      </div>
    </footer>
</template>

<script>
    export default {
        name: "layout-footer"
    }
</script>

<style scoped>
  .layout-footer {
    position: relative;
    margin-top: 70px;
    padding: 60px 0 60px;
    width: 100%;
    background: #222;
    color: #fff;
  }
  .footer {
    position: relative;
    margin: 0 auto;
    width: 1000px;
    text-align: center;
  }
  .footer .footer-l {
    position: absolute;
    left: 0;
    top: 0;
  }
  .footer a {
    color: inherit;
  }
  .footer a:hover {
    color: #ff6700;
  }
</style>
