<template>
  <div class="home">
    <div class="authorInfo">
      <siderBar @searchList="searchList"></siderBar>
    </div>
    <div class="articleBox" >
        <articleBlog v-for="(item,index) in articleList" 
                    :key="index" 
                    :article="item"
                    @click.native='turnTo(item.articleId)'>
        </articleBlog>
        <div class="line-bottom" v-show="showNoMore">NoMore</div>
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
      ...mapState(['barY_process'])
    },
    data() {
      return {
       userId:"",
       articleList:[],
       start: 0,
       showNoMore:false,
       loading: true,
      };
    },
    watch:{
      barY_process:function(val){
        if(val>0.96){
          this.start += 10
          this.getList()
        }
      }
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
        if(this.loading){
          this.handleLoading(true)
          this.$api.article.articleList({
            type:"article",
            rows:10,
            start: this.start
            })
          .then((data)=>{
            if(data.code===1){
              this.handleLoading(false) 
              let theList = data.data
              this.articleList = this.articleList.concat(theList)
              if(theList.length < 10){
                this.showNoMore = true;
                this.loading = false;
              }
            }else{
              this.handleLoading(false)
              this.$message({
                type:'error',
                message:'server error!',
                duration: 1500
              })
            }
          })
        }
      },
      //搜索的文章
      searchList(data){
        console.log(data)
        this.articleList = data
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

.line-bottom{
  position: relative;
  width: 100%;
  color: #fff;
  text-align: center;
  line-height: 36px; 
  &:before, &:after{
    display: inline-block;
    content: "";
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    border-top: 1px solid #ccc;
  }
   &:before{
    left: 0;
  }
  &:after{
    right: 0;
  } 
}
</style>

