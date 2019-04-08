<!--通知模块-->
<template>
  <div class="notice" v-cloak>
      <!-- 通知图标 -->
    <div class="noticeIcon"  @click="readedNotice">
        <el-badge v-if='unreadNum' :value='unreadNum' class="notice-badge">
            <i class="iconfont icon-youjian"></i>
        </el-badge>
         <span v-else class="notice-badge">
            <i class="iconfont icon-youjian"></i>
        </span>
    </div>

    <!-- 通知框 -->
    <el-dialog
    title="通知"
    :visible.sync="dialogVisible"
    width="40%">

    <vue-scroll :ops="noticeScroll"> 
    <div class="comments-list">
            <div 
                class="notice-item" 
                v-for="(item,index) in commentNotice" 
                :key="index"
                @click='turnToArticleDel(item.articleId)'>
                <div v-if='commentNotice.length> 0' class="comment">
                    <div class="comment-avatar">
                        <avatar :username="item.user.userName"></avatar>
                    </div>
                    <div class="content-box">
                        <div class="userInfo-box" >
                            <h3 class="userName">
                                <span class="nameBox">{{item.user.userName}}</span>    
                                <i v-if="item.user.type == 0" class="iconfont icon-huiyuan1"></i>
                                <!-- <i v-if="item.user.type == 0" class="iconfont icon-VIP1"></i> -->
                                <!-- <i v-if="item.user.type == 0" class="iconfont icon-huiyuan"></i> -->
                                <!-- <i v-if="item.user.type == 0" class="iconfont icon-vip1"></i> -->
                            </h3>
                            <p class="comment-time">{{formatTimeToNow(item.created_time)}}</p>
                        </div>
                        <div class="content">
                            <p class="content-text">{{item.content}}</p>
                        </div>
                        <!-- comment-->
                        <div class="contentType" v-if="item.type=='comment'">
                                <span>评论了文章</span>
                                <span class="titleStyle" v-if='item.articleTitle'>{{item.articleTitle}}</span>
                        </div>
                        <!-- answer -->
                        <div class="contentType" v-if="item.type=='answer'">
                            <span >回复了你的评论:</span>
                            <span class="textStyle" v-if='item.toContent'>{{item.toContent}}</span>
                        </div>
                        <!-- notice
                        <div class="contentType" v-if="item.type=='notice'">
                            <span >回复了你的评论:</span>
                        </div> -->
                    </div>
                </div>
            </div>
            <div v-show='commentNotice.length==0' class="noDateBox">
                <p>暂无最新消息</p>
            </div>
    </div>
        </vue-scroll>

    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleClose">清除</el-button>
    </span>
    </el-dialog>

  </div>
</template>
  <!-- <script src="http://localhost:3000/socket.io/socket.io.js"></script> -->

<script>
  import Avatar from 'vue-avatar';
  import {mapState} from 'vuex'
  export default {
    name:'notice',
    components:{
        Avatar
    },
    computed:{
        ...mapState(['userId'])
    },
    data () {
      return {
          dialogVisible: false,
          unreadNum:0,
          commentNotice: [],
          noticeScroll: {
          bar: {
            keepShow:true,
            background: 'rgba(204, 204, 204, 0.51)'
          }
        }, 
      };
    },

    // sockets: {
    //     //建立连接自动调用connect
    //     connect: function() {
    //         //与socket.io连接后回调
    //        // console.log("socket connected");
    //     },
    //     //服务端向客户端发送事件
    //     news: function(value) {
    //         //监听login(后端向前端emit 的回调)
    //        // console.log(value,'val')
    //     }
    // },

     methods: {
        //获取通知
        getNotice(){
            this.$api.notice.getNotice({userId:this.userId})
            .then((data)=>{
                console.log(data,'data')
                if(data.code === 1){
                    this.unreadNum = data.data.unreadNum
                    this.commentNotice = data.data.commentNotice
                }
            })
        },
        //跳转到文章详情
        turnToArticleDel(id){
            if(!id)return
            this.dialogVisible = false;
            this.$router.push({path:`/home/articleDel/${id}`})
        },
        //确认清除通知弹窗
         handleClose() {
            this.$confirm('确认清除全部消息？')
            .then(_ => {
                this.clearNotice()
            }).catch(_ => {});
        },
        //已读通知
        readedNotice(){
            this.dialogVisible = true
            if(this.unreadNum === 0)return
            this.$api.notice.readedNotice({
                userId:this.userId
            })
            .then((data)=>{
                if(data.code === 1){
                    this.unreadNum = 0
                }
                else{
                    this.$message.error('服务器错误')
                }
            })

        },
        //清除通知
        clearNotice(){
           if(this.commentNotice.length === 0)return
            this.$api.notice.clearNotice({
                userId:this.userId
            })
            .then((data)=>{
                if(data.code === 1){
                    this.commentNotice = []
                }
                else{
                    this.$message.error('服务器错误')
                }
            }) 
        },
    },
    mounted(){
      this.getNotice()
    }

  }

</script>
<style lang='less' scoped>
.notice{
    // display: inline-block;
    // position: absolute;
    // top: 18px;
    // right: 120px;
    .notice-badge{
        cursor: pointer;
        i{
            color: #fff;
            font-size: 22px;
        }
    }
}
.notice /deep/ .el-dialog__body{
        padding: 0 ;
}
.notice /deep/ .el-dialog__header{
       border-bottom: 1px solid #eee;
}
.notice /deep/ .el-dialog__footer{
       border-top: 1px solid #eee;
       padding: 10px
}

.comments-list{
        min-height: 100px;
        max-height: 500px;
        .noDateBox{
            color: #aaa;
            padding: 10px 20px;
        }
         .notice-item{
             padding: 10px 15px;
             border-bottom: 1px solid #f1f1f1;
             cursor: pointer;
             &:hover{
            //    background:#ccc;  
            box-shadow: 0px 2px 10px 2px  #ccc;
             }
             .comment{
                 display: flex;
                 .comment-avatar{
                    margin: 0 15px 0 0;
                     width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    // background: #8a9aa9;
                 }
                 .content-box{
                     flex: 1;
                     .userInfo-box{
                         display: flex;
                         .userName{
                             .nameBox{color:#406599;font-size: 14px;}
                             .iconfont{padding-left: 5px; color: #ecca38;}
                             }
                         .comment-time{margin: 0 20px;line-height: 21px;color:#8a9aa9; margin-left:auto;}
                     }
                     .content{
                         padding: 0 5px;
                         display: flex;
                         border-radius: 24px;
                         .content-text{
                             line-height: 32px;
                         }
                     }
                      .contentType{
                            color: #a1a9b3;
                            padding: 5px;
                            background: #f8f8f8;
                            .textStyle{
                                    color:#000;
                                    padding: 0 5px;
                                }
                            .titleStyle{
                                color:#406599;
                                font-weight: 700; 
                                padding: 0 5px;
                            }
                        }
                     
                 }
             }

         }
    }
</style>