import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId:"",
    userName:"",
    token: localStorage.getItem('token'),
    showLoading:false,
    barY_process: 0,
    vsElement:''
  },
  getters:{},
  mutations: {
    handleUserId(state,val){
      // state.userId = Vue.prototype.$_getCookie('userId')
      state.userId = val
    },
    handleUserName(state,val) {
      // state.userName = Vue.prototype.$_getCookie('userName')
      state.userName = val

    },
    //控制全局loading动画
    handleLoading(state,val) {
      state.showLoading = val
    },
    //y轴滚动条进度
    handleBarYProcess(state, val) {
      state.barY_process = val
    },
    getVsElement(state, val) {
      state.vsElement = val
    },
    setToken(state, val) {
      state.token = val
    }
  },
  actions: {}
})
