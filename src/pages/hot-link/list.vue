<template>
  <div class="type-list">
    <div class="list-wrap">
      <div class="list-title">
        <img src="../../assets/img/link_active.png" alt="">
        <span class="title-txt">友情链接</span>
      </div>
      <ul class="list">
        <li class="item" :data-id="item.id" v-for="item in listLink">
          <a :href="item.linkUrl">
            <i></i><span>{{item.linkName}}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "link-list",
    data() {
      return {
        loading:false,
        listLink: "",
      }
    },
    mounted() {
      this.getLinkList()
    },
    methods: {
      getLinkList() {
        this.loading = true
        let param = {}
        this.$axios.get(this.HOST +'/common/getLinkList',param)
          .then((response)=> {
            // console.log(response.data);
            this.listLink = response.data;
            this.loading = false
      }).catch(function (error) {
          console.log(error);
        })
      }
    }
  }
</script>

<style scoped>
  .type-list {
    margin: 10px 0;
    padding-left: 15px;
  }

  .list-wrap {
    margin-bottom: 10px;
    padding: 10px;
    background: #fff;
  }

  .list-title {
    border-bottom: 1px solid #dfdfdf;
    margin-bottom: 10px;
    padding-bottom: 10px;
    line-height: 20px;
    color: #969696;
    font-size: 0;
  }

  .list-title img {
    display: inline-block;
    margin: 0 4px 0 0;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  .list-title .title-txt {
    display: inline-block;
    font-size: 14px;
    vertical-align: middle;
  }

  .list .item {
    position: relative;
    min-height: 20px;
    padding-left: 24px;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333;
    cursor: pointer;
  }

  .list .item:last-child {
    margin-bottom: 0;
  }

  .item i {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 20px;
    height: 20px;
    background: url(../../assets/img/article_default.png) no-repeat;
    background-size: 100% 100%;
  }

  .item:hover i {
    background-image: url(../../assets/img/article_active.png);
  }
</style>
