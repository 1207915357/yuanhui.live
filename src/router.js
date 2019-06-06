import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)


const router = new Router({
  mode: 'history', // hash
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
      },
       meta: {
         role: ['admin']
       } //权限页面
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
       },
       meta:{role:['admin']} //权限页面
     },
    {
      path: '/articleDel/:id',
      name: 'articleDel',
      component: () => import('@/views/articleDel.vue'),
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/401',
      name: '401',
      component: () => import('@/views/other/401.vue'),
      meta: {
        title: '无权限'
      },
      hidden: true 
    },
     {
       path: '*',
       name: '404',
       component: () => import('@/views/other/404.vue'),
       meta: {
         title: 'not found!!!'
       },
       hidden: true // 不在菜单显示
     }
   
  ]
})

//需要权限路由
const asyncRouterMap = [
  //  {
  //    path: '/manage/publish',
  //    name: 'publish',
  //    component: () => import('@/views/manage/publish.vue'),
  //     meta: {
  //      title: '文章发布',
  //      role: ['0'] //权限页面
  //    },
  //  },

  //  {
  //    path:'*',
  //    name:'404',
  //    component:()=> import('@/views/404.vue'),
  //    meta: {
  //      title: 'not found'
  //    },
  //     hidden: true  // ?
  //  }
]




/* router.beforeEach((to, from, next) => {
  if (store.getters.token) { // 判断是否有token
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取info
          const roles = res.data.role;
          store.dispatch('GenerateRoutes', {
            roles
          }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({
              ...to,
              replace: true
            }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(err => {
          console.log(err);
        });
      } else {
        next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
  } else {
      next('/'); // 否则全部重定向到登录页
  }
}); */

// 路由变化时
router.beforeEach((to, from, next) => {
  if (document.title !== to.meta.title) {
    document.title = to.meta.title;
  }

  if (store.state.token) {
    if(store.state.userType == 0){
      // router.addRoutes(
      //   asyncRouterMap
      // )
    }
  }
  next()
})

export default router
