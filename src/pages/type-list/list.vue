<template>
  <div class="type-list">
    <div class="list-wrap">
      <div class="list-title">
        <img src="../../assets/img/type_active.png" alt="">
        <span class="title-txt">按类别</span>
      </div>
      <ul class="list">
        <li @click="list(item.id,'')" class="item" :data-id="item.id" v-for="item in typeList">
          <a>
            <i></i><span>{{item.typeName}}（{{item.blogCount}}）</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="list-wrap">
      <div class="list-title">
        <img src="../../assets/img/date_active.png" alt="">
        <span class="title-txt">按日志日期</span>
      </div>
      <ul class="list">
        <li @click="list('',item.releaseDateStr)" class="item" :data-date="item.id" v-for="item in dateList">
          <a href="javascript:;">
            <i></i><span>{{item.releaseDateStr}}（{{item.blogCount}}）</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "type-list",
    data() {
      return {
        typeList: "",
        dateList: ""
      }
    },
    mounted() {
      this.getTypeList()
      this.getDateList()
    },
    methods: {
      getTypeList() {
        let param = {}
        this.$axios.get(this.HOST +'/common/getBlogTypeCountList ',param)
          .then((response)=> {
            // console.log(response.data);
             this.typeList = response.data;
          }).catch(function (error) {
          console.log(error);
        })
      },
      getDateList() {
        let param = {}
        this.$axios.get(this.HOST +'/common/getBlogCountList',param)
          .then((response)=> {
        this.dateList = response.data;
      }).catch(function (error) {
          console.log(error);
        })
      },
      list(typeId,releaseDatestr){
        const data = {
          typeId,
          releaseDatestr
        }
        this.$router.push({path: '/index/list', query: data})
      }
    }
  }
</script>

<style scoped>
  .type-list {
    margin: 0 0 10px;
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
