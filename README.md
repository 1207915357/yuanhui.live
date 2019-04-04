## vue+node+mongodb 搭建博客(2019-1-22)

> ![123](http://pn5j4crh2.bkt.clouddn.com/12890819-b80e851e00eb58b6.jpg)
>
> 计划实现功能（五大模块）
>
> 一. 博客界面（首页）
>
> 1.  文章内容展示，分类导航，作者头像简单介绍
> 2.  首屏动画（rainbow）
>
> 二. 生活（分享）
>
> 1. 有趣的事
> 2. 尤克里里音乐
> 3. 篮球视频
>
> 三. 留言（相互交流学习）
>
> 四. 关于（作者历程详细介绍）
>
> 五. 管理后台 react
>
> 1. 文章发布 markdown
> 2. 评论审核
> 3. 账号管理
> 4. 参考掘金
> 5. 我的主页
>
> 六. 功能
>
> 1. 文章顶置，点击回到顶部
> 2. 加载动画
> 3. logo
> 4. 流量统计，字数统计，文章阅读便捷功能
> 5. 登陆注册
> 6. 文章搜索
> 7. pwa应用 [lavas](https://lavas.baidu.com/guide)
> 8. 双向通信 socket.io
> 9. ,移动端适配,rem   px2rem
> 10. 点赞，评论
> 11. 分类与归档
> 12. egg.js
> 13. ​





### 一、 前端构建 (vue+element)

#### 1.初始化vue项目

- 安装环境  `node` `webpack` `vue-cli` 

- 构建项目 `vue init webpack yourName`  

  或用 vue-cli3创建更方便 `vue create yourName`(需要安装最新的vue-cli3 `npm i @vue/cli -g`)

  可以参考 [使用Vue-cli 3.0搭建Vue项目](https://www.jianshu.com/p/6307c568832d)  [vue-cli3 从搭建到优化](https://juejin.im/post/5c3c544c6fb9a049d37f5903)  [Vue CLI 3 官网](https://cli.vuejs.org/zh/guide/) 

##### 1.1 vue中使用iconfont中的svg图标   

- 根据 [vue-cli3 从搭建到优化](https://juejin.im/post/5c3c544c6fb9a049d37f5903) 配置
- 从[iconfont](https://www.iconfont.cn/) 下载的svg图片它会自带一个fill属性,外部的css改变颜色不起作用,需要设置一个全局的css样式 `path { fill: inherit !important } ` 或者使用 svgo 格式化下 !

##### 1.2 axios 的封装

- [axios文档](https://www.npmjs.com/package/axios) 
- 参考文章
  - [vue中Axios的封装和API接口的管理](https://juejin.im/post/5b55c118f265da0f6f1aa354)
  - [Vue二次封装axios为插件使用](https://juejin.im/post/5ae432aaf265da0b9c1063c8)

##### 1.3 实现登录注册

- cookie的使用 
  - 参考文章 [Vue.js写一个SPA登录页面的过程](https://www.jianshu.com/p/eff145fb815b)  [Cookie 在前端中的实践](https://segmentfault.com/a/1190000007243675)

##### 1.4 引入markdown

- 插件  [mavonEditor](https://md.zhystar.com)




#### 2. 前端路由管理

- 新建api文件夹管理路由
  -  -api
    - -index.js  //主文件 api接口的统一出口
    - -base.js //基础域名配置
    - -user.js  // 用户模块路由
    - -article.js  //文章模块路由

```javascript
//index.js  
//api接口的统一出口

//用户模块
import user from '@/api/user';
// 文章模块接口
import article from '@/api/article';
// 其他模块的接口……

// 导出接口
export default {    
    user,
    article,
    // ……
}

-----------------------------------------------
//base.js
/**
 * 接口域名的管理
 */
const base = {    
    dev: 'http://127.0.0.1:3000',    
    product: ''
}

export default base;


--------------------------------------------
//user.js
  
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
```

- main.js中导入和挂在api

```javascript
import api from './api' // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上
```

- 使用

```javascript
this.$api.user.login()
  .then((data)=>{
  ...
})
```



***



### 二、后台搭建(node+koa+mongodb)

#### 1.初始化node项目

- `npm init`
- `npm koa -S ` [koa中文文档](https://demopark.github.io/koa-docs-Zh-CN/)
- `npm i nodemon -S`  热重启, 使用 nodemon ./app 命令启动项目  [nodemon](https://www.npmjs.com/package/nodemon)

##### 1.1安装一系列依赖 

- `npm i koa2-cors` (解决跨域)  [koa2-cors](https://www.npmjs.com/package/koa2-cors)
- `npm i koa-bodyparser` (解析接收的参数)  [koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser)
- `npm i koa-static` (开放静态资源) [koa-static](https://www.npmjs.com/package/koa-static)
- `npm i mongoose` (操作MongoDB)  [mongoose](https://www.npmjs.com/package/mongoose)
- `npm i uuid` (生成唯一id插入数据库) [uuid](https://www.npmjs.com/package/uuid)

##### 1.2 注册登录接口

- 使用nodejs自带的` crypto`模块加密 

  ```javascript
  const crypto = require('crypto')
  const cryptoPwd = function(password,salt){
      const saltPassword = password + ':' + salt
      const md5 = crypto.createHash('md5')
      const result = md5.update(saltPassword).digest('hex')
      return result;
  }
  ```

- [了解token的使用,密码加密](https://juejin.im/entry/58c3bfac570c35006d5b23dc)  (本项目中选择了简单的验证cookie)

  - [Token 认证的来龙去脉](https://segmentfault.com/a/1190000013010835)




#### 2.路由接口

> 路由模块管理

![router][router]

- api文件夹存放接口路由

  ```javascript
  const Router = require('koa-router');
  const router = new Router();
  const article_controller = require('../controllers/article_controller');

  router.post('/article/publish', article_controller.publish);

  module.exports = router;
  ```

- controllers文件夹存放业务逻辑

  ```javascript
  const config = require('../config');
  const Article_col = require('../model/article');
  const uuidV1 = require('uuid/v1')

  //发布文章
  const publish = async (ctx, next) => {
      const req = ctx.request.body
      console.log(req,'article')
      const id = uuidV1();
      const newArticle = await Article_col.create({
          id,
          value: req.value,
          title: req.title,
          pictureUrl: req.pictureUrl
      })

      if (newArticle) {
          ctx.body = {
              code: 1,
              msg: 'success!',
              data: {}
          };
      } else {
          ctx.body = {
              code: 0,
              msg: 'failed!'
          };
      }
  }

  module.exports = {
      publish,
  }
  ```

- model文件夹存放schema表

  ```javascript
  const mongoose = require('mongoose')
  const Schema = mongoose.Schema

  const articleSchema = new Schema({
      id:{
      	type: String,
      	required: true
      },
      value: {
          type: String,
          required: true
      },
      title: {
          type: String,
          required: true
      },
      pictureUrl: {
          type: String
      },
      created_time: {
          type: Date,
          default: Date.now
      },
      eye:{
          type: Number,
          default: 0
      },
      like: {
          type: Number,
          default: 0
      },
      comments: {
          type: Number,
          default: 0
      },

  })

  module.exports = mongoose.model('Article', articleSchema)
  ```

- 同时在app.js中导入api中的路由，再使用路由

  ```javascript
  const Koa = require('koa')
  const cors = require('koa2-cors');
  const bodyParser = require('koa-bodyparser');
  const koaStatic = require('koa-static');
  const mongoose = require('mongoose');
  const config = require('./config.js');
  const user_router = require('./api/user-router.js');
  const article_router = require('./api/article-router.js');
  const app = new Koa();

  mongoose.connect(config.db, {useNewUrlParser:true}, (err) => {
      if (err) {
          console.error('Failed to connect to database');
      } else {
          console.log('Connecting database successfully');
      }
  });

    app

    //跨域
    .use(cors())
    //开放静态资源
    .use(koaStatic(__dirname + '/public'))
    //请求参数格式化
    .use(bodyParser())
    //路由
    .use(user_router.routes()).use(user_router.allowedMethods())
    .use(article_router.routes()).use(article_router.allowedMethods())
    //启动服务监听端口
    .listen(config.port,function(){
        console.log('server is running ')
    });

  ```




##### 2.1 登陆注册

- 普通用户登陆权限（留言，评论，点赞，）

- 管理员权限（发布）

- 超级管理员（对文章评论进行管理，删除）


  ##### 2.2 文章

| 名称      | 接口                   | 参数                             | 返回值                                      |
| :------ | :------------------- | ------------------------------ | ---------------------------------------- |
| 文章发布    | /article/publish     | value(html源码),title,pictureUrl | null                                     |
| 文章保存到草稿 | /article/save        | value(md源码),title,pictureUrl   | null                                     |
| 草稿列表    | /article/draftList   | null                           | data([{title,mdcode}...])                |
| 查看草稿    | /article/lookDraft   | id                             | data(md源码)                               |
| 文章列表    | /article/articleList | userId                         | data([{title,htmlcode,puctureUrl,eye, like,comments,time}...]) |
| 文章编辑    | /aritcle/edit        | id                             | null                                     |



##### 2.3 图片的上传 

> [【参考】](https://segmentfault.com/q/1010000012000062)

实现思路

 - 前端上传图片请求服务器，我用的时element里的上传组件 

   ```html
   <template>
     <div class="publish">
       
       <el-upload
                  class="avatar-uploader"
                  :action="`${baseUrl}/article/uploadCover`"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
         <img v-if="imageUrl" :src="imageUrl" class="avatar">
         <i v-else class="el-icon-plus avatar-uploader-icon"></i>
       </el-upload>
       
     </div>
   </template>
   <script>
     export default {
       name:'publish',
       data () {
         return {
           baseUrl:base.dev, //服务器地址
           imageUrl: '',
           pictureUrl: '',
         };
       },
       methods: {

         //文章发布
         publish(){
           this.$api.article.publish({
                 value:this.mdCode,
                 title:this.title,
                 pictureUrl:this.pictureUrl,  
               }).then((data)=>{
                 this.$router.push({path:'/'})
               })
          },
          //图片上传
         handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);  
            this.pictureUrl = res.pictureUrl;  //返回的图片路径
         },
         beforeAvatarUpload(file) {
           const isLt2M = file.size / 1024 / 1024 < 1;           
           if (!isLt2M) {
             this.$message.error('上传头像图片大小不能超过 1MB!');
           }
           return  isLt2M;
         }
       },
   </script>

   ```



 - 后端使用koa-multer把图片存储在public下的一个articleCover文件夹目录

   - article-router.js 配置multer

   ```js
   const Router = require('koa-router');
   const router = new Router();
   const article_controller = require('../controllers/article_controller');

   const multer = require('koa-multer')
   const path = require('path')
   var storage = multer.diskStorage({
       //文件保存路径
       destination: function (req, file, cb) {
           cb(null, 'public/articleCover/') //path.resolve('public/phoneManageSystem')
       },
       //修改文件名称
       filename: function (req, file, cb) {
           var fileFormat = (file.originalname).split("."); //以点分割成数组，数组的最后一项就是后缀名
           cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
       }

   })
   //加载配置
   var upload = multer({
       storage: storage,
       limits: {
          fileSize: 1024 * 1024 / 2 // 限制512KB
       }
   });

   router.post('/article/uploadCover', upload.single('file'), article_controller.uploadCover);
   ```


   module.exports = router;
   ```

   - aritcle_controller.js 接口

   ```javascript
   //图片上传
   const uploadCover = async(ctx, next)=>{
        let pictureUrl = `${config.severUrl}:${config.port}/articleCover/${ctx.req.file.filename}`
        ctx.body = {
           filename: ctx.req.file.filename, //返回文件名
           pictureUrl: pictureUrl  //前端直接调用的地址
        }
   }
   ```

 - 必须要开放public这个文件夹作为静态资源

   ```javascript
   app.use(koaStatic(__dirname + '/public'))
   ```

 - 前端调用图片 



markdown中图片的上传

- https://blog.csdn.net/mnhn456/article/details/81110764

***

### 三、知识拓展 记录问题

- less:hover .other{}不起作用   .less{ ::before}为什么选中了全部子元素
- vuejs 失去焦点，点击全局隐藏某些浮动元素 https://segmentfault.com/q/1010000007444595


- [markdown插入图片的几种方法](https://www.zhihu.com/question/21065229)

- 时间格式化 [momentjs](http://momentjs.com/docs/#/use-it/node-js/)

  [vue总结](https://juejin.im/post/5b174de8f265da6e410e0b4e)  [vue总结2](https://juejin.im/post/59fa9257f265da43062a1b0e)  

- less深度选择器  .layout **/deep/** .content     css深度选择 **>>>**

- 路由懒加载  


  ```javascript
  {
    path: '/',
    name: 'home',
    component: resolve => require(['@/view/home/home.vue'], resolve)
  }
  ```



- 开启gzip

- hiper 性能分析工具

- 骨架屏

- v-model 实现父子组件通信，双向绑定数据

- 页面刷新时，url导航地址栏的路由和当前页面显示的不一致（注意区分route:对象和router:方法）

- 解决 vue刷新路由跳到首页的问题

  ```javascript
  // 1.根组件中通过watch监听路由地址的改变
  // 2.使用钩子函数，改变路由

   export default {
      name: 'App',
      data(){
        return {
          msg:'App.vue',
          currentRouter:'/'
        }
      },
      methods:{
       
      },
      watch:{
        '$route':function(to,from){
            this.currentRouter=to.path;
        }
      },
      beforeMount(){
          this.currentRouter=this.$route.path;
      }
    }
  ```

- mongoose findOneAndUpdate 操作 规范

  ```javascript
   var user = await User_col.findOne({userId})
   //  likeArticle = user.likeArticle.push(articleId)   //这里不能直接push           
    likeArticle = user.likeArticle
    likeArticle.push(articleId)
    await User_col.updateOne({
        userId
      }, {
        likeArticle
      })
  ```


- 参考博客：http://120.79.10.11:8001/    http://biaochenxuying.cn/

- 闭包应用 

  ```javascript
  function sendRequest(urls, max, callback) {
    const len = urls.length;
    let idx = 0;
    let counter = 0;

    function _request() {
      // 有请求，有通道
      while (idx < len && max > 0) {
        max--; // 占用通道
        fetch(urls[idx++]).finally(() => {
          max++; // 释放通道
          counter++;
          if (counter === len) {
            return callback();
          } else {
            _request();
          }
        });
      }
    }
    _request();
  }
  ```




#### 3.1评论功能

1. 前端界面实现

2. mongdb表的设计

3. 时间格式化 moment  

4. 头像插件 [vue-avatar](https://segmentfault.com/a/1190000010226370) 

5. 关联github 获取用户信息头像  [参考](http://biaochenxuying.cn/articleDetail?article_id=5c7bd34e42b55e2ecc90976d)  未完成

6. 支持表情包功能  [emoji-mart-vue](https://github.com/jm-david/emoji-mart-vue)  

7. bug :点击其他地方不能关闭评论框



#### 3.2 文章分类，归档，标签功能 

#### 3.3 换皮肤，主题 （暂未实现） 

#### 3.4  vuex全局加载动画

- 动画组件 引入 codepen 里的动画

#### 3.5  词云标签 

- 详见文章 [vue中使用d3-cloud词云]()

#### 3.6 评论通知

- 用户评论文章,通知作者; 
- 回复用户通知被回复用户;
- 用户第一次登陆默认发送一个欢迎的通知
- vue 中使用 vue-socket  stock.io
- 流程设计：
  1. 用户评论文章，存储用户ID，文章作者ID，文章ID，用户评论到一个表（我直接存储到了用户信息的表里commentNotice 数组里）同时把记录通知的值加一，用户登录自动请求获取用户信息接口，如果用户信息里的commentNotice 数组里有值表示有消息通知并显示这些列表。用户查看通知把记录通知的值再赋值为0；
  2. ​



### 四、日志

#### 4.1 项目完成进度 

- 2019
- 2.27 完成了文章点赞 git上传
- 2.28 样式优化，滚动条 [Vuescroll.js](https://vuescrolljs.yvescoding.org/zh/)
- 3.1 评论模块 
- 3.6 完成评论功能  
- 3.11 分类,归档,标签功能 
- 3.13 完成归档标签分类功能
- 3.14 添加返回顶部功能 | vuex全局加载Loading动画.
- 3.15 优化loading动画
- 3.18 文章列表接口分页处理 | 滚动加载更多 
- 3.19 文章搜索, siderBar
- 3.25 分类标签词云d3  async的使用
- 3.26 消息通知系统设计
- 4.01 - 4.03 完成评论消息通知功能
- 4.04 优化
- ​
-  最热文章 ||   搜索文章分页处理
- 后台管理搭建

#### 4.2 遗留bug

- 登陆或注销状态 cookie不能及时刷新
- 定位 使用vuescroll
- bug :点击其他地方不能关闭评论框
- 归档：时间划线问题   github 时间选择菜单
- 菜单导航不根据 路由动态变化   跳转时去掉导航激活状态

***

（图片存储base64）

[router]:data:image/png;base64,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