import axios from 'axios'; // 引入axios
import store from '@/store';
import {Message} from 'element-ui' 


/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status,msg) => {
  // 失败状态码判断
  switch (status) {
      case 400:
        Message.info('缺少必要参数!');
        break;
      // 401: 未登录状态，跳转登录页
      case 401:
          // toLogin();
          Message.info('请登录');
          break;
      // 403 token过期
      // 清除token并跳转登录页
      case 403:
          Message.info('登录过期，请重新登录!');
          setTimeout(() => {
            localStorage.removeItem('token');
            store.commit('setToken', null);
          }, 1000);
          break;
      // 404请求不存在
      case 404:
          Message.info('请求的资源不存在!'); 
          break;
      case 500:
        Message.info('服务器错误!');
        break;
      default:
          console.log(msg);
      }}


// 创建axios实例
var instance = axios.create({timeout: 1000 * 12});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// instance.defaults.withCredentials = true;

/** 
 * 请求拦截器 
 */ 
instance.interceptors.request.use(    
  config => {        
      // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
      // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
      // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
      // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。        
      const token = store.state.token;  
      config.headers.Authorization = token
    //   config.headers['X-Token'] = token
      return config;    
  },    
  error => Promise.reject(error))

  
// 响应拦截器
instance.interceptors.response.use(    
  // 请求成功
  res => res.status === 200? Promise.resolve(res.data) : Promise.reject(res),    
  // 请求失败
  error => {
      const { response } = error;
      console.log(response,'res')
      if (response) {
          // 请求已发出，但是不在2xx的范围 
          errorHandle(response.status, response.data.msg);
          return Promise.reject(response);
      } else {
          // 处理断网的情况
          // eg:请求超时或断网时，更新state的network状态
          // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
          // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
        //   store.commit('changeNetwork', false);
        console.log('未知错误!')
      }
  });

export default instance;

