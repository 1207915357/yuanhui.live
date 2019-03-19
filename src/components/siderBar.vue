<template>
  <div class="siderBar">
    <div class="author">
        <img src="@/assets/imgs/avatar.jpg" alt="">
        <h3>看不见的城</h3>
        <p>光学不练等于耍流氓</p>
        <ul class="myLink">
            <li><i class="iconfont icon-githublogo"></i><a href="https://github.com/1207915357" target="blank">github</a></li>
            <li><i class="iconfont icon-juejin"></i><a href="https://juejin.im/user/59ec207f6fb9a0452845a173" target="blank">juejin</a></li>
        </ul>
    </div>
    <div class="searchBox">
        <el-input placeholder="搜索文章" @keyup.enter.native='serchArticle(keyWord)' v-model="keyWord">
            <i slot="prefix" class="el-input__icon el-icon-search" style="cursor:pointer;" @click='serchArticle(keyWord)'></i>
            <el-tag class='searchTag' @click='serchArticle("hottest")' slot="suffix" type="danger" size="mini">最热</el-tag>
            <el-tag class='searchTag' @click='serchArticle("newest")' slot="suffix" type="danger" size="mini">最新</el-tag>
        </el-input>
    </div>
  </div>
</template>

<script>

  export default {
    name:'siderBar',
    data () {
      return {
        keyWord:"",
      };
    },

    methods: {
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
    },

    mounted() {
       
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