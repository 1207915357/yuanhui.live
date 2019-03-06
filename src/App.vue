<template>
  <div id="app">
    <head-nav class="headNav"></head-nav>
    <vue-scroll style="height: calc(100% - 61px);"> 
      <div class="layout">
        <router-view />
      </div>
    </vue-scroll>
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
    }
  }
 .layout {
    width: 1200px;
    height: calc(100vh - 61px);
    margin: 0 auto;
  }

</style>
