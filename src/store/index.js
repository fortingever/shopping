import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    beeCart: JSON.parse(localStorage.getItem('beeCart')) || []
    // beeCart: [
    //   {
    //     id: '2435',
    //     count: 1,
    //     isSelected: true
    //   },
    //   {
    //     id: '6834',
    //     count: 1,
    //     isSelected: true
    //   },
    //   {
    //     id: '9045',
    //     count: 1,
    //     isSelected: true
    //   }
    // ]
  },
  mutations: {
    addCart (state, goods) {
      const curGoods = state.beeCart.find(item => item.id === goods.id)
      if (!curGoods) {
        state.beeCart.push({ ...goods, isSelected: true })
      } else {
        curGoods.count = goods.count
      }
      localStorage.setItem('beeCart', JSON.stringify(state.beeCart))
    },
    updateCart (state, curList) {
      state.beeCart = curList.map(item => ({ ...item }))

      localStorage.setItem('beeCart', JSON.stringify(state.beeCart))
    }
  },
  getters: {
    ids (state) {
      return state.beeCart.map(item => item.id).join(',')
    },

    total (state) {
      return state.beeCart.reduce((count, item) => {
        count += item.count
        return count
      }, 0)
    },

    id2Data (state) {
      return state.beeCart.reduce((data, item) => {
        data[item.id] = {
          count: item.count,
          isSelected: item.isSelected
        }

        return data
      }, {})
    },

    isSelectAll (state) {
      return state.beeCart.every(item => item.isSelected)
    }
  }
})
