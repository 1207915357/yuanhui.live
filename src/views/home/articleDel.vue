<template>
  <div class="articleDel">
    <h1 class="delTitle">{{articleDel.title}}</h1>
    <!-- <div v-html='articleDel.value'></div> -->
    <!-- 解析markdown源码 -->
    <div class='articleContent'>
      <editor :isResolve="true" :value="articleDel.value"></editor>
    </div>
    <div class="siderBtn">
      <el-badge :value="articleDel.like" class="item">
        <el-button @click='giveLike(articleDel.id)' type="info" class="myicon" icon="iconfont icon-dianzan" circle></el-button>
      </el-badge>
      <br/>
      <el-badge :value="12" class="item">
        <el-button type="info" class="myicon" icon="iconfont icon-pinglun" circle></el-button>
      </el-badge>
    </div>
  </div>
</template>

<script>
  import editor from '@/components/editor.vue'
  export default {
    name:'articleDel',
    components:{
      editor
    },
    data () {
      return {
        articleDel:{},
        userId:this.getCookie('userId')
      };
    },

    methods: {
      //点赞
      giveLike(id){
        this.$api.article.giveLike({
          userId:this.userId,
          articleId:id
        }).then((data)=>{
          console.log(data)
          if(data.code===1){
            this.lookArticleDel(this.$route.params.id)
          }else if(data.code===201){
            this.$message.info('请先登录!')
          }
        })
      },

       //查看文章详情
      lookArticleDel(id){
         this.$api.article.articleDel({
           type:"article",
           id:id
         })
        .then((data)=>{
          console.log(data)
          if(data.code===1){
            this.articleDel = data.data
          }
        })
      },
     
    },

    mounted() {
      this.lookArticleDel(this.$route.params.id)
    },

  }

</script>
<style lang='less' scoped>
  .articleDel{
    background: #fff;
    padding: 20px 20px 20px 80px;
    .delTitle{
      text-align: center;
      padding:20px 
    }
  .siderBtn{
    position: fixed;
    top: 30%;
    left: calc(50% - 666px);
    .myicon{
      margin-bottom: 15px;
    }
   
  }
  }

  
</style>