<!--归档-->
<template>
  <div class="archive">
    <!-- <div class="authorInfo">
      <siderBar></siderBar>
    </div> -->
    <div class="contentBox">
      <div class="tagBox">
        <h3 class="tagBoxTitle">分类标签</h3>
        <el-badge   
                    :value="AllLength" 
                    class="tagClass" 
                    >
          <el-tag @click='getArticleList("All")' size="small">All</el-tag>
        </el-badge>
        <el-badge  v-for="(item,index) in tagList" 
                    :key="index"  
                    :value="item.count" 
                    class="tagClass" 
                    >
          <el-tag @click='getArticleList(null,item.tagName)' size="small">{{item.tagName}}</el-tag>
        </el-badge>
      </div>

      <div class="timelineBox">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index2) in ListTitle"
              :key="index2+'listTitle'"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.timestamp">
              {{activity.content}}
            </el-timeline-item>
            <el-timeline-item  
            v-for="(item, index) in activities" 
            :key="index" 
            :timestamp="item.timestamp"
            :icon="item.icon"
            :type="item.type"
            :color="item.color"
            :size="item.size" 
            placement="top">
              <el-card>
                <h4 class="timeTitle" @click="turnTo(item.articleId)">{{item.content}}</h4>
                <!-- <p>王小虎 提交于 2018/4/12 20:46</p> -->
              </el-card>
            </el-timeline-item>
          </el-timeline>

      </div>

    </div>
     
  </div>
</template>

<script>
  import siderBar from "@/components/siderBar.vue";
  import { mapState, mapMutations } from 'vuex';

  export default {
    name:'archive',
    components:{
      siderBar
    },
    data () {
      return {
         activities: [],
         ListTitle: [{
          content: '',
          type: 'primary',
        }, {
          content: '2019',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-time',
          size: 'large'
        }
        ],
        tagList:[],
        AllLength:'',
      };
    },
    computed:{
      ...mapState(['showLoading'])
    },
    methods: {
      ...mapMutations(['handleLoading']),
      turnTo(id){
        if(!id) return
        this.$router.push({path:`/articleDel/${id}`})
      },
      //文章列表
      getArticleList(type,tagName){
        // this.handleLoading(true)
        let content  = tagName || 'All The'
        this.ListTitle[0].content = `${content} List`;
        this.$api.article.articleList({type:"article",tagName,start:0,rows:1000})
        .then((data)=>{
          if(data.code===1){
            // this.handleLoading(false)

            this.activities = []
            if(type == "All"){
              this.AllLength = data.data.length
            }
            for(let [i,ele] of data.data.entries()){
              let obj = {
                articleId:ele.articleId,
                content : ele.title,
                timestamp : this.formatTime(ele.created_time,'YYYY-MM-DD'),
                type: 'primary',
              }
              this.activities.push(obj)
            }
           }else{
            // this.handleLoading(false)
            this.$message({
              type:'error',
              message:'server error!',
              duration: 1500
            })
          }
        })
      },
      //tag列表
      getTagList(){
        this.$api.article.getTagList({})
        .then((data)=>{
          // console.log(data)
            if(data.code===1){
              this.tagList = data.data
            }else{
              this.$message({
              type:'error',
              message:'server error!',
              duration: 1500
            })
            }
          }
        )
      },

    },

    mounted() {
      this.getArticleList("All")
      this.getTagList()
    },

  }

</script>
<style lang='less' scoped>
.archive{
    display: flex;
    // .authorInfo{
    //   width: 260px;
    //   position: fixed;
    // }
    .contentBox{
      flex: 1;
      // margin-left: 260px;
      margin-top: 3px;
      background: #f1f2f6;
      padding: 50px;

    }
    .timelineBox{
      margin-top: 50px;
    }
  }
  .archive /deep/ .el-timeline-item__content .timeTitle{
    cursor: pointer;
    color: #409eff;
    padding: 10px;
    &:hover{
     color: #0781ff;
    }
  }
  .timelineBox /deep/ .el-card__body {
    padding: 0px;
  }
  .timelineBox /deep/ .el-timeline-item__node--normal {
    left: 0px;
    width: 9px;
    height: 9px;
}
  .timelineBox /deep/ .el-timeline-item__node--large {
    left: -3px;
    width: 16px;
    height: 16px;
    background: none;
    // padding-bottom: 20px;
}
  .timelineBox /deep/ .el-timeline-item__icon {
    color: #e83e3e;
    font-size: 20px;
}
  .tagBox{
    .tagBoxTitle{
        text-align: center;
        padding-bottom: 20px;
  }
    .tagClass{
        margin: 8px 15px;
        cursor: pointer;
        font-weight: 700;
    }
  } 


</style>
