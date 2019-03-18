import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId:"",
    userName:"",
    showLoading:false,
    barY_process: 0,
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
    //y轴滚动条进度
    handleBarYProcess(state, val) {
      state.barY_process = val
    },
  },
  actions: {}
})
