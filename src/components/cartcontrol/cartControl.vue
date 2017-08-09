<template>
    <div class="cartControl">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="cartdecreaseCart"></div>
      <div class="cart-count" >{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    export default {
      props: {
        food: {
          type: Object
        }
      },
      methods: {
        addCart (event) {
          if (!event._constructed) {
            // 不是betterScroll派发的事件不触发（实现PC端点击也只触发一次）
            return;
          }
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1);
            this.food.count = 1;
            // 在vue中，可以直接赋值不存在的对象，但是无法观察到变化
          } else {
            this.food.count++;
          }
        },
        cartdecreaseCart (event) {
          if (!event._constructed) {
            // 不是betterScroll派发的事件不触发（实现PC端点击也只触发一次）
            return;
          }
          if (this.food.count) {
            this.food.count--;
          }
        }
      }
    };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .cartControl
    font-size:0
    .cart-decrease,.cart-add,.cart-count
      display:inline-block
      padding:6px 3px
      font-size:24px
      line-height:24px
      color:rgb(0,160,220)
    .cart-count
      vertical-align:top
      width:12px
      text-align:center
      font-size:10px
      color:rgb(147,153,159)
      padding:6px 0




</style>
