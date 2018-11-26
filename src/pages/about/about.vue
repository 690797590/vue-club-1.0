<template>
  <div class="about">
    <div class="header">
      <i class="el-icon-info"></i><span>关于博主</span>
    </div>
    <div class="about-main clearfix">
      <div class="about-l">
        <div class="content">
          <div class="item" :class="h5?'active':''">
            <div class="row user-img">
              <div class="row-l">头像：</div>
              <div class="row-r">
                <img
                  src="//upload.jianshu.io/users/upload_avatars/9633270/02cf37a0-9be6-4a7a-9b1b-db32fddfb279.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240"
                  alt="">
              </div>
            </div>
            <div class="row">
              <div class="row-l">昵称：</div>
              <div class="row-r">笨蛋小明</div>
            </div>
            <div class="row">
              <div class="row-l">签名：</div>
              <div class="row-r">
                Some of us get dipped in flat, some in satin, some in gloss. But every once in a while you find someone
                who's
                iridescent, and when you do, nothing will ever compare.
              </div>
            </div>
            <div class="row">
              <div class="row-l">爱好：</div>
              <div class="row-r">吃饭、睡觉、打DOTA</div>
            </div>
            <div class="row">
              <div class="row-l">个人简介：</div>
              <div class="row-r">吐槽星人、优秀的少先队员</div>
            </div>
            <div class="row">
              <div class="row-l">社交网站：</div>
              <div class="row-r">
                <div class="user-des">
                  <a class="social-icon social-icon-weibo" target="_blank" href=""></a>
                  <a class="social-icon social-icon-wechat" target="_blank" href=""></a>
                  <a class="social-icon social-icon-qq" target="_blank" href=""></a>
                  <a class="social-icon social-icon-qzone" target="_blank"
                     href="https://user.qzone.qq.com/690797590/infocenter"></a>
                  <a class="social-icon social-icon-jianshu" target="_blank"
                     href="https://www.jianshu.com/u/9f1d1dcbe846"></a>
                </div>
              </div>
            </div>
          </div>
          <div class="item" :class="h5?'':'active'">
            <div class="row user-img">
              <div class="row-l">头像：</div>
              <div class="row-r">
                <img
                  :src="info.imageName"
                  alt="">
              </div>
            </div>
            <div class="row">
              <div class="row-l">昵称：</div>
              <div class="row-r">{{info.userName}}</div>
            </div>
            <div class="row">
              <div class="row-l">签名：</div>
              <div class="row-r">{{info.sign}}</div>
            </div>
            <div class="row">
              <div class="row-l">爱好：</div>
              <div class="row-r">吃饭、睡觉、搬砖</div>
            </div>
            <div class="row">
              <div class="row-l">个人简介：</div>
              <div class="row-r">一名爱坐地铁的Java开发、鸭腿爱好者</div>
            </div>
            <div class="row">
              <div class="row-l">社交网站：</div>
              <div class="row-r">
                <div class="user-des">
                  <a target="_blank" href="https://user.qzone.qq.com/335068048/infocenter"
                     class="social-icon social-icon-qzone"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="about-r">
        <div class="user-info">
          <div class="user-wrap" @click="checkH5()" :class="h5?'active':''">
            <img class="select-icon" src="../../assets/img/select_right.png" alt="">
            <div class="img-wrap">
              <img
                src="//upload.jianshu.io/users/upload_avatars/9633270/02cf37a0-9be6-4a7a-9b1b-db32fddfb279.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240"
                alt="">
            </div>
            <div class="user-name">笨蛋小明</div>
            <div class="user-des">
              <div class="title">个人介绍</div>
              <div class="details">
                Some of us get dipped in flat, some in satin, some in gloss. But every once in a while you find someone
                who's
                iridescent, and when you do, nothing will ever compare.
              </div>
              <a class="social-icon social-icon-weibo" target="_blank" href=""></a>
              <a class="social-icon social-icon-wechat" target="_blank" href=""></a>
              <a class="social-icon social-icon-qq" target="_blank" href=""></a>
              <a class="social-icon social-icon-qzone" target="_blank"
                 href="https://user.qzone.qq.com/690797590/infocenter"></a>
              <a class="social-icon social-icon-jianshu" target="_blank"
                 href="https://www.jianshu.com/u/9f1d1dcbe846"></a>
            </div>
          </div>
          <div class="user-wrap" @click="checkJava()" :class="h5?'':'active'">
            <img class="select-icon" src="../../assets/img/select_right.png" alt="">
            <div class="img-wrap">
              <img
                :src="info.imageName"
                alt="">
            </div>
            <div class="user-name">{{info.userName}}</div>
            <div class="user-des">
              <div class="title">个人介绍</div>
              <div class="details">
                {{info.sign}}
              </div>
              <a class="social-icon social-icon-qzone" target="_blank"
                 href="https://user.qzone.qq.com/335068048/infocenter"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "about",
    data() {
      return {
        loading: false,
        info: '',
        h5: true
      }
    },
    created() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        this.loading = true
        this.$axios({
          method: 'get',
          url: this.HOST + '/common/getBlogger'
        }).then((response) => {
          // console.log(response.data)
          this.info = response.data
          this.loading = false
        }).catch(function (error) {
          console.log(error);
        })
      },
      checkH5() {
        this.h5 = true
      },
      checkJava() {
        this.h5 = false
      }
    }
  }
