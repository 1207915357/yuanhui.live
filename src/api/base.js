/**
 * 接口域名的管理
 */
console.log(process.env, 'env')

const base = {    
    dev: 'http://127.0.0.1:3000',    
    pro: 'http://yuanhui.live:3000'
    // pro: 'http://106.14.174.233:3000'
}
let baseUrl = ""

switch (process.env.NODE_ENV){
    case 'development':
        baseUrl = base.dev
        break;
    case 'production':
        baseUrl = base.pro
        break;
    default:
        baseUrl = ""
}

export default baseUrl;
//统一在 src/axios/request.js 中设置默认 baseURL