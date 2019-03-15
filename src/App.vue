<template>
  <div id="app">
    <head-nav class="headNav"></head-nav>
    <vue-scroll ref='vs' @handle-scroll="handleScroll" style="height: calc(100% - 61px);"> 
      <div class="layout">
        <router-view />
      </div>
    </vue-scroll>
    <div class="scrollTopBox" ref='scrollTopBox'>
      <i class="iconfont icon-shengjihuojian" @click='scrollTop'></i>
      <!-- <i class="iconfont icon-xiaohuojian" @click='scrollTop'></i> -->
    </div>
   <loading-box v-show='showLoading'></loading-box>
  </div>
</template>
<script>

  import {mapState} from 'vuex'
  import headNav from '@/components/headNav.vue'
  import loadingBox from '@/components/loading.vue'
  export default {
    name: "App",
    components:{
      headNav,
      loadingBox
    },
    computed: mapState(['showLoading']),
    data() {
      return {

      };
    },
    created() {
     
    },
    methods: {
      scrollTop(){
        this.$refs.vs.scrollTo(
            {x: 0,y: 0},
            500,
            'easeInQuart' );
          this.$refs.scrollTopBox.classList.add('trans-bottom')
      },
      handleScroll(vertical, horizontal, nativeEvent){
        if(vertical.process > 0.1){
          this.$refs.scrollTopBox.classList.add('opacityBox')
        }else if(vertical.process == 0){
          this.$refs.scrollTopBox.classList.remove('trans-bottom')
        }else{
          this.$refs.scrollTopBox.classList.remove('opacityBox')

        }
      },
    },
    mounted(){
      //this.$router.push({path:this.currentRouter})
    }
  };

</script>
<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #666;
    height: 100%;
    .headNav{
      width: 100%;
    }
  }
 .layout {
    width: 1200px;
    height: calc(100vh - 61px);
    margin: 0 auto;
  }
  .scrollTopBox{
    position: fixed;
    bottom: 30px;
    right: 30px;
    transition: opacity 0.5s; 
    opacity: 0;
    .iconfont{
      cursor: pointer;
      font-size: 30px;
      color: #f7f8fa;
    }
  }
  .opacityBox{
    opacity: 1;
  }
  .trans-bottom{
    transition: bottom 0.5s;
    bottom: 80%;
  }



</style>
