<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="icon"></span>
      <span class="text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="detail">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <!-- 使用组件，并传参 -->
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item ,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close"  @click="colseDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  // 引入组件
  import star from '../star/star';
  export default {
    // 组件接受外部数据
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail () {
        this.detailShow = true;
      },
      colseDetail () {
        this.detailShow = false;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      // 注册组件
      star
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    color:#fff
    background:rgba(7,17,27,0.5)
    position:relative
    overflow:hidden  //去掉图片滤镜超出的部分
    .content-wrapper
      position:relative
      padding:24px 12px 18px 24px
      font-size:0
      .avatar
        display:inline-block
        font-size:14px
        vertical-align:top
        img
          border-radius:2px
      .content
        display:inline-block
        margin-left: 16px
        .title
          margin:2px 0 8px 0;
          .brand
            display:inline-block
            vertical-align:top
            width:30px
            height:18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left:6px
            font-size:16px
            line-height:18px
            font-weight:bold
        .description
          margin-bottom:10px
          line-height:12px
          font-size:12px
        .support
          .icon
            display:inline-block
            width:12px
            height:12px
            margin-right:4px
            background-size:12px 12px
            background-repeat:no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
            vertical-align:top
          .text
            line-height: 12px
            font-size: 10px
      .support-count
        position:absolute
        right:12px
        bottom:14px
        padding:0 8px
        height:24px
        line-height:24px
        border-radius:14px
        background-color: rgba(0,0,0,0.2)
        text-align:center
        .count
          vertical-align:top
          font-size:10px
        .icon-keyboard_arrow_right
          margin-left:2px
          font-size:10px
          line-height:24px
    .background
      position:absolute
      top:0
      left:0
      width:100%
      height:100%
      z-index:-1
      filter:blur(10px)
    .bulletin-wrapper
      height:28px
      line-height:28px
      overflow: hidden
      text-overflow:ellipsis
      white-space: nowrap
      background:rgba(0,0,0,0.2)
      position:relative
      padding-right: 26px
      .icon
        display:inline-block
        margin-left:12px
        bg-image('bulletin')
        width:23px
        height:13px
        background-size:23px 13px
        vertical-align:middle
      .text
        font-size:8px
      .icon-keyboard_arrow_right
          position: absolute
          margin-left: 2px
          font-size: 10px
          line-height: 24px
          right: 14px
          top: 2px
    .detail
      position:fixed
      z-index:100
      top:0
      left:0
      width:100%
      height:100%
      overflow:auto
      transition:all 0.5s
      backdrop-filter:blur(10px)
      opacity:1
      background-color:rgba(7,17,27,0.8)
      &.detail-enter,&.detail-leave-active
        transition:all 0.5s
        opacity:0
        background-color:rgba(7,17,27,0)
      .detail-wrapper
        min-height:100%
        width:100%
        .detail-main
          margin-top:64px
          padding-bottom:64px
          .name
            line-height:16px
            font-weight:700
            font-size:16px
            text-align:center
          .star-wrapper
            margin-top:18px
            padding:2px 0
            text-align:center
          .title
            display:flex
            width:80%
            margin:28px auto 24px auto
            .line
              flex:1
              position:relative
              top:-6px
              border-bottom:1px solid rgba(255,255,255,0.2)
            .text
              padding: 0 12px
              font-size:10px
              font-weight:700
          .supports
            width:80%
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-bottom:12px
              font-size:0
              &:last-child
                margin-bottom:0
              .icon
                display:inline-block
                width:16px
                height:16px
                vertical-align:top
                margin-right:6px
                background-size:16px 16px
                background-repeat:no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height:16px
                font-size:12px
          .bulletin
            width:80%
            margin:0 auto
            .content
              padding:0 12px
              line-height:24px
              font-size:12px
      .detail-close
        position:relative
        width:32px
        height:32px
        margin:-64px auto 0 auto
        clear:both
        font-size:32px
</style>
