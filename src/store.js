import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId:"",
    userName:"",
    showLoading:false,
  },
  getters:{},
  mutations: {
    handleUserId(state){
      state.userId = Vue.prototype.$_getCookie('userId')
    },
    handleUserName(state) {
      state.userName = Vue.prototype.$_getCookie('userName')
    },
    //控制全局loading动画
    handleLoading(state,val) {
      state.showLoading = val
    },
  },
  actions: {}
})
