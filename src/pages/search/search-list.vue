<template>
  <div class="search-list">
    <div class="header-wrap">
      <div class="header">
        <i class="el-icon-search"></i>
        <span>搜索</span>
        <span class="keyword">{{data}}</span>
        <span>(总共搜索到</span>
        <span class="number"> {{total}} </span>
        <span>条记录)</span>
      </div>
    </div>
    <div class="main">
      <div v-loading="loading" v-if="list.length" class="list">
        <div v-for="item in list" class="item" :data-id="item.id" @click="detail(item.id)">
          <div class="title" v-html="item.title"></div>
          <div class="des">
            <span>摘要:</span>
            <span v-html="item.content"></span>
          </div>
          <div class="date">
            <i class="el-icon-date"></i>
            <span>{{item.releaseDateStr}}</span>
          </div>
          <span class="line line_top"></span>
          <span class="line line_right"></span>
          <span class="line line_bottom"></span>
          <span class="line line_left"></span>
        </div>
      </div>
      <!--tip start-->
      <div class="none" v-if="empty">
        <img src="../../assets/img/empty.png" alt="">
        <div class="none-txt">{{resultTip}}</div>
      </div>
      <!--tip end-->
    </div>
    <!--分页 start-->
    <div v-if="!empty" class="list-page">
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
  </div>
</template>

<script>
  import {formatDate} from '../../assets/js/formatDate'

  export default {
    name: "search-list",
    data() {
      return {
        list: '',
        data: '',
        currentPage: 1,
        pageSize: 1,
        total: 0,
        resultTip: '未查询到结果，要不要换个关键字试试呢～',
        empty: false,
        loading: false
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    created() {
      this.search()
    },
    watch: {
      '$route': 'search'
    },
    methods: {
      search: function () {
        this.empty = false
        // console.log(this.$route.query.data)
        this.data = this.$route.query.data
        let param = new URLSearchParams();
        param.append("q", this.data);
        param.append("page", 1);
        this.$axios.post(this.HOST + '/blog/q2', param)
          .then((response) => {
            // console.log(response.data)
            this.list = response.data.list
            this.pageSize = response.data.pageSize
            this.total = response.data.total
            if (this.list.length == 0) {
              this.empty = true
            }else{
              this.empty = false
            }
          }).catch((error) => {
          console.log(error);
          this.empty = true
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.loading = true
        let param = new URLSearchParams();
        param.append("q", this.data);
        param.append("page", this.currentPage);
        this.$axios.post(this.HOST + '/blog/q2', param)
          .then((response) => {
            console.log(response.data)
            this.list = response.data.list
            this.pageSize = response.data.pageSize
            this.total = response.data.total
            if (this.list.length == 0) {
              this.empty = true
            }else{
              this.empty = false
            }
            this.loading = false
          }).catch((error) => {
          console.log(error);
        })
      },
      detail(id){
        this.$router.push({path: `/index/detail/${id}`})
      }
    }
  }
</script>

<style scoped>

  .header-wrap {
    background: #fff;
  }

  .header {
    padding: 10px;
    font-size: 15px;
  }

  .header .keyword {
    font-weight: 700;
    color: #ff6700;
  }

  .header .number {
    color: #f66;
  }

  .main {
    min-height: 134px;
  }

  .none {
    padding: 100px 0;
  }

  .none img {
    display: block;
    margin: 0 auto 40px;
    width: 100px;
  }

  .none .none-txt {
    font-size: 16px;
    line-height: 20px;
    color: #999;
    text-align: center;
  }

  .list-page {
    padding: 10px;
    background: #fff;
  }

  .item {
    position: relative;
    margin: 10px 0;
    padding: 10px;
    background: #fff;
    cursor: pointer;
  }

  .item .title {
    position: relative;
    padding: 10px 0 10px 10px;
    font-size: 16px;
    line-height: 1.5;
  }
  .item .title:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -12px;
    width: 3px;
    height: 24px;
    background: #888;
  }

  .item .des {
    margin-bottom: 7px;
    font-size: 14px;
    line-height: 1.5;
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
</style>
