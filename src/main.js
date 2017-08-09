import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import Goods from 'components/goods/goods';
import Ratings from 'components/ratings/ratings';
import Seller from 'components/seller/seller';
import 'common/stylus/index.styl';
Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  {path: '/goods', component: Goods},
  {path: '/ratings', component: Ratings},
  {path: '/seller', component: Seller},
  {path: '*', redirect: 'goods'}
];
// linkActiveClass配置当导航激活 class 类
const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});

new Vue({
  template: '<App/>',
  components: {
    App
  },
  router
}).$mount('#app');
