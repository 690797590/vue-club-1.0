<template>
    <header class="layout-header">
        <div class="header">
            <h1>
                <router-link to="/index" class="logo">
                    <img src="../assets/img/logo.png" alt="logo">
                </router-link>
            </h1>
            <nav>
                <ul>
                    <router-link tag="li" to="/index">
                        <a>首页</a>
                    </router-link>
                    <router-link tag="li" to="/about">
                        <a>关于博主</a>
                    </router-link>
                    <router-link tag="li" to="/down">
                        <a>本站源码下载</a>
                        <!--<i class="slide-icon"></i>-->
                        <!--<div class="slide-menu">-->
                        <!--<strong>前端</strong>-->
                        <!--<a>xxxx</a>-->
                        <!--<a>xxxx</a>-->
                        <!--<strong>后端</strong>-->
                        <!--<a>xxxx</a>-->
                        <!--<a>xxxx</a>-->
                        <!--</div>-->
                    </router-link>
                    <li>
                        <a target="_blank" href="http://dulaoshi.club/login.jsp">后台管理</a>
                    </li>
                    <li>
                        <a href="http://dulaoshi.club/jsp-index">返回旧版</a>
                    </li>
                    <li class="minapp">
                        小程序
                        <div class="min-app-control">
                            <p>微信扫码<br>查看博客小程序</p>
                            <span>
                                <img src="../assets/img/ico_minapp.jpg" alt="微信小程序" />
                                <em>阅读体验更佳</em>
                            </span>
                        </div>
                    </li>
                </ul>
            </nav>
            <!--active in search-->
            <div class="search">
                <input @blur="blur" v-focus="searchOn" class="search-input" v-model.trim="searchVal"
                       @keyup="enterSearch($event)"
                       placeholder="请输入想要查询的关键字...">
                <span class="search-icon" @click="toResult"></span>
                <div class="search-result">
                    <a href="javascript:;">
                        Android 日志系统
                    </a>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "layout-header",
        data() {
            return {
                searchVal: '',
                searchOn: false
            }
        },
        // computed: {
        //   tirmSearch() {
        //     return this.searchVal.trim()
        //   }
        // },
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
            this.$bus.on('tagSearchTxt', this.setSearch);
        },
        beforeDestroy() {
            this.$bus.off('tagSearchTxt', this.setSearch);
        },
        methods: {
            enterSearch: function (e) {
                if (e.keyCode == 13) {
                    if (this.searchVal == "") {
                        this.searchVal = ""
                        this.searchWarn()
                        return;
                    } else {
                        this.toResult();
                    }
                }
            },
            searchWarn() {
                this.$message({
                    message: '搜索内容不能为空!',
                    type: 'error'
                });
            },
            toResult() {
                if (this.searchVal == "") {
                    this.searchVal = ""
                    this.searchWarn()
                    return;
                }
                const data = this.searchVal
                // console.log(typeof this.searchVal)
                this.$router.push({path: '/search', query: {data}})
            },
            setSearch(data) {
                this.searchVal = data.searchText
                this.searchOn = true
            },
            blur() {
                this.searchOn = false
            }
        }
    }
</script>

