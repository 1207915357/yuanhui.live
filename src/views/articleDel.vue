<template>
  <div class="articleDel">
    <!-- 详情 -->
    <div class="articleInfoBox">
      <h1 class="articleTitle">{{articleDel.title}}</h1>
      <ul class="articleInfo clearfix">
          <li><i class="iconfont icon-riqi myicon"></i>{{formatTime(articleDel.created_time,'YYYY年MM月DD日')}}</li>
          <li><i class="iconfont icon-yanjingxian myicon"></i>{{articleDel.eye}}</li>
          <li><i class="iconfont icon-dianzan myicon"></i>{{articleDel.like}}</li>
          <li><i class="iconfont icon-liuyan myicon"></i>{{articleDel.comments}}</li>
        </ul>
    </div>

    <!-- <div v-html='articleDel.value'></div> -->
    <!-- 解析markdown源码 -->
    <div class='articleContent'>
      <editor :isResolve="true" :value="articleDel.value"></editor>
    </div>

    <!-- 点赞按钮 -->
    <div class="siderBtn">
      <el-badge :value="articleDel.like" class="item">
        <el-button @click='giveLike(articleDel.articleId)' type="info" class="myicon" icon="iconfont icon-dianzan" circle></el-button>
      </el-badge>
      <br/>
      <a href="#myComment">
        <el-badge :value="articleDel.comments" class="item">
          <el-button type="info" class="myicon" icon="iconfont icon-liuyan" circle style="font-weight: 700;"></el-button>
        </el-badge>
      </a>
    </div>

    <!-- 评论 -->
    <my-comments id="myComment" :articleDel='articleDel'></my-comments>

  </div>
</template>

<script>
  import editor from '@/components/editor.vue'
  import MyComments from '@/components/MyComments.vue'
  export default {
    name:'articleDel',
    components:{
      editor,
      MyComments
    },
    watch:{
      '$route':function(nowR,oldR){
        //  console.log(nowR,oldR)
         this.lookArticleDel(this.$route.params.id)
      }
    },
    computed: {
      userId(){
        return this.$store.state.userId
      },
     
    },
    data () {
      return {
        articleDel:{},
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
            this.lookArticleDel(this.$route.params.id,'true')
          }else if(data.code===201){
            this.$message.info('请先登录!')
          }
        })
      },

       //查看文章详情
      lookArticleDel(id,notAddEye){
         this.$api.article.articleDel({
           type:"article",
           articleId:id,
           notAddEye
         })
        .then((data)=>{
          if(data.code===1){
            this.articleDel = data.data
          }else if(data.code == 200){
            this.$message.info(data.msg)
            setTimeout(() => {
              this.$router.push('/')
            }, 1000);
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
  .articleInfoBox{
    .articleTitle{
      text-align: center;
      padding:20px 
    }
     .articleInfo{
      display: flex;
      justify-content: center;
    }
    .articleInfo>li{
      padding: 0 10px 10px;
      display: flex;
      align-items: center;
      // border-bottom: 1px solid #dfe2e5;
    }
    .myicon{
      font-size: 14px;
      margin-right: 10px;
    }
  }

  .articleDel{
    background: #f1f2f6;
    padding: 20px;
    .siderBtn{
      position: fixed;
      top: 30%;
      left: calc(50% - 710px);
      .myicon{
        margin-bottom: 15px;
      }
    }
  }

  .articleDel /deep/ .el-textarea{
    background: #f1f2f6;
    .el-textarea__inner{
      border-radius: 20px;
    }
  }
  
  
</style>

