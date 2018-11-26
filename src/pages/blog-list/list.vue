<template>
  <div class="index-list">
    <div v-if="loading" v-loading="loading" class="loading-wrap">
      <div class="list-loading">
        <div class="wrap-img"></div>
        <div class="content">
          <div class="name ani"></div>
          <div class="description ani"></div>
          <div class="description description2 ani"></div>
          <div class="info">
            <a class="read">
              <span class="sqr"></span><span class="sqr"></span>
            </a>
            <a class="reply">
              <span class="sqr"></span><span class="sqr"></span>
            </a>
            <span class="date"></span>
            <span class="type"></span>
          </div>
        </div>
      </div>
    </div>
    <div v-else v-loading="loading" class="list">
      <!--have-img-->
      <div @click="detail(item.id)" class="item" :data-id="item.id" v-for="item in list"
           :class="[item.imageList.length>0?'have-img':'']">
        <a class="wrap-img" href="javascript:;">
          <img :src="item.imageList[0]" alt="">
        </a>
        <div class="content">
          <div class="name">
            {{item.title}}
          </div>
          <div class="description">
            {{item.summary}}...
          </div>
          <div class="info">
            <a href="javascript:;" class="read"><i></i><span>{{item.clickHit
}}</span></a>
            <a href="javascript:;" class="reply"><i></i><span>{{item.replyHit}}</span></a>
            <span class="date">{{item.releaseDate.time|formatDate}}</span>
            <span class="type">{{item.blogType.typeName}}</span>
          </div>
        </div>
        <span class="line line_top"></span>
        <span class="line line_right"></span>
        <span class="line line_bottom"></span>
        <span class="line line_left"></span>
      </div>
    </div>
    <!--分页 start-->
    <div v-if="list.length" class="list-page">
      <div class="block">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size=pageSize
          layout="total, prev, pager, next"
          :total=total>
        </el-pagination>
      </div>
    </div>
    <!--分页 end-->
    <empty v-if="empty" v-bind:EmptyTip='emptyTip'></empty>
  </div>
</template>

