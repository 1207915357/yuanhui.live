import base from './base'; // 导入接口域名列表
import axios from '@/axios/request'; // 导入request中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const user = {
    login (params) {        
        return axios.post(`${base.dev}/login`,qs.stringify(params));    
    },
    register (params) {        
        return axios.post(`${base.dev}/register`,qs.stringify(params));    
    }
}

export default user