<template>
  <div class="been-list">
    <!-- 左侧菜单 -->
    <div class="left-menu">
      <ul>
        <li v-for="(menu, i) in categories" :key="menu.id" @click="selectMenu(i, menu.id)">
          <!-- new: menu.icon -->
          <span class="num-price" :class="{ new: !menu.icon, active: selectedIndex == i }">{{ menu.name }}</span>
        </li>
      </ul>
    </div>

    <!-- 右侧内容 -->
    <div class="con">
      <div class="right-con con-active">
        <!-- 顶部标题 -->
        <div class="product-filter">
          <ul class="filter-titles">
            <li class="filter-title">全部分类&nbsp;</li>
            <li class="filter-title">综合排序&nbsp;</li>
          </ul>
        </div>

        <!-- 列表 -->
        <ul>
          <li v-for="item in selectedProductions" :key="item.id">
            <div class="menu-img">
              <img :src="item.img" width="55" height="55">
            </div>
            <div class="menu-txt">
              <h4>{{ item.name }}</h4>
              <p class="activity" style="display: none;"></p>
              <p class="list1">{{ item.specifics }}</p>
              <p class="list2">
                <b>￥{{ item.price }}</b>
                <s v-if="item.price !== item.market_price">￥{{ item.market_price }}</s>

                <ProductOperate v-model="item.count" @selectGoods="selectGoods(item.id)"></ProductOperate>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ProductOperate from '../product-operate/ProdOperate'

export default {
  created () {
    this.getSideMenuList()
  },

  data () {
    return {
      categories: [],
      products: [],
      selectedProductions: [],
      selectedIndex: 0
    }
  },

  methods: {
    // 获取全部数据
    getSideMenuList () {
      this.$http
        .jsonp('http://localhost:3008/list', {
          call: 5
        })
        .then(res => {
          // console.log(res)
          const { categories, products } = res.data
          const id2Data = this.$store.getters.id2Data

          this.categories = categories
          this.products = products
          this.selectedProductions = products['103614'].map(item => {
            return {
              ...item,
              count: (id2Data[item.id] && id2Data[item.id].count) || 0
            }
          })
          // console.log(products.a106)
        })
    },

    // 切换左侧菜单
    selectMenu (index, id) {
      const id2Data = this.$store.getters.id2Data

      this.selectedIndex = index
      this.selectedProductions = this.products[id].map(item => {
        return {
          ...item,
          count: (id2Data[item.id] && id2Data[item.id].count) || 0
        }
      })
    },

    selectGoods (id) {
      const count = this.selectedProductions.find(item => item.id === id).count

      this.$store.commit('addCart', {
        count,
        id
      })
    }
  },

  components: {
    ProductOperate
  }
}
</script>

<style lang="stylus" scoped>
  .been-list
    display: flex
    position: absolute
    width: 100%
    top: 4.5rem
    bottom: 4.5rem
    background #ffffff
    .con
      flex 1
      position relative
      overflow-y:scroll

    .left-menu
      flex :0 0 80px
      width: 80px
      background: #F8F8F8
      overflow-y scroll
      li
        display table
        height 54px
        width: 80px
        line-height: 54px
        border-bottom 1px solid #e0e0e0
        text-align center
        .num-price
          display block
          background: right top no-repeat
          background-size: auto 70%
        .new
          background-image url(../../assets/images/new.jpg)

      .active
        border-left: 4px solid #ffd600;
        .num-price
          width 80px
          margin-left -4px

  .filter-titles
    position: fixed;
    z-index 999
    top: 4.5rem;
    left: 80px;
    right: 0;
    padding-top 8px;
    background-color: #fff;
    font-size: 1rem;
    color: #777;
    .filter-title
      position: relative;
      float: left;
      width: 50%;
      text-align: center;
</style>

<style>
.left-menu::-webkit-scrollbar {width: 0px;}
.main{overflow:hidden;}
.con .con-active {
  display: block;
}

.right-con>ul {
  margin-top: 43px;

}
.right-con li {
  position: relative;
  border-bottom: 1px solid #e7eaeb;
  border-top: 1px solid #fff;
  padding-bottom: 8px;
  margin-bottom: 2px;
}

.right-con li .menu-img {
  position: absolute;
  margin-left: 10px;
  top: 15px;
  border-radius: 3px;
  cursor: pointer;
}

.right-con li .menu-img img {
  height: 55px;
  width: 55px;
  vertical-align: middle;
  border: 0;
}

.right-con li .menu-txt {
  margin: 15px 15px 15px 75px;
}

.right-con li .menu-txt h4 {
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 8px;
  white-space: nowrap;

  text-overflow: ellipsis;
  overflow: hidden;
}
.right-con li .menu-txt p {
  font-style: normal;
  line-height: 20px;
  vertical-align: bottom;
}
.right-con li .menu-txt p.activity{
  border: 1px solid red;
  display: inline-block;
  color: red;
  font-size: 1rem;
  line-height: 1rem;
  padding: .2rem .2rem .1rem;
  margin-right: .3rem;
  border-radius: .4rem;
  vertical-align: .1rem;
}
.right-con li .menu-txt p.list1{
  color: #999;
}
.right-con li .menu-txt p.list2 b {
  color: #f00;
}
.right-con li .menu-txt p.list2 s{
  color: #999999;
}

</style>
