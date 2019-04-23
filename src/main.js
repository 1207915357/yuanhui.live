import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons/index.js' //SvgIcon
import '@/assets/css/common.css' //公共css
import '@/assets/js/fun.js' //公共方法js
// import request from '@/assets/js/request.js'
// api
import api from './api' // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上

//socket.io  df
// import SocketIO from 'socket.io-client';
// import VueSocketIO from 'vue-socket.io'
// const options = {path: ''}; //Options object to pass into SocketIO
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO('http://localhost:3000', options), //options object is Optional
//   store
// }));

// vuescroll
import vuescroll from 'vuescroll';
Vue.use(vuescroll, 
  {
    // 在这里设置全局默认配置
  });

// import 'normalize.css'
// Vue.use(request)
Vue.use(ElementUI)
Vue.config.productionTip = false


const app = new Vue({
  router,
  store,
  data:{
    Bus: new Vue()
  },
  
  render: h => h(App)
}).$mount('#app')

// window.mountApp = () => {
//   app.$mount('#app');
// };

// if (process.env.NODE_ENV === 'production') {
//   if (window.STYLE_READY) {
//     window.mountApp();
//   }
// } else {
//   window.mountApp();
// }