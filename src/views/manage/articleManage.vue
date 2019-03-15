<template>
<div class="articleManage">
<div class="hederMenu">
    <el-select v-model="value" @change="selectArticleType" placeholder="请选择">
        <el-option
        v-for="item in articleTypeList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>
</div>
  <div class="articleBlog clearfix" v-for="(article,index) in articleList" :key='index'>
      <div class="mainContent">
        <h2 class="title"><a href="javascript:void(0)">{{article.title}}</a></h2>
        <el-button-group class="btnBox">
            <el-button @click='editArticle(article.articleId)' size='small' type="info" plain icon="el-icon-edit"></el-button>
            <el-button @click='deleteArticle(article.articleId)' size='small' type="info" plain icon="el-icon-delete"></el-button>
        </el-button-group>
        <!-- <p class="content"></p> -->
        <ul class="intro clearfix">
          <li><i class="iconfont icon-riqi myicon"></i>{{formatTime(article.created_time,'YYYY-MM-DD HH:MM:SS')}}</li>
        </ul>
      </div>
      
  </div>
</div>
</template>

<script>
export default {
  name: 'articleManage',
  data(){
    return{
      articleList:[],
      articleType:"article",
      articleTypeList: [{
          value: 'article',
          label: '文章'
        }, {
          value: 'draft',
          label: '草稿'
        }],
        value: '文章'
    }
  },
  methods:{
      //选择文章类型
      selectArticleType(val){
        this.articleType = val 
        this.getList(val)
      },

      //获取列表
    getList(type){
        this.$api.article.articleList({type:type})
        .then((data)=>{
            if(data.code===1){
                this.articleList = data.data
            }
        })
    },
    //编辑
    editArticle(id){
        this.$router.push({path:'/manage/publish',query:{id:id,type:this.articleType}})  // type: draft/article
    },
    //删除
    deleteArticle(articleId){
        this.$api.article.deleteArticle({articleId,type:this.articleType})
        .then((data)=>{
            if(data.code===1){
                this.$message({
                  message:"删除成功！",
                  type:'success',
                  duration:1500
                })
                
                this.getList(this.articleType)
            }
        })
    },
  },
  mounted(){
      this.getList(this.articleType)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.articleBlog{
  color: #666;
  cursor: pointer;
  position: relative;
  // border-bottom: 1px solid #ccc;
  padding: 12px 0px;
  background: #fff;
  margin: 3px 0; 
  .mainContent{
    float: left;
    width: calc(100% - 125px);
    padding-left: 30px;
    .title{
      padding-bottom: 10px; 
    }
    .content { 
      min-height:50px;
      color: #666;
    }
    .intro{
      display: flex;
      margin-top: 0px;
    }
    .intro>li{
      height: 28px;
      margin-left: -1px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      color: #666;
      border-radius: 1px;
      border: 1px solid #e8e4e4;
      background-color: #f7f8fa;
    }
    .myicon{
      font-size: 14px;
      margin-right: 10px;
    }
  }
  .btnBox{
    position: absolute;
    top: 10px;
    right: 10px;  
}
}


</style>
