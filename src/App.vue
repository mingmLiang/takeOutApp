<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
        <div class="tab-item">
          <router-link to="goods">商品</router-link>
        </div>
        <div class="tab-item">
          <router-link to="ratings">评价</router-link>
        </div>
        <div class="tab-item">
          <router-link to="seller">商家</router-link>
        </div>
    </div>
    <!-- 路由匹配到的组件将渲染在这里 -->
    <transition name="fade">
     <router-view></router-view>
    </transition>
  </div>
</template>

<script  type="text/ecmascript-6">
  import header from './components/header/header.vue';
  
  const errOK = 0;
  export default {
    data () {
      return {
        seller: {}
      };
    },
    created () {
      // vue-resource
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if (response.errno === errOK) {
          this.seller = response.data;
          console.log(this.seller);
        }
      }, response => {
            // error callback
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  // &表示选中当前父级
#app
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7,17,27,0.1))                                                              
    .tab-item
      flex: 1
      text-align:center
      & > a
        display:block
        font-size:14px
        color: rgb(77,85,93)
        &.active
         color: rgb(240,20,20)
</style>



