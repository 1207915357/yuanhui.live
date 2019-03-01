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
import api from './api' // 导入api接口
import vuescroll from 'vuescroll';

Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.use(vuescroll, {
  ops: {
    bar: {
      keepShow: true,
      background: '#545c64',
    }
  }, // 在这里设置全局默认配置
});

// import 'normalize.css'
// Vue.use(request)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  data:{
    Bus: new Vue()
  },
  render: h => h(App)
}).$mount('#app')
