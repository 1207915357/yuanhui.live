<template>
  <div id="app">
    <head-nav class="headNav"></head-nav>
    <div class="layout">
      <router-view />
    </div>
  </div>
</template>
<script>
  import headNav from '@/components/headNav.vue'
  export default {
    name: "App",
    components:{
      headNav
    },
    data() {
      return {
      };
    },
    
    methods: {
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
      position: fixed;
      top: 0;
      z-index: 9999;
    }
  }
 .layout {
    padding-top: 61px;
    width: 1200px;
    height: 100% ;
    margin: 0 auto;
  }

</style>