<script>
  import {formatDate} from '../../assets/js/formatDate'
  import Empty from '../../components/empty'

  const jsonp = require('jsonp');
  export default {
    name: "index-list",
    data() {
      return {
        loading: false,
        list: "",
        currentPage: 1,
        pageSize: 1,
        total: 0,
        emptyTip: '这里真的什么都没有～',
        empty: false
      }
    },
    components: {
      Empty
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    mounted() {
      this.getList()
    },
    // watch: {
    //   '$route': 'getList'
    // },
    watch: {
      '$route'(to, from) {
        this.getList()
      }
    },
    methods: {
      getList() {
        this.loading = true
        this.empty = false
        const typeID = this.$route.query.typeId
        const releaseDatestr = this.$route.query.releaseDatestr

        const data = {
          typeId: typeID,
          page: 1,
          releaseDateStr: releaseDatestr
        }
        this.$axios(
          {
            method: 'post',
            url: this.HOST + '/index2',
            data: data,
            timeout: 5000,
          })

          .then((response) => {
            // console.log(response.data)
            this.pageSize = response.data.pageSize
            this.total = response.data.total
            this.list = response.data.list
            if (this.list.length == 0) {
              this.empty = true
            }
            this.loading = false
          }).catch(function (error) {
          this.empty = true
          console.log(error);
          this.$router.push({path: '/index/list'})
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.loading = true
        const typeID = this.$route.query.typeId
        const releaseDatestr = this.$route.query.releaseDatestr
        const data = {
          typeId: typeID,
          page: this.currentPage,
          releaseDateStr: releaseDatestr
        }
        this.$axios({
          method: 'post',
          url: this.HOST + '/index2',
          data: data
        }).then((response) => {
          // console.log(response.data)
          this.pageSize = response.data.pageSize
          this.total = response.data.total
          this.list = response.data.list
          if (this.list.length == 0) {
            this.empty = true
          }
          this.loading = false
        }).catch(function (error) {
          this.empty = true
          console.log(error);
        })

      },
      detail(id) {
        // console.log(id);
        this.$router.push({path: `/index/detail/${id}`})
      }
    }
  }
</script>

<style scoped>
  .index-list {
    padding-right: 15px;
    padding-left: 15px;
  }

  .list .item {
    position: relative;
    padding: 10px;
    margin-bottom: 10px;
    background: #fff;
  }

  .list .have-img {
    padding-right: 145px;
    min-height: 140px;
  }

  .item .wrap-img {
    display: none;
  }

  .have-img .wrap-img {
    display: block;
    position: absolute;
    top: 50%;
    margin-top: -60px;
    right: 10px;
    width: 125px;
    height: 100px;
  }

  .wrap-img img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    border: 1px solid #f0f0f0;
  }

  .item .name {
    margin-bottom: 4px;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    cursor: pointer;
  }

  .item .name:hover {
    text-decoration: underline;
  }

  .item .description {
    margin: 0 0 8px;
    font-size: 13px;
    line-height: 24px;
    color: #999;
    word-wrap: break-word;
  }

  .item .info {
    font-weight: 400;
    line-height: 20px;
    /*font-size: 0;*/
  }

  .info a {
    margin-right: 10px;
    color: #b4b4b4;
    font-size: 12px;
  }

  .info .date {
    color: #b4b4b4;
  }

  .info a, .info a:hover {
    transition: .1s ease-in;
    -webkit-transition: .1s ease-in;
    -moz-transition: .1s ease-in;
    -o-transition: .1s ease-in;
    -ms-transition: .1s ease-in;
  }

  .info a:hover {
    color: #ff6700;
  }

  .info i {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  .info span {
    display: inline-block;
    vertical-align: middle;
  }

  .info .type {
    margin-left: 10px;
    padding: 0 5px;
    color: #fff;
    background: #42b983;
    border-radius: 3px;
  }

  .read i {
    background: url(../../assets/img/eye_default.png) no-repeat;
    background-size: 100% 100%;
  }

  .read:hover i {
    background: url(../../assets/img/eye_active.png) no-repeat;
    background-size: 100% 100%;
  }

  .reply i {
    background: url(../../assets/img/reply_default.png) no-repeat;
    background-size: 100% 100%;
  }

  .reply:hover i {
    background: url(../../assets/img/reply_active.png);
    background-size: 100% 100%;
  }

  .item .line {
    display: inline-block;
    background-color: #ff6700;
    position: absolute;
    transition: 0.5s ease;
  }

  .item .line_top {
    height: 2px;
    width: 0;
    left: -50%;
    top: 0;
  }

  .item .line_right {
    height: 0;
    width: 2px;
    top: -50%;
    right: 0;
  }

  .item .line_bottom {
    width: 2px;
    height: 0;
    bottom: -50%;
    left: 0;
  }

  .item .line_left {
    height: 2px;
    width: 0;
    right: -50%;
    bottom: 0;
  }

  .item:hover .line_top {
    width: 100%;
    left: 0;
  }

  .item:hover .line_right {
    height: 100%;
    top: 0;
  }

  .item:hover .line_bottom {
    height: 100%;
    bottom: 0;
  }

  .item:hover .line_left {
    width: 100%;
    right: 0;
  }

  .list-page {
    padding: 10px 0;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    background: #fff;
  }

  .list-loading {
    position: relative;
    padding: 10px;
    padding-right: 145px;
    margin-bottom: 10px;
    background: #fff;
  }

  .list-loading .wrap-img {
    display: block;
    position: absolute;
    top: 50%;
    margin-top: -60px;
    right: 10px;
    width: 125px;
    height: 100px;
    background: #eee;
  }

  .list-loading .name {
    margin-bottom: 10px;
    width: 180px;
    height: 27px;
    background: #eee;
  }

  .list-loading .description {
    margin: 0 0 8px;
    width: 70%;
    height: 24px;
    background: #eee;
  }

  .list-loading .description2 {
    width: 40%;
  }

  .list-loading .date {
    width: 113px;
    height: 21px;
    background: #eee;
  }

  .list-loading .type {
    width: 38px;
    height: 21px;
    background: #eee;
  }

  .list-loading .sqr {
    margin-right: 5px;
    width: 21px;
    height: 21px;
    background: #eee;
  }
</style>
