import Vue from 'vue'
import Router from 'vue-router'
import BeenList from '@/components/beenlist/List.vue'
import Cart from '@/components/cart/Cart.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/list' },
    { path: '/list', component: BeenList },
    { path: '/cart', component: Cart }
  ],

  linkActiveClass: 'active'
})
