import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/home.vue'),
       meta: {
         title: '看不见的城'
       }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about.vue'),
       meta: {
         title: '关于作者'
       }
    },
    {
      path: '/life',
      name: 'life',
      component: () => import('@/views/life.vue'),
       meta: {
        title: '生活'
      }
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('@/views/archive.vue'),
       meta: {
        title: '归档'
      }
    },
    {
      path: '/manage/publish',
      name: 'publish',
      component: () => import('@/views/manage/publish.vue'),
       meta: {
        title: '文章发布'
      }
    },
    {
      path: '/manage/video',
      name: 'video',
      component: () => import('@/views/manage/video.vue'),
       meta: {
        title: '视频发布'
      }
    },
     {
       path: '/manage/articleManage',
       name: 'articleManage',
       component: () => import('@/views/manage/articleManage.vue'),
       meta: {
         title: '文章管理'
       }
     },
    {
      path: '/articleDel/:id',
      name: 'articleDel',
      component: () => import('@/views/articleDel.vue'),
      meta: {
        title: '文章详情'
      }
    },
   
  ]
})


// 路由变化时
router.beforeEach((to, from, next) => {
  if (document.title !== to.meta.title) {
    document.title = to.meta.title;
  }
  next()
})



export default router