import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId:""
  },
  mutations: {
    handleUserId(state){
      state.userId = Vue.prototype.$_getCookie('userId')
    }
  },
  actions: {

  }
})