<style scoped>
    .layout-header {
        position: relative;
        background: #fff;
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid #e4e4e4;
    }

    .layout-header .header {
        width: 1000px;
        margin: 0 auto;
    }

    .header h1 {
        float: left;
        padding-top: 17px;
        margin: 0 45px 0 0;
    }

    .header h1 a {
        display: block;
    }

    .header h1 img {
        display: block;
        width: 36px;
        height: 36px;
    }

    nav {
        float: left;
    }

    nav li {
        color: #555;
        list-style: none;
        line-height: 70px;
        padding-right: 32px;
        text-decoration: none;
        font-size: 15px;
        float: left;
        cursor: pointer;
        position: relative;
    }

    nav .router-link-active a {
        color: #ff6700;
    }

    nav a {
        color: #555555;
        text-decoration: none;
        font-size: 15px;
    }

    nav a:hover {
        color: #ff6700;
    }

    nav .slide-icon {
        display: inline-block;
        width: 20px;
        margin-left: 5px;
        height: 20px;
        background: url(../assets/img/down_icon.png) no-repeat;
        background-size: 100% 100%;
        vertical-align: middle;
        transition: All 0.4s ease-in-out;
        -webkit-transition: All 0.4s ease-in-out;
        -moz-transition: All 0.4s ease-in-out;
        -o-transition: All 0.4s ease-in-out;
    }

    nav li:hover .slide-icon {
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
    }

    nav li:hover .slide-menu {
        display: block;
    }

    .slide-menu {
        display: none;
        position: absolute;
        left: 0;
        top: 69px;
        z-index: 1000;
        width: 200px;
        padding: 5px 0;
        background: #fff;
        border-top: 1px solid #E4E4E4;
        box-shadow: -1px 3px 5px rgba(000, 000, 000, 0.3);
        cursor: default;
    }

    .slide-menu strong {
        display: block;
        font-size: 12px;
        line-height: 20px;
        font-weight: normal;
        padding: 0px 15px;
        color: #b9b9b9;
        background: #fafafa;
    }

    .slide-menu a {
        display: block;
        font-size: 12px;
        line-height: 30px;
        padding: 0px 15px;
        cursor: pointer;
    }

    .slide-menu a:hover {
        color: #ff6700;
    }

    .header .search {
        display: inline-block;
        float: right;
        margin-top: 20px;
        height: 32px;
        width: 230px;
        border: 1px solid #e4e4e4;
        transition: all .3s;
    }

    .search.active {
        border-color: #35b558;
        box-shadow: 0 0 5px #35b558;
    }

    .search input {
        float: left;
        width: 190px;
        height: 30px;
        border: none;
        padding: 0px 8px;
        border-right: 1px solid #e4e4e4;
        outline: none;
        font-size: 12px;
    }

    .search.active input {
        border-right-color: #35b558;
    }

    .search-icon {
        width: 18px;
        height: 18px;
        float: right;
        margin-top: 6px;
        margin-right: 10px;
        display: inline-block;
        background: url(../assets/img/search_icon.png) no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
    }

    .search .search-result {
        display: none;
        width: 230px;
        margin-left: -1px;
        margin-top: 31px;
        border: 1px solid #e4e4e4;
        background-color: #fff;
        list-style: none;
        box-shadow: -1px 3px 5px rgba(000, 000, 000, 0.3);
    }

    .active .search-result {
        z-index: 999;
        position: relative;
        display: block;
    }

    .search .search-result a {
        position: relative;
        display: block;
        color: #333;
        font-size: 12px;
        height: 30px;
        padding-left: 10px;
        padding-right: 10px;
        line-height: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .search .search-result a:hover {
        color: #ff6700;
    }

    .minapp {
        padding-left: 23px;
        background: url(../assets/img/img_minapp.png) no-repeat left center;
        background-size: 20px 20px;
        cursor: pointer;
    }

    .minapp:hover {
        color: #ff6700;
        background-image: url(../assets/img/img_minapp_active.png);

    }
    .minapp:hover .min-app-control {
        display: block;
    }
    .min-app-control {
        display: none;
        position: absolute;
        padding: 16px 16px 39px;
        width: 160px;
        top: 58px;
        left: -35px;
        z-index: 99999;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .1);
        box-sizing: border-box;
        text-align: center;
        color: #555!important;
    }

    .min-app-control p {
        text-align: center;
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 6px;
    }

    .min-app-control img {
        display: block;
        width: 90px;
        height: 90px;
    }

    .min-app-control span {
        display: inline-block;
        position: relative;
        text-align: center;
        font-size: 0;
        vertical-align: middle;
    }

    .min-app-control em {
        display: inline-block;
        position: absolute;
        left: 0;
        bottom: -26px;
        width: 100%;
        font-style: normal;
        font-size: 14px;
        vertical-align: middle;
        line-height: 18px;
    }
</style>
