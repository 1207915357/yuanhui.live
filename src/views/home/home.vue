<template>
  <div class="home">
    <div class="authorInfo">
      <siderBar></siderBar>
    </div>
    <div class="articleBox" >
      <articleBlog v-for="(item,index) in articleList" 
                  :key="index" 
                  :article="item"
                  @click.native='turnTo(item.id)'>
      </articleBlog>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import articleBlog from "@/components/articleBlog.vue";
  import siderBar from "@/components/siderBar.vue";

  export default {
    name: "home",
    components: {
      articleBlog,
      siderBar
    },
    data() {
      return {
       userId:"",
       articleList:"",
      };
    },
    methods: {
      turnTo(id){
        // const {href} = this.$router.resolve({path:`/home/articleDel/${id}`})
        // window.open(href,'_blank')
        this.$router.push({path:`/home/articleDel/${id}`})
      },

      //获取首页博客文章列表
      getList(){
        // this.$root.Bus.$on('userId',value =>{
        //   console.log(value,'userid')
        //   this.userId = value
        // })
        this.$api.article.articleList({type:"article"})
        .then((data)=>{
          if(data.code===1){
            this.articleList = data.data
          }
        })
      },

     
    },
    mounted() {
      // this.$router.push({path:'/'})
      this.getList()
    },
  };

</script>
<style lang='less' scoped>
  .home{
    display: flex;
    .articleBox{
      flex: 4;
    }
    .authorInfo{
      flex: 1;
    }
  }
</style>

