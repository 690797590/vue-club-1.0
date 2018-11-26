<template>
  <div class="download">
    <div class="download-list" v-loading="loading">
      <div class="download-item" v-for="item in list">
        <div class="content">
          <div class="name">
            {{item.title}}
          </div>
          <div class="description">
            {{item.desc?item.desc:'暂无描述'}}
          </div>
          <div class="info">
            <i class="el-icon-date"></i>
            <span class="date">
              {{item.createTime.time|formatDate}}
            </span>
          </div>
          <a class="download-link" :href="item.downPath" target="_blank">
            <i class="el-icon-download"></i>
            <span>{{item.fileName}}</span>
          </a>
        </div>
        <span class="line line_top"></span>
        <span class="line line_right"></span>
        <span class="line line_bottom"></span>
        <span class="line line_left"></span>
      </div>
      <div class="none" v-if="empty">
        <img src="../../assets/img/not_bz.jpeg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '../../assets/js/formatDate'

  export default {
    name: "download",
    data() {
      return {
        loading: false,
        empty: false,
        list: []
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true
        this.$axios({
          method: 'get',
          url: this.HOST + '/downLoad/list'
        }).then((response) => {
          // console.log(response.data)
          this.list = response.data
          // console.log(this.list.length)
          if (this.list.length == 0) {
            this.empty = true
          }
          this.loading = false

        }).catch(function (error) {
          this.empty = true
          console.log(error);
        })
      }
    }
  }
</script>

<style scoped>
  .download {
    margin: 20px auto 0;
    width: 1000px;
    clear: both;
  }

  .none {
    padding: 100px 0;
    background: #fff;
  }

  .none img {
    display: block;
    margin: 0 auto;
    width: 200px;
  }

  .download-list {
    min-height: 400px;
  }

  .download-item {
    position: relative;
    padding: 10px;
    margin-bottom: 10px;
    background: #fff;
  }

  .download-item .name {
    margin-bottom: 4px;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    cursor: pointer;
  }

  .info .date {
    color: #b4b4b4;
  }

  .download-item .line {
    display: inline-block;
    background-color: #ff6700;
    position: absolute;
    transition: 0.5s ease;
  }

  .download-item .line_top {
    height: 2px;
    width: 0;
    left: -50%;
    top: 0;
  }

  .download-item .line_right {
    height: 0;
    width: 2px;
    top: -50%;
    right: 0;
  }

  .download-item .line_bottom {
    width: 2px;
    height: 0;
    bottom: -50%;
    left: 0;
  }

  .download-item .line_left {
    height: 2px;
    width: 0;
    right: -50%;
    bottom: 0;
  }

  .download-item:hover .line_top {
    width: 100%;
    left: 0;
  }

  .download-item:hover .line_right {
    height: 100%;
    top: 0;
  }

  .download-item:hover .line_bottom {
    height: 100%;
    bottom: 0;
  }

  .download-item:hover .line_left {
    width: 100%;
    right: 0;
  }

  .download-item .description {
    margin: 0 0 8px;
    font-size: 13px;
    line-height: 24px;
    color: #999;
    word-wrap: break-word;
  }

  .download-item .info {
    margin-bottom: 5px;
  }

  .info i {
    color: #ff6700;
  }

  .download-item .download-link {
    padding: 2px 5px;
    color: #fff;
    background: #42b983;
    border-radius: 3px;
    font-size: 16px;
  }

  .download-item .download-link:hover {
    background: #ff6700;
  }
</style>
