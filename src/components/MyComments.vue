<template>
  <div class="myComments">
    <h3 class="comments-title">评论</h3>
    <div class="comments-form">
        <div class="avatar-box">
            <!-- <img src="" alt=""> -->
            <avatar v-if='userName' :username="userName"></avatar>
            <i v-else class="defaultAvatar iconfont icon-touxiang"></i>
        </div>
        <div class="form-box">
            <el-input type="textarea" :rows="2" v-model="top_formBoxVal" placeholder="欢迎指点与交流..."></el-input>
            <div class="actoin-box">
                <div class="emojiWrap">
                    <emojiBox @getEmoji='getEmoji($event,1)' class="emojiBox"></emojiBox>
                </div>
                <div class="submit">
                    <el-button @click="commentArticle()" size='small' type='primary'>评论</el-button>
                </div>
            </div>
        </div>
    </div>
    <div class="comments-list">
        <div class="item" v-for="(item,index) in commentList" :key="index">
            <div class="comment">
                <div class="comment-avatar">
                    <!-- <img src="" alt=""> -->
                    <avatar :username="item.user.userName"></avatar>
                </div>
                <div class="content-box">
                    <div class="userInfo-box">
                        <h3 class="userName">{{item.user.userName}}</h3>
                        <!-- <p class="comment-time">{{formatTime(item.created_time,'YYYY-MM-DD hh:mm:ss')}}</p> -->
                        <p class="comment-time">{{formatTimeToNow(item.created_time)}}</p>
                    </div>
                    <div class="content">
                        <p class="content-text">{{item.content}}</p>
                        <el-button @click='replyComment(index)' size='mini' class="replyBtn" circle icon="iconfont icon-liuyan"></el-button>
                    </div>
                    
                    <div class="form-box" v-if="!showSubFormBox&&currentIndex==index">
                        <el-input type="textarea" :rows="1" v-model="sub_formBoxVal" :placeholder="`回复${item.user.userName}...`"></el-input>
                        <div class="actoin-box">
                             <div class="emojiWrap">
                                <emojiBox @getEmoji='getEmoji($event,2)' class="emojiBox"></emojiBox>
                            </div>
                            <div class="submit">
                                <el-button @click="subComment(item.user.userId,item.commentId)" size='small' type='primary'>评论</el-button>
                            </div>
                        </div>
                    </div>
                    <!-- 子评论 -->
                    <div class="sub-comment" v-for="(item2,index2) in item.sub_comment" :key="index2">
                        <div class="comment-avatar">
                            <!-- <img src="" alt=""> -->
                            <avatar :username="item2.user.userName"></avatar>
                        </div>
                        <div class="content-box">
                            <div class="userInfo-box">
                                <h3 class="userName">{{item2.user.userName}}</h3>
                                <span class="comment-time">{{formatTimeToNow(item2.created_time)}}</span>
                            </div>
                            <div class="content">
                                <p class="content-text">回复<i class="reply-user">{{item2.toUser.userName}}:</i></p>
                                <p class="content-text">{{item2.content}}</p>
                                <el-button size='mini' @click="replySubComment(index,index2)" class="replyBtn" circle icon="iconfont icon-liuyan"></el-button>
                            </div>
                            <div class="form-box" v-if="showSubFormBox&&currentIndex==index&&currentSubIndex==index2">
                                <el-input type="textarea" :rows="1" v-model="sub_formBoxVal" :placeholder="`回复${item2.user.userName}...`"></el-input>
                                <div class="actoin-box">
                                    <div class="emojiWrap">
                                        <emojiBox @getEmoji='getEmoji($event,2)' class="emojiBox"></emojiBox>
                                    </div>
                                    <div class="submit">
                                        <el-button @click="subComment(item2.user.userId,item.commentId)" size='small' type='primary'>评论</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
 //头像插件
  import Avatar from 'vue-avatar';
  import emojiBox from '@/components/emojiBox.vue'
  export default {
    name:'myComments',
    components:{
        Avatar,
        emojiBox
    },
    computed: {
      userId(){
        return this.$store.state.userId
      },
        userName(){
        return this.$store.state.userName
        }
    },
    data () {
      return {
          top_formBoxVal:"", 
          sub_formBoxVal:"", 
          currentIndex:-1,
          currentSubIndex:-1,
          showSubFormBox:false,
        //   emojiNative:"",
      };
    },
    props:{
        commentList:{
            type:Array
        }
    },
    methods: {
        restFormBox(){
          this.currentIndex=-1
          this.currentSubIndex=-1
          this.showSubFormBox=false
          this.top_formBoxVal = ''
          this.sub_formBoxVal = ''
        },
        replyComment(index){
            this.showSubFormBox =  false;
            this.currentIndex = index;
        },
        replySubComment(index,index2){
            this.showSubFormBox =  true;
            this.currentIndex = index;
            this.currentSubIndex = index2;
        },
        //评论
        commentArticle(){
            if(!this.userId){
                this.$message.info('请先登录!')
                return
            }
            this.$api.article.commentArticle({
                userId:this.userId,
                articleId:this.$route.params.id,
                content:this.top_formBoxVal,
            }).then(data=>{
                if(data.code===1){
                    this.restFormBox()
                    this.$parent.lookArticleDel(this.$route.params.id)
                }
            })
        },

         //子评论
        subComment(toUserId,commentId){
            this.$api.article.subCommentArticle({
                userId:this.userId,
                toUserId:toUserId,
                articleId:this.$route.params.id,
                commentId:commentId,
                content:this.sub_formBoxVal,
            }).then(data=>{
                 if(data.code===1){
                    this.restFormBox()
                    this.$parent.lookArticleDel(this.$route.params.id)
                }
            })
        },
        getEmoji(emoji,type){
            if(type===1){
                this.top_formBoxVal += emoji
            }else{
                this.sub_formBoxVal += emoji
            }
        },
    },

    mounted() {},

  }

