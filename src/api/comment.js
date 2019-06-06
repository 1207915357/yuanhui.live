import base from './base'; // 导入接口域名列表
import axios from '@/axios/request'; // 导入request中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const comment = {
   //获取评论
   getCommentList(params) {
     return axios.post(`${base}/comment/getCommentList`, qs.stringify(params));
   },
  //评论
  commentArticle(params) {
    return axios.post(`${base}/comment/comment`, qs.stringify(params));
  },
  //子评论
  subCommentArticle(params) {
    return axios.post(`${base}/comment/subComment`, qs.stringify(params));
  },


}

export default comment
