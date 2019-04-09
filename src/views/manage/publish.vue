<template>
  <div class="publish">
    <div class="markdownBtn">
      <el-input
        class="articleTitle"
        placeholder="请输入标题"
        v-model="title"
        suffix-icon="el-icon-edit"
        clearable>
      </el-input>

       <el-select
       class="c"
        style="width:355px;"
        v-model="tagValue"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="请选择文章标签">
        <el-option
          v-for="item in tagOption"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-button-group class="coverBtn">
        <!-- <el-button class="coverBtn22"  type="primary" size="small" icon="iconfont icon-caogaoxiang"><span class="btnText">封面</span></el-button> -->
        <el-dropdown trigger="click" class='dropdownBox' style="margin-right: -1px;">
          <el-button type="primary" size="small">
            <i class="iconfont icon-caogaoxiang"></i>
            <span class="btnText">封面</span>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="coverDropdown">
            <div class="coverImg" >
              <el-upload
                class="avatar-uploader"
                :action="`${baseUrl}/article/uploadCover`"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-dropdown-menu>
        </el-dropdown>

        <el-button @click='saveDraft' type="primary" size="small" icon="iconfont icon-baocun"><span class="btnText">保存</span></el-button>
        <el-button v-if="articleType=='article'" @click='updateArticle' type="primary" size="small" icon="iconfont icon-ic-published"><span class="btnText">更新</span></el-button>
        <el-button v-else  @click='publish' type="primary" size="small" icon="iconfont icon-ic-published"><span class="btnText">发布</span></el-button>
        
      </el-button-group>
    </div>
    <div class="markdown">
      <editor ref='markDown'  @getMd='getMd'></editor>
    </div>
  </div>
</template>

<script>
  import editor from '@/components/editor.vue'
  import base from '@/api/base.js'
  import {mapState} from 'vuex'
  
  export default {
    name:'publish',
    components:{
      editor
    },
    computed:{
        ...mapState(['userId'])
    },
    data () {
      return {
        baseUrl:base.dev,
        title:'',
        mdCode:'',

        imageUrl: '',
        pictureUrl: '',
        showCover: false,

        article: {},
        articleType:"",
        articleId:"",

        tagOption:[
          {
            value: 'VUE',
            label: 'VUE'
          },
          {
            value: 'HTML',
            label: 'HTML'
          },
          {
            value: 'JS',
            label: 'JS'
          }
        ],
        tagValue:[]

      };
    },
    created(){
    },
    methods: {
      //子组件传值 html
      getMd(md){
        this.mdCode = md 
      },
     
      //文章发布
      publish(){
        if(this.tagValue.length<1||this.mdCode == ""||this.title==""){
          this.$message({type:'info',message:'请输入完整信息',duration:1500})
          return
        }
        this.$api.article.publish({
              value:this.mdCode,
              title:this.title,
              pictureUrl:this.pictureUrl,
              tags:this.tagValue,
              authorId: this.userId
            }).then((data)=>{
              if(data.code===1){
                const{ articleId , title }  = data.data
                const content = `发布了新文章《${title}》，快来围观！`
                this.noticeAllUser(this.userId,content,articleId)
                this.$message({
                  type:"success",
                  duration:1500,
                  message:"发布成功！"
                  })
                this.$router.push({path:'/'})
              }
            })
       },
       //通知全体
       noticeAllUser(userId,content,articleId){
         this.$api.notice.noticeAllUser({
           userId,content,articleId
         }).then((data)=>{
           if(data.code === 1){}
         })
       },
      //文章更新
      updateArticle(){
        if(this.mdCode == ""||this.title==""){
          this.$message({type:'info',message:'请输入完整信息',duration:1500})
          return
        }
        this.$api.article.updateArticle(
          {
            articleId:this.articleId,
            value:this.mdCode,
            title:this.title,
            pictureUrl:this.pictureUrl,
          })
        .then((data)=>{
          if(data.code===1){
             this.$message({
                  type:"success",
                  duration:1500,
                  message:"更新成功！"
                  })
            this.$router.push({path:'/'})
          }
        })
      },
       //图片上传
       handleAvatarSuccess(res, file) {
         this.imageUrl = URL.createObjectURL(file.raw);
         this.pictureUrl = res.pictureUrl;
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 1;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return  isLt2M;
      },
      //保存为草稿
      saveDraft(){
         this.$api.article.articleDraft({
              articleId:this.articleId,
              value:this.mdCode,
              title:this.title,
              pictureUrl:this.pictureUrl,
            }).then((data)=>{
              console.log(data,'draft')
              if(data.code === 1){
                this.$message({
                    type:"success",
                    duration:1500,
                    message:"保存成功!"
                  })
              }
            })
      },
      //获取文章详情
      getArticleDel(articleId,type){
        this.$api.article.articleDel({
            articleId,
            type,
          })
        .then((data)=>{
          if(data.code===1){
            let article = data.data
            this.title = article.title
            this.imageUrl = article.pictureUrl
            this.pictureUrl = article.pictureUrl
            this.$refs.markDown.mdCode = article.value
          }
        })
      },

    },

  mounted() {
      const {id,type} = this.$route.query
      this.articleType = type
      this.articleId = id
      this.getArticleDel(id,type)
    },
  }

</script>
<style lang='less' scoped>
.publish{
  height: 100%;
}
.markdownBtn{
  .btnText{
    padding: 0 5px;
  }
}
 .markdown{
   height: calc(100% - 50px);
 }

 .el-button--primary {
    color: #fff;
    background-color: #545c64;
    border-color: #545c64;
}
  .el-button--primary:focus,.el-button--primary:hover {
      background: #66b1ff;
      border-color: #66b1ff;
      color: #fff;
  }
  .articleTitle{
    width: calc(100% - 602px);
  }
  .el-button--mini, .el-button--small {
    border-radius: 0px; 
  }
  .el-button{
    border-radius: 0px; 
  }


  //封面图
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
   
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .coverBtn{
    position: relative;
  }
  .coverImg{
    // position: absolute;
    // z-index: 10001;
    // top:46px;
    // left: -70px;
    border: 1px solid #ddd;
    padding: 20px;
    background: #fff;
  }
  // .coverImg::after{
  //     content: "";
  //     position: absolute;
  //     margin-left: -5px;
  //     top: -6px;
  //     left: 50%;
  //     width: 10px;
  //     height: 10px;
  //     background-color: #fff;
  //     border: 1px solid #ddd;
  //     border-right: none;
  //     border-bottom: none;
  //     -webkit-transform: rotate(45deg);
  //     transform: rotate(45deg);
  //     }
 .dropdownBox{
   position: relative;
   float: left;
 }
.el-popper[x-placement^=bottom] .popper__arrow {
        border-bottom-color: #ddd;
        left: 108px!important;
}
.tagSelect /deep/ .el-input__inner{
  border-radius: 0px;
}
</style> 