</script>
<style lang='less' scoped>
    .defaultAvatar{
        text-align: center;
        line-height: 50px;
        font-size: 50px;
        color: #8a9aa9;
    }
    .comments-title{
        color: #8a9aa9;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        padding: 1.67rem 0 5px;
    }
    .comments-form {
        margin: 1.333rem 0;
        display: flex;
    }
     .avatar-box{
        margin: 0 15px 0 0;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        // background: #8a9aa9;
     }
    .form-box{
       flex: 1;
       background: #fff;
        .actoin-box{
            display: flex;
            margin-top: 10px;
            .emojiWrap{
                position: relative;
                 .emojiBox{
                    position: absolute;
                    top: 0px;
                    left: 0;
                }
            }
            .submit{
                margin-left: auto;
            }
        }
    }

    .comments-list{
        margin: 10px 66px;
        padding-bottom: 100px;
         .item{
             padding: 10px 0;
             border-bottom: 1px solid #f1f1f1;
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
                         .userName{color:#406599;}
                         .comment-time{margin: 0 20px;line-height: 21px;color:#8a9aa9;}
                         .replyBtn{margin-left:auto;}
                     }
                     .content{
                         padding: 8px 0;
                         display: flex;
                         .content-text{
                             line-height: 32px;
                         }
                         .reply-user{
                             padding: 0 5px;
                             color:#406599;
                             font-weight: 700;
                             font-style: normal;
                         }
                         .replyBtn{
                            margin-left: auto;
                        }
                     }
                     
                 }
                 .sub-comment{
                     display: flex;
                     margin-top: 15px;
                     padding-bottom: 10px;
                     background: #fafbfc;
                 }
             }

         }
    }
    .content-box .sub-comment:not(:last-child){
             border-bottom: 1px solid #f1f1f1;
    }

   
</style>