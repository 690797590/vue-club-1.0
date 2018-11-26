<template>
  <div class="list-detail">
    <div class="detail-wrap">
      <div class="header">
        <i class="el-icon-document"></i>
        <span>博客信息</span>
      </div>
      <div class="main">
        <div class="main-title">{{detail.title}} <span>{{detail.blogType.typeName}}</span></div>
        <div class="content" v-html="detail.content"></div>
        <div class="keyword" v-if="detail.keyWord">关键词：<span class="keys">{{detail.keyWord}}</span></div>
        <div class="info">
          <i class="el-icon-date"></i>
          <span>{{detail.releaseDate.time|formatDate}}</span>
          <i class="el-icon-view"></i>
          <span>{{detail.clickHit}}</span>
          <i class="el-icon-edit-outline"></i>
          <span>{{detail.replyHit}}</span>
          <span class="type" @click="search(detail.blogType.typeName)">{{detail.blogType.typeName}}</span>
        </div>
        <div class="more">
          <div class="more-item">
            <span>上一篇：</span>
            <span @click="navBlog(lastBlog.id)" :data-id="lastBlog.id" class="more-title">{{lastBlog.title}}</span>
            <span class="no-more" v-if="!lastBlog">已经是第一篇啦～</span>
          </div>
          <div class="more-item">
            <span>下一篇：</span>
            <span @click="navBlog(lastBlog.id)" :data-id="lastBlog.id" class="more-title">{{nextBlog.title}}</span>
            <span class="no-more" v-if="!nextBlog">已经是最后一篇啦～</span>
          </div>
        </div>
      </div>
      <div class="reply">
        <div class="reply-header">
          <i class="el-icon-edit"></i>
          <span>评论信息</span>
        </div>
        <div class="reply-title">
          <span>{{replyList.total}}条评论</span>
          <!--<div class="fr">-->
          <!--<a class="active">按时间倒序</a>-->
          <!--<a>按时间正序</a>-->
          <!--</div>-->
        </div>
        <div class="reply-list" v-loading="replyLoading">
          <div class="reply-item" v-for="(item,index) in replyList.list">
            <!--<span class="item-title">{{total-(currentPage-1)*10-index}}楼 {{item.userIp}}</span>-->
            <span class="item-title">{{item.floor}}楼 {{item.userIp}}</span>
            <span class="sub-title">网友：</span>
            <span class="des">{{item.content}}</span>
            <div class="date">
              <i class="el-icon-date"></i>
              <span>{{item.commentDate.time|formatDate}}</span>
            </div>
          </div>
        </div>
        <div v-if="replyEmpty" class="empty-reply">
          <div class="no-comment"></div>
          <div class="text">
            智慧如你，不想<a @click="focusReply">发表一点想法</a>咩~
          </div>
        </div>
        <!--分页 start-->
        <div v-if="hasPage" class="list-page">
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
        <div class="reply-form">
          <textarea name="reply" @blur="blur" v-focus="focusStatus" v-model.trim="content" placeholder="写下你的评论..."
                    @keyup="enterReply($event)"></textarea>
          <div class="code">
            <div class="code-content clearfix hide">
              <div class="code-int">
                <el-input placeholder="请输入验证码" v-model="code" clearable>
                  <template slot="prepend">验证码</template>
                </el-input>
              </div>
              <div class="code-img">
                <img src="" alt="">
              </div>
              <div class="code-change">看不清？点击换一张</div>
            </div>
            <div class="submit">
              <el-button type="primary" @click="reply">提交评论</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '../../assets/js/formatDate'

  export default {
    name: "list-detail",
    data() {
      return {
        loading: false,
        replyLoading: false,
        detail: {
          releaseDate: '',
          blogType: '',
        },
        replyList: {
          list: []
        },
        code: '',
        content: '',
        replyEmpty: false,
        focusStatus: false,
        lastBlog: '',
        nextBlog: '',
        currentPage: 1,
        pageSize: 1,
        total: 0,
        hasPage: false
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    directives: {
      focus: {
        update: function (el, {value}) {
          if (value) {
            // console.log("focus")
            el.focus()
          }
        }
      }
    },
    created() {
      this.getDetail()
      this.getReply()
    },
    watch: {
      '$route'(to, from) {
        if (to.name === '杜老湿个人博客系统-博客详情') {
          // console.log("进入详情路由")
          this.getDetail()
          this.getReply()
        }
      }
    },
    methods: {
      getDetail() {
        this.loading = true
        const blogID = this.$route.params.id
        // console.log(blogID)
        this.$axios({
          method: 'get',
          url: this.HOST + '/blog/articles2/' + blogID,
          timeout: 5000
        }).then((response) => {
          // if(response.data.code == 500){
          //   this.$router.push({ path: '/error' })
          // }


          // console.log(response.data)
          this.detail = response.data.blog
          if (response.data.lastBlog) {
            this.lastBlog = response.data.lastBlog
          }
          if (response.data.nextBlog) {
            this.nextBlog = response.data.nextBlog
          }
          this.loading = false
        }).catch((error) => {
          if (error.response) {
            console.log(error.response.status);
            if (error.response.status == 500||error.response.status == 400) {
              this.$router.push('/error')
            }

          } else {
            console.log('Error', error.message);
          }
          // console.log(error.config);
        })
      },
      getReply() {
        this.replyLoading = true
        const blogID = this.$route.params.id
        this.$axios({
          method: 'get',
          url: this.HOST + '/blog/getCommentList',
          params: {
            id: blogID,
            page: 1
          }
        }).then((response) => {
          // console.log(response.data)
          this.replyList = response.data
          this.total = response.data.total
          this.pageSize = response.data.pageSize
          if (response.data.list.length > 0) {
            this.hasPage = true
            this.replyEmpty = false
          } else {
            this.hasPage = false
            this.replyEmpty = true
          }
          this.replyLoading = false
        }).catch((error) => {
          console.log(error);
        })
      },
      handleCurrentChange(val) {
        this.replyLoading = true
        const blogID = this.$route.params.id
        this.$axios({
          method: 'get',
          url: this.HOST + '/blog/getCommentList',
          params: {
            id: blogID,
            page: val
          }
        }).then((response) => {
          // console.log(response.data)
          this.replyList.list = response.data.list
          if (response.data.list.length > 0) {
            this.hasPage = true
          }
          if (this.replyList.length == 0) {
            this.replyEmpty = true
          } else {
            this.replyEmpty = false
          }
          this.replyLoading = false
        }).catch((error) => {
          console.log(error);
        })
      },
      enterReply(e) {
        if (e.keyCode == 13) {
          if (this.content == "") {
            this.content = ""
            this.replyWarn()
            return;
          } else {
            this.reply();
          }
        }
      }
      ,
      reply() {
        if (this.content == "") {
          this.content = ""
          this.replyWarn()
          return;
        }
        const data = this.content
        const id = this.$route.params.id
        const param = {
          'content': data,
          'blog': {
            'id': id
          }
        }

        this.$axios.post(this.HOST + '/comment/save2', param)
          .then((response) => {
            // console.log(response.data)
            this.replySuccess()
            this.content = ''
          }).catch((error) => {
          console.log(error);
        })


      },
      replyWarn() {
        this.$message({
          message: '评论内容不能为空!',
          type: 'error'
        });
      },
      replySuccess() {
        this.$message({
          message: '评论成功等待后台审核。',
          type: 'success'
        });
      },
      focusReply() {
        this.focusStatus = true
      },
      blur() {
        // console.log("blur")
        this.focusStatus = false
      },
      navBlog(id) {
        this.$router.push({path: `/index/detail/${id}`})
      },
      search(data) {
        this.tagSearchTxt(data)
        this.$router.push({path: '/search', query: {data}})
      },
      tagSearchTxt(data) {
        this.$bus.emit('tagSearchTxt', {searchText: data});
      }
    }
  }
</script>

<style scoped>
  .detail-wrap {
    word-wrap: break-word;
  }

  .header {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 18px;
    color: #555555;
    background: #fff;
  }

  .header i, .reply i {
    color: #ff6700;;
  }

  .main {
    padding: 10px;
    background: #fff;
  }

  .content {
    min-height: 300px;
  }

  .main .main-title {
    word-break: break-word !important;
    word-break: break-all;
    font-family: -apple-system, SF UI Display, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    font-size: 34px;
    font-weight: 700;
    line-height: 1.3;
  }

  .main i {
    color: #ff6700;
  }

  .main .content {
    padding: 10px 0;
  }

  .main .info {
    font-size: 14px;
    color: #969696;
  }

  .main .info span {
    margin-right: 5px;
  }

  .main .keyword {
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 1.5;
  }

  .keyword .keys {
    color: #f66;
  }

  .more {
    margin: 10px 0 0;
    padding-top: 10px;
    border-top: 1px dashed #555;
  }

  .more .more-item {
    margin-bottom: 10px;
    line-height: 20px;
    color: #444;
    font-size: 14px;
  }

  .more .more-item:last-child {
    margin-bottom: 0;
  }

  .more .more-title {
    cursor: pointer;
  }

  .more .more-title:hover {
    color: #ff6700;
  }

  .reply {
    margin-top: 10px;
    padding: 10px;
    background: #fff;
  }

  .reply .reply-header {
    padding: 0 0 10px;
    font-size: 18px;
    color: #555555;
    border-bottom: 1px solid #E5E5E5;
  }

  .reply-header i {
    margin-right: 5px;
  }

  .reply-title {
    padding: 20px 0;
    font-size: 17px;
    font-weight: 700;
    border-bottom: 1px solid #f0f0f0;
  }

  .reply-title a {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 400;
    color: #969696;
    display: inline-block;
    cursor: pointer;
  }

  .reply-title .active {
    color: #333 !important;
  }

  .reply-title a:hover {
    color: #ff6700;
  }

  .reply-list .reply-item {
    padding: 10px 0;
    line-height: 1.5;
    font-size: 16px;
    word-break: break-word !important;
    word-break: break-all;
    border-bottom: 1px dashed #dfdfdf;
  }

  .reply-list .reply-item:last-child {
    border-bottom: 0;
  }

  .reply-item .item-title {
    color: #101010;
    font-weight: 700;
  }

  .reply-item .date {
    font-size: 14px;
    color: #969696;
  }

  .reply-form {
    padding-top: 10px;
    border-top: 1px solid #f0f0f0;
  }

  .reply-form textarea {
    padding: 10px 15px;
    width: 70%;
    height: 80px;
    font-size: 13px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    background-color: hsla(0, 0%, 71%, .1);
    resize: none;
    display: inline-block;
    vertical-align: top;
    outline-style: none;
  }

  .code {
    width: 70%;
  }

  .code-int {
    float: left;
    width: 220px;
  }

  .submit {
    margin-top: 10px;
  }

  .code-content {
    margin-top: 10px;
  }

  .code-img {
    float: left;
    margin-left: 10px;
    width: 120px;
    height: 40px;
    border: 1px solid #dfdfdf;
  }

  .code-img img {
    height: 40px;
  }

  .code-change {
    float: left;
    margin-left: 10px;
    line-height: 40px;
    color: #888;
    cursor: pointer;
  }

  .code-change:hover {
    color: #ff6700;
  }

  .info .type {
    padding: 2px 5px;
    color: #fff;
    background: #42b983;
    border-radius: 3px;
    cursor: pointer;
  }

  .info .type:hover {
    background: #ff6700;
    text-decoration: underline;
  }

  .empty-reply .no-comment {
    width: 226px;
    height: 92px;
    margin: 30px auto 20px;
    background: url('../../assets/img/no_comment.png') no-repeat;
    background-size: contain;
  }

  .empty-reply .text {
    margin-bottom: 50px;
    text-align: center;
    font-size: 12px;
    color: #969696;
  }

  .empty-reply .text a {
    color: #3194d0;
    cursor: pointer;
  }

  .empty-reply .text a:hover {
    color: #ff6700;
  }

  .list-page {
    padding: 10px;
  }

  .sub-title {
    color: #969696;
  }
</style>
