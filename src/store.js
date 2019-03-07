import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId:"",
    userName:""
  },
  mutations: {
    handleUserId(state){
      state.userId = Vue.prototype.$_getCookie('userId')
    },
    handleUserName(state) {
      state.userName = Vue.prototype.$_getCookie('userName')
    },
  },
  actions: {

  }
})
