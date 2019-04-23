<template>
  <div id="app">
    <head-nav class="headNav"></head-nav>
    <vue-scroll :ops='homeScroll' ref='vs' @handle-scroll="handleScroll" style="height: calc(100% - 61px);"> 
      <div class="layout">
        <router-view />
      </div>
    </vue-scroll>
    <div class="scrollTopBox" ref='scrollTopBox'>
      <i class="iconfont icon-shengjihuojian" @click='scrollToTop'></i>
      <!-- <i class="iconfont icon-xiaohuojian" @click='scrollTop'></i> -->
    </div>
   <loading-box v-show='showLoading'></loading-box>
  </div>
</template>
<script>

  import {mapState,mapMutations} from 'vuex'
  import headNav from '@/components/headNav.vue'
  import loadingBox from '@/components/loading.vue'
  export default {
    name: "#app",
    components:{
      headNav,
      loadingBox
    },
    computed: mapState(['showLoading']),
    data() {
      return {
        homeScroll: {
          bar: {
            keepShow: true,
            background: '#545c64',
          }
        }, 
      };
    },
    created() {
     
    },
    methods: {
      ...mapMutations(['handleBarYProcess','getVsElement']),

      //回到顶部
      scrollToTop(){
        console.log()
        this.$refs.vs.scrollTo(
            {x: 0,y: 0},
            500,
            'easeInQuart' );
          this.$refs.scrollTopBox.classList.add('trans-bottom')
      },
      //
      handleScroll(vertical, horizontal, nativeEvent){
        this.handleBarYProcess(vertical.process)
        // console.log(this.$store.state.barY_process)
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
      this.getVsElement(this.$refs.vs)
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
    width: 1300px;
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
      color: #63dbde;
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