</script>

<style scoped>
  .about {
    margin: 20px auto 0;
    width: 1000px;
    min-height: 500px;
    clear: both;
  }

  .about .header {
    padding: 10px;
    margin-bottom: 10px;
    font-size: 18px;
    color: #555555;
    background: #fff;
  }

  .header i {
    margin-right: 10px;
    color: #ff6700;
  }

  .about-l {
    position: relative;
    float: left;
    width: 75%;
    /*min-height: 730px;*/
    background: #fff;
  }

  .about-r {
    position: relative;
    float: left;
    width: 25%;
  }

  .user-info {
    padding-left: 10px;
  }

  .user-wrap {
    position: relative;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #dfdfdf;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
  }

  .user-wrap .select-icon {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
  }

  .active .select-icon {
    display: block;
  }

  .user-info .active {
    border-color: #ff6700;
  }

  .img-wrap {
    margin: 10px auto 20px;
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 100px;
  }

  .img-wrap img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .user-name {
    margin-bottom: 10px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
  }

  .user-des .title {
    margin-bottom: 10px;
    font-size: 14px;
    color: #969696;
  }

  .user-des .details {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    margin-bottom: 10px;
    height: 120px;
    line-height: 20px;
    font-size: 14px;
  }

  .social-icon {
    display: inline-block;
    vertical-align: middle;
    margin: 0 5px 0 0;
    padding: 0;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-size: 20px 20px;
  }

  .user-des .social-icon:last-child {
    margin-right: 0;
  }

  .user-des .social-icon-weibo {
    background-image: url(../../assets/img/weibo.png);
  }

  .user-des .social-icon-wechat {
    background-image: url(../../assets/img/wechat.png);
  }

  .user-des .social-icon-qq {
    background-image: url(../../assets/img/qq.png);
  }

  .user-des .social-icon-qzone {
    background-image: url(../../assets/img/qzone.png);
  }

  .user-des .social-icon-jianshu {
    background-image: url(../../assets/img/jianshu.png);
  }

  .about .content {
    padding: 0 10px;
    min-height: 300px;
  }

  .content .item {
    display: none;
  }

  .content .active {
    display: block;
  }

  .row {
    display: flex;
    padding: 20px 0;
    line-height: 22px;
    border-bottom: 1px solid #f0f0f0;
  }

  .item .row:last-child {
    border-bottom: 0;
  }

  .row .row-l {
    width: 90px;
    font-size: 15px;
    color: #969696;
  }

  .row .row-r {
    flex: 1;
    width: 0;
    font-size: 15px;
    color: #333;
  }

  .user-img .row-l {
    line-height: 100px;
  }

  .user-img img {
    width: 100px;
    height: 100px;
    border: 1px solid #ddd;
    border-radius: 50%;
  }

  .row .social-icon {
    width: 22px;
    height: 22px;
  }
</style>
