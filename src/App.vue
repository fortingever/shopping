<template>
  <div id="app">
    <!-- 标题 -->
    <header class="header">
      <h1>购物商城</h1>
    </header>

    <router-view/>

    <!-- 页脚 -->
    <ul class="mod-navs theme-spline-top">
      <li>
        <router-link class="navs-item-home" to="/">首页</router-link>
      </li>
      <li>
        <router-link class="navs-item-menu" to="/list">闪送超市</router-link>
      </li>
      <li>
        <router-link class="navs-item-cart" to="/cart">购物车
          <div class="navs-bubble navs-bubble-num">{{ $store.getters.total }}</div>
        </router-link>
      </li>
      <li>
        <router-link class="navs-item-mine" to="/">我的</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus" scoped>
  .header
    background-color: #ffd600;
    height: 4.5rem;
    h1
      height: 4.5rem;
      line-height: 4.5rem;
      font-size: 1.4rem;
      font-weight: 700;
      text-align: center;

  .mod-navs
    position: absolute;
    z-index: 150;
    left: 0;
    right: 0;
    bottom: 0;
    height: 5rem;
    background-color: rgba(246,246,246,.95);
    li
      float: left;
      position: relative;
      width: 25%;
      a
        display block
        font-size: 1.2rem;
        color: #777;
        text-align: center;
        background: no-repeat center .6rem;
        background-size: auto 2rem;
        padding-top: 3rem;
        .num
          position absolute
          top: .5rem
          left 50%
          width: 1.5rem
          margin-left 1rem
          height: 1.5rem
          text-align center
          border-radius 50%
          font-weight 700
          color: #ffffff
          background-color: red;
      .navs-item-home
        background-image:url(./assets/images/menu-icon/navs-item-home.png)
      .navs-item-menu
        background-image:url(./assets/images/menu-icon/navs-item-menu.png)
        &.active
          background-image:url(./assets/images/menu-icon/navs-item-menu-active.png)
      .navs-item-cart
        background-image:url(./assets/images/menu-icon/navs-item-cart.png)
        &.active
          background-image:url(./assets/images/menu-icon/navs-item-cart-active.png)
      .navs-item-mine
        background-image:url(./assets/images/menu-icon/navs-item-mine.png)

</style>

<style>
  .mod-navs .navs-bubble-num {
    background-color: #f40;
    color: #fff;
    line-height: 1.8rem;
    width: 1.8rem;
    text-align: center;
    font-size: 1rem;
    -webkit-transition: -webkit-transform .1s;
  }

  .mod-navs .navs-bubble {
    position: absolute;
    border-radius: 50%;
    left: 50%;
    top: .5rem;
    margin-left: 1rem;
  }
</style>
