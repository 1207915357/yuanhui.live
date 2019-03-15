<template>
  <div class="home">
    <div class="authorInfo">
      <siderBar></siderBar>
    </div>
    <div class="articleBox" >
        <articleBlog v-for="(item,index) in articleList" 
                    :key="index" 
                    :article="item"
                    @click.native='turnTo(item.articleId)'>
        </articleBlog>
    </div>
</div>
</template>

<script>
  // @ is an alias to /src
  import articleBlog from "@/components/articleBlog.vue";
  import siderBar from "@/components/siderBar.vue";
  import {mapState,mapMutations} from 'vuex'

  export default {
    name: "home",
    components: {
      articleBlog,
      siderBar
    },
    computed: {
      ...mapState(['showLoading'])
    },
    data() {
      return {
       userId:"",
       articleList:"",
      };
    },
    methods: {
      ...mapMutations(['handleLoading']),
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
        this.handleLoading(true)
        this.$api.article.articleList({type:"article"})
        .then((data)=>{
          if(data.code===1){
            this.handleLoading(false) 
            this.articleList = data.data
          }else{
            this.handleLoading(false)
            this.$message({
              type:'error',
              message:'server error!',
              duration: 1500
            })
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
      flex: 1;
      margin-left: 260px;
    }
    .authorInfo{
      width: 260px;
      position: fixed;
    }
  }

</style>

