import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './components/layout'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueBus from 'vue-bus'
// import { resolve } from 'url';
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.prototype.HOST = '/api' //本地运行
// Vue.prototype.HOST = 'http://dulaoshi.club' //线上运行
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueBus);
let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: resolve => require(['@/pages/index'],resolve),
      children: [
        {
          path: '',
          redirect: 'list'
        },
        {
          path: 'list',
          name: '杜老湿个人博客系统-Powered by XiaoMing & adu',
          component: resolve => require(['@/pages/blog-list/list'],resolve),
        },
        {
          path: 'detail/:id',
          name: '杜老湿个人博客系统-博客详情',
          component: resolve => require(['@/pages/blog-list/details'],resolve)
        },
        {
          path: '/search',
          name: '杜老湿个人博客系统-搜索结果',
          component: resolve => require(['@/pages/search/search-list'],resolve)
        }
      ]
    },
    {
      path: '/about',
      name: '杜老湿个人博客系统-关于我们',
      component: resolve => require(['@/pages/about/about'],resolve)
    },
    {
      path: '/down',
      name: '杜老湿个人博客系统-源码下载',
      component: resolve => require(['@/pages/download/download'],resolve)
    },
    {
      path: '/error',
      name: '您要找的页面不存在',
      component: resolve => require(['@/pages/error/error-not-found'],resolve)
    },
    {
      path: '*',
      redirect: '/index'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
router.afterEach((to, from, next) => {
  document.title = to.name;
})
new Vue({
  el: '#app',
  router,
  VueBus,
  components: {Layout},
  template: '<Layout/>'
})
