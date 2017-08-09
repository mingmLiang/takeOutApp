<template>
	<div class="goods">
		<div class="menu-wrapper" id="meunWrapper">
      <ul>
        <li v-for="item in goods"  class="menu-item">
          <span class="text border-1px" :class="{ textBlod: item.type>0 }">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    	<div class="foods-wrapper" id="footWrapper">
        <ul>
          <li v-for="item in goods" class="food-list">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>

              </li>
            </ul>
          </li>
        </ul>
      </div>
	</div>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartControl';
  const errOK = 0;

  export default {
    seller: {
      type: Object
    },
    data () {
      return {
        goods: [],
        meunScroll: {},
        footScroll: {}
      };
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === errOK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
          });
        }
      }, response => {
            // error callback
      });
    },
    methods: {
      _initScroll () {
        this.meunScroll = new BScroll(document.getElementById('meunWrapper'), {
        });
        this.footScroll = new BScroll(document.getElementById('footWrapper'), {
          click: true  // 是否派发click事件

        });
      }
    },
    components: {
      cartcontrol
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.goods
  display:flex
  position:absolute
  width:100%
  top:174px
  bottom:46px
  overflow:hidden
  .menu-wrapper
    flex:0 0 80px   //等分、缩放、占位
    width:80px   //如果不写在安卓浏览器会有问题
    background:#f3f5f7
    text-align:center
    text-align: -webkit-center
    .menu-item
      display:table
      height:54px
      width:56px
      line-height:14px
      .text
        display:table-cell
        width:56px
        vertical-align:middle
        border-1px(rgba(7,17,27,0.1))
        font-size:12px
        text-align: left
        &.textBlod
          font-weight:600
      .icon
        display:inline-block
        width:16px
        height:16px
        vertical-align:top
        margin-right:2px
        background-size:16px 16px
        background-repeat:no-repeat
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
  .foods-wrapper
    flex:1
    .title
      padding-left:14px
      height:26px
      line-height:26px
      border-left:2px solid #d9dde1
      font-size:12px
      color:rgb(147,153,159)
      background:#f3f5f7
    .food-item
      display:flex
      margin:18px
      padding-bottom:18px
      border-1px(rgba(7,17,27,0.1))
      &:last-child
        border-none()
        margin-bottom:0
      .icon
        flex:0 0 57px
        margin-right:10px
      .content
        flex:1
        .name
          margin:2px 0 8px 0
          height:14px
          line-height:14px
          font-size:14px
          color:rgb(7,17,27)
        .desc,.extra
          line-height:10px
          font-size:10px
          color:rgb(147,153,159)
        .desc
          margin-bottom:8px
          line-height:12px
        .extra
          .count
            margin-right:12px
        .price
          font-weight: 700
          line-height:24px
          .now
            margin-right:8px
            font-size:14px
            color:rgb(240,20,20)
          .old
            text-decoration:line-through
            font-size:10px
            color:rgb(147,153,159)
        .cartcontrol-wrapper
          position:absolute
          right:0px
          bottom:12px







</style>
