import base from './base'; // 导入接口域名列表
import axios from '@/axios/request'; // 导入request中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const article = {
  //文章-----------------------------
  publish(params) {
    return axios.post(`${base.dev}/article/publish`, qs.stringify(params));
  },
  updateArticle(params) {
    return axios.post(`${base.dev}/article/updateArticle`, qs.stringify(params));
  },
  deleteArticle(params) {
    return axios.post(`${base.dev}/article/deleteArticle`, qs.stringify(params));
  },
  articleList(params) {
    return axios.post(`${base.dev}/article/articleList`, qs.stringify(params));
  },
  articleDel(params) {
    return axios.post(`${base.dev}/article/articleDel`, qs.stringify(params));
  },
  markdownImg(params) {
    return axios.post(`${base.dev}/article/markdownImg`, params)
  },
  //保存草稿
  articleDraft(params) {
    return axios.post(`${base.dev}/article/articleDraft`, qs.stringify(params));
  },
  //点赞
  giveLike(params) {
    return axios.post(`${base.dev}/article/giveLike`, qs.stringify(params));
  },
  //评论
  commentArticle(params) {
    return axios.post(`${base.dev}/article/comment`, qs.stringify(params));
  },
  //子评论
  subCommentArticle(params) {
    return axios.post(`${base.dev}/article/subComment`, qs.stringify(params));
  },
  //tag
  getTagList(params){
    return axios.post(`${base.dev}/tag/getTagList`, qs.stringify(params));
  }
}

export default article


// {
//   headers: {
//     'Content-Type': 'multipart/form-data'
//   }
// }