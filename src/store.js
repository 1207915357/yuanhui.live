import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    unreadNum: 0,
    commentNotice: [],
    userId:"",
    userName:"",
    userType: 2, //用户type  0为admin 1普通用户 2未登录
    token: localStorage.getItem('token'),
    showLoading:false,
    barY_process: 0,
    vsElement:''
  },
  getters:{},
  mutations: {
    set_loginOut(state){
      state.userId = ""
      state.userName = ""
      state.userType = 2
    },
    handleUserId(state,val){
      // state.userId = Vue.prototype.$_getCookie('userId')
      state.userId = val
    },
    handleUserName(state,val) {
      // state.userName = Vue.prototype.$_getCookie('userName')
      state.userName = val
    },
    handleUserType(state,val) {
      state.userType = val
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
    },
    setUnreadNum(state, val) {
      state.unreadNum = val
    },
    setCommentNotice(state, val) {
      state.commentNotice = val
    },
  },
  actions: {
    //  //获取用户信息
    //  get_userInfo() {
    //    return new Promise((resolve,reject)=>{
    //       api.user.getUserInfo()
    //        .then((data) => {        
    //         resolve(data)
    //       }).catch((err) => {
    //         reject(err)
    //       })
    //    })
    //  },
  }
})
