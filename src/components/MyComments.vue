<template>
  <div class="myComments">
    <h3 class="comments-title">评论</h3>
    <div class="comments-form">
        <div class="avatar-box">
            <img src="" alt="">
        </div>
        <div class="form-box">
            <el-input type="textarea" :rows="2" v-model="formBoxVal" placeholder="输入评论..."></el-input>
            <div class="actoin-box">
                <div class="emoji">表情</div>
                <div class="submit">
                    <el-button size='small' type='primary'>评论</el-button>
                </div>
            </div>
        </div>
    </div>
    <div class="comments-list">
        <div class="item" v-for="(item,index) in [1,2,3]" :key="index">
            <div class="comment">
                <div class="comment-avatar">
                    <img src="" alt="">
                </div>
                <div class="content-box">
                    <div class="userInfo-box">
                        <h3 class="userName">球球</h3>
                        <p class="comment-time">2019-3-1</p>
                    </div>
                    <div class="content">
                        <p class="content-text">评论的内容</p>
                        <el-button @click='replyComment(index)' size='mini' class="replyBtn" circle icon="iconfont icon-liuyan"></el-button>
                    </div>
                    
                    <div class="form-box" v-if="!showSubFormBox&&currentIndex==index">
                        <el-input type="textarea" :rows="2" v-model="formBoxVal" placeholder="输入评论..."></el-input>
                        <div class="actoin-box">
                            <div class="emoji">表情</div>
                            <div class="submit">
                                <el-button size='small' type='primary'>评论</el-button>
                            </div>
                        </div>
                    </div>
                    <!-- 回复评论 -->
                    <div class="sub-comment" v-for="(item2,index2) in [1,2,3]" :key="index2">
                        <div class="comment-avatar">
                            <img src="" alt="">
                        </div>
                        <div class="content-box">
                            <div class="userInfo-box">
                                <h3 class="userName">贝贝</h3>
                                <span class="comment-time">2019-3-1</span>
                            </div>
                            <div class="content">
                                <p class="content-text">回复<i class="reply-user">球球:</i></p>
                                <p class="content-text">评论的内容</p>
                                <el-button size='mini' @click="replySubComment(index,index2)" class="replyBtn" circle icon="iconfont icon-liuyan"></el-button>
                            </div>
                            <div class="form-box" v-if="showSubFormBox&&currentIndex==index&&currentSubIndex==index2">
                                <el-input type="textarea" :rows="2" v-model="formBoxVal" placeholder="输入评论..."></el-input>
                                <div class="actoin-box">
                                    <div class="emoji">表情</div>
                                    <div class="submit">
                                        <el-button size='small' type='primary'>评论</el-button>
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

  export default {
    name:'myComments',
    data () {
      return {
          formBoxVal:"",
          currentIndex:-1,
          currentSubIndex:-1,
          showSubFormBox:false,
      };
    },

    methods: {
        replyComment(index){
            this.showSubFormBox =  false;
            this.currentIndex = index;
        },
        replySubComment(index,index2){
            this.showSubFormBox =  true;
            this.currentIndex = index;
            this.currentSubIndex = index2;
        }
    },

    mounted() {},

  }

</script>
<style lang='less' scoped>
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
        margin: 0 1rem 0 0;
        width: 2.667rem;
        height: 2.667rem;
        border-radius: 50%;
        background: #8a9aa9;
     }
    .form-box{
       flex: 1;
       background: #fff;
        .actoin-box{
            display: flex;
            margin-top: 10px;
            .emoji{
                
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
                    margin: 0 1rem 0 0;
                    width: 2.667rem;
                    height: 2.667rem;
                    border-radius: 50%;
                    background: #8a9aa9;
                 }
                 .content-box{
                     flex: 1;
                     .userInfo-box{
                         display: flex;
                         .userName{color:#406599;}
                         .comment-time{margin: 0 20px;line-height: 21px;}
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