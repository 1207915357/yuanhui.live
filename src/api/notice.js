// 通知消息模块api
import base from './base'; // 导入接口域名列表
import axios from '@/axios/request'; // 导入request中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const notice = {
    publishNotice(params) {
        return axios.post(`${base}/notice/publishNotice`,qs.stringify(params));
    },
    noticeAllUser(params) {
        return axios.post(`${base}/notice/noticeAllUser`, qs.stringify(params));
    },
    getNotice(params) {
        return axios.post(`${base}/notice/getNotice`, qs.stringify(params));
    },
    readedNotice(params) {
        return axios.post(`${base}/notice/readedNotice`, qs.stringify(params));
    },
    clearNotice(params) {
        return axios.post(`${base}/notice/clearNotice`, qs.stringify(params));
    },
}

export default notice