<template>
  <div class="siderBar">
    <!-- 介绍信息 -->
    <div class="author">
        <img src="@/assets/imgs/avatar.jpg" alt="">
        <h3>看不见的城</h3>
        <p>刻意练习方能精通</p>
        <ul class="myLink">
            <li><i class="iconfont icon-githublogo"></i><a href="https://github.com/1207915357" target="blank">github</a></li>
            <li><i class="iconfont icon-juejin"></i><a href="https://juejin.im/user/59ec207f6fb9a0452845a173" target="blank">juejin</a></li>
        </ul>
    </div>
    <!-- 搜索框 -->
    <div class="searchBox">
        <el-input placeholder="搜索文章" @keyup.enter.native='serchArticle(keyWord)' v-model="keyWord">
            <i slot="prefix" class="el-input__icon el-icon-search" style="cursor:pointer;" @click='serchArticle(keyWord)'></i>
            <el-tag class='searchTag' @click='serchArticle("hottest")' slot="suffix" type="danger" size="mini">最热</el-tag>
            <el-tag class='searchTag' @click='serchArticle("newest")' slot="suffix" type="danger" size="mini">最新</el-tag>
        </el-input>
    </div>
    <!-- 词云 -->
    <div ref='wordCloudBox'></div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import myCloud from '@/assets/js/myCloud.js' 
  export default {
    name:'siderBar',
    data () {
      return {
        keyWord:"",
        articleList:[]
      };
    },

    methods: {
         ...mapMutations(['handleLoading']),
        //搜索文章
         serchArticle(keyWord){
            this.$api.article.searchArticle({keyWord})
            .then((data)=>{
                // console.log(data)
                if(data.code===1){
                    this.$emit('searchList',data.data)
                }else{
                    this.$message({type:'error',message:'server is error!',duration:1500})
                }
            })
        },
         //tag列表
      getTagList(){
        return new Promise((resolve,reject)=>{
            this.$api.article.getTagList({})
            .then((data)=>{
                if(data.code===1){
                  let wordList = []
                  for(let ele of data.data){
                    let wordSize = 20 + Math.floor(ele.count/5)*2
                    wordSize>30?30:wordSize
                    let obj = {
                      text: ele.tagName,
                      size: wordSize
                    }
                    wordList.push(obj)
                  }
                  resolve(wordList)
                }else{
                    this.$message({
                      type:'error',
                      message:'server error!',
                      duration: 1500
                    })
                    reject(e)
                }
              }
            )
         })
      },
//文章列表
      getArticleList(tagName){
        this.handleLoading(true)
        // this.$router.push({path:'/'}) // ?? 导航不变
        this.$api.article.articleList({type:"article",tagName,start:0,rows:1000})
        .then((data)=>{
          if(data.code===1){
            this.handleLoading(false)
            // this.articleList = data.data
            this.$emit('wordCloudList', data.data)
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
      //生成词云
      getWordCloud(wordList){
        return new Promise((resolve,reject)=>{
         let wordOption = {  
                  wordList,
                  size:[257,257],
                  svgElement: this.$refs.wordCloudBox
                }
          myCloud(wordOption,this.getArticleList)
        })
      },
      //异步封装
      // async getAsync(){
      //   await this.getTagList()
      // }
    },

    mounted() {
         this.getTagList().then((wordList)=>{
         this.getWordCloud(wordList)
       })
    },

  }

</script>
<style lang='less' scoped>
 .siderBar{
     background: #f7f8fa;
     margin-top:3px;
     margin-right: 3px;
    //
     .author{
         display: flex;
         flex-direction: column;
         align-items: center;
         padding: 10px;
         img{
             border-radius: 50%;
             width: 132px;
             height: 132px;
             margin: 10px 0 20px;
         }
         p{
             margin: 10px 0;
         }
         .myLink{
             li{
                 float: left;
                 margin: 0 6px;
                 .iconfont{
                    padding-right: 4px;
                    font-size: 18px;
                 }
             }
         }
     }
    //
     .searchBox{
         .searchTag{
             margin: 10px 2px 0 0 ;
             cursor: pointer; 
         }
    }
 }


</style>