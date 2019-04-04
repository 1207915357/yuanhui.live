<template>
    <div id="headNav">
      <div class="navContent">
        <!-- <div class="logo">看不见的城</div> -->
        <el-menu :default-active="currentRouter" class="el-menu-demo" :router="true" mode="horizontal"
          menu-trigger="hover" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="/">
            <i class="iconfont icon-shouye1 myicon"></i>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/archive">
            <i class="iconfont icon-liuyan icon-guidang myicon"></i>
            <span>归档</span>
          </el-menu-item>
          <el-menu-item index="/life">
            <i class="iconfont icon-airudiantubiaohuizhi-zhuanqu_tiyushijie myicon"></i>
            <span>生活</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <i class="iconfont icon-guanyuwomen myicon"></i>
            <span>关于</span>
          </el-menu-item>
          <el-submenu index="/manage">
            <template slot="title">
              <i class="iconfont icon-guanli myicon" style="font-size:16px"></i>
              <span>管理</span>
            </template>
            <el-menu-item index="/manage/publish"><span class="iconfont icon-wenzhang myicon"></span><span>发布博客</span></el-menu-item>
            <el-menu-item index="/manage/video"><span class="iconfont icon-shipin-m myicon"></span><span>发布视频</span></el-menu-item>
            <el-menu-item index="/manage/articleManage"><span class="iconfont icon-caogaoxiang myicon"></span><span>文章管理</span></el-menu-item>
          </el-submenu>
        </el-menu> 
        <div class="headRight">
          <!-- 通知 -->
          <notice class="noticeComponent" v-if="userId"></notice>
          <!-- 登录 -->
          <login class="loginComponent"></login>
        </div>
      </div>
    </div>


</template>
<script>
  import login from '@/components/login.vue'
  import notice from '@/components/Notice.vue'
  import {mapState} from 'vuex'
  export default {
    name: "headNav",
    components:{
      login,
      notice,
    },
    data() {
      return {
        currentRouter: window.location.pathname,
      };
    },
    computed:{
      ...mapState(['userId'])
    },
    //  watch:{
    //   '$route':function(nowR,oldR){
    //      this.currentRouter=nowR.path;
    //     //  console.log(this.currentRouter,'this')
    //   }
    // },
    methods: {
      
    },
    mounted(){

    }
  };

</script>
<style lang="less">
  #headNav {
    height: 61px;
    background-color: #545c64;
    // border-bottom: solid 1px #e6e6e6;
    .navContent{
      position: relative;
      width: 1200px;
      margin: 0 auto;
      .logo{
        position: absolute;
        top: 10px;
        left: 20px;
        z-index: 2;
      }
       .headRight {
        position: absolute;
        right: 0px;
        top: 14px;
        display: flex;
        .noticeComponent{
          margin: 8px 20px 0 0;
        }
      }
    }
    .el-menu-demo {
      padding-left: 200px;
    }
    .el-menu-item.is-active .myicon{
    color: #ffd04b;
    }
    .myicon {
        margin-right: 10px;
        font-size: 20px;
        color: #eee;
    }
  }
  
</style>
