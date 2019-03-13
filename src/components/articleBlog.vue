<template>
  <div class="articleBlog clearfix">
      <div class="right">
          <!-- <el-tag class="articleTag"  size="mini" type="danger">{{formatTime(article.created_time,'YYYY-MM-DD')}}</el-tag> -->
        <h2 class="title">
          <a href="javascript:void(0)">{{article.title}}</a>
          <el-tag class="articleTag" v-for="(item,index) in article.tags" :key="index" size="small" type="">{{item}}</el-tag>
        </h2>
        <div class="content">
          <editor :isResolve="true" :value="article.value"></editor>
        </div>
        <ul class="intro clearfix">
          <li><i class="iconfont icon-riqi myicon"></i>{{formatTime(article.created_time,'YYYY-MM-DD')}}</li>
          <li><i class="iconfont icon-chakanyan myicon"></i>{{article.eye}}</li>
          <li><i class="iconfont icon-dianzan myicon"></i>{{article.like}}</li>
          <li><i class="iconfont icon-pinglun myicon"></i>{{article.comments}}</li>
        </ul>
      </div>
      <div class="left">
          <img v-if="article.pictureUrl" :src="article.pictureUrl" alt="">
      </div>
  </div>
</template>

<script>
import editor from'@/components/editor.vue'
export default {
  name: 'articleBlog',
  props: {article:Object},
  data(){
    return{
      giveLikeActive:'',
      
    }
  },
   components:{
      editor
  },
  methods: {
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.articleBlog{
  color: #666;
  cursor: pointer;
  // border-bottom: 1px solid #ccc;
  padding: 12px 0px;
  // background: #f1f2f6;
  background: #f1f2f6;
  margin: 3px 0; 
  &:hover{
  //  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    // background: #cae4ff
  }
  // background: linear-gradient(45deg, #cccccc 15px, #fff 15px) left / 50% 100% no-repeat, 
  //             linear-gradient(-45deg, #cccccc 15px, #ffffff 0) right / 50% 100% no-repeat;
 /*  background: radial-gradient(circle at top left,transparent 15px,red 0) top left,radial-gradient(circle at top right,transparent 15px,red 0) top right,radial-gradient(circle at bottom left,transparent 15px,red 0) bottom left,radial-gradient(circle at bottom right,transparent 15px,red 0) bottom right;
  background-size: 50% 50%;
  background-repeat: no-repeat; */
  .left{
    float: left;
    width: 100px;
    height: 100px;
    // border: 1px solid #ccc;
    img{
      width: 100px;
      height: 100px;
      // clip-path: polygon(50% 0, 100% 50%,50% 100%, 0 50%);
      // transition: 1s clip-path;
      // &:hover {
      //   clip-path: polygon(0 0, 100% 0,100% 100%, 0 100%);
      // }
    }
  
  }
  .right{
    float: left;
    width: calc(100% - 125px);
    padding-left: 30px;
    .title{
      padding-bottom: 10px; 
    }
    .content { 
      max-height:90px;
      color: #666;
      overflow: hidden;
    }
    .intro{
      display: flex;
      margin-top: 10px;
    }
    .intro>li{
      height: 28px;
      margin-left: -1px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      color: #409eff;
      font-weight: 700;
      border-radius: 15px;
      border: 1px solid #cae4ff;
      background-color: #f7f8fa;
    }
    .myicon{
      font-size: 14px;
      margin-right: 10px;
    }
  }
  .giveLikeActiveClass{
    color: red;
  }

}
.articleBlog /deep/.v-note-wrapper{
    z-index: 0;
  }

  .articleBlog .articleTag{
    margin-left:  10px;
  }
</style>

