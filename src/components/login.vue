<template>
  <div id="login">
      <div class="userbox">
          <div class="loginBtn" v-if='!token'>
            <el-button type="primary" size='small' @click="dialogFormVisible = true"><svg-icon icon-class='user' style="margin-right:6px;font-size:13px;"/>登录</el-button>
            <el-button type="danger" size='small' @click="dialogFormVisible2 = true" icon='el-icon-circle-plus-outline' plain>注册</el-button>
          </div>
          <div class="userInfo" v-else>
              <el-dropdown size="small" @command="loginout">
                 <el-button type="primary" size="small">
                  <svg-icon icon-class='user' style="margin-right:6px;font-size:13px;"/>
                  {{userName}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                 </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>退出登陆</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
          </div>
        </div>

     <!-- loginForm -->
      <div class="loginBox">
        <el-dialog title="登录" :visible.sync="dialogFormVisible">
          <el-form :hide-required-asterisk='true' :model="formLogin" label-width="80px" status-icon :rules="rulesLogin" ref='formLogin' size='small'>
            <el-form-item label="用户" prop="userName">
              <el-input  placeholder="请输入用户名" v-model.trim="formLogin.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type='password' placeholder="请输入密码"  @keyup.enter.native="submitFormLogin('formLogin')" v-model.trim="formLogin.password" autocomplete="off"></el-input>              
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size='small' style="width:100%;" type="primary"  @click="submitFormLogin('formLogin')">登陆</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- registerForm -->
      <div class="loginBox">
        <el-dialog title="注册" :visible.sync="dialogFormVisible2">
          <el-form :model="formRegister" label-width="80px" status-icon :rules="rulesRegister" ref='formRegister' size='small'>
            <el-form-item label="用户" prop="userName">
              <el-input  placeholder="请输入用户名" v-model.trim="formRegister.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type='password' placeholder="请输入密码" v-model.trim="formRegister.password" autocomplete="off"></el-input>              
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" placeholder="请再次输入密码" v-model.trim="formRegister.checkPass" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size='small' style="width:100%;" type="primary" @click="submitFormRegister('formRegister')">注册</el-button>
          </div>
        </el-dialog>
      </div>
  </div>
</template>

<script>
  import {mapState, mapMutations } from 'vuex'
  export default {
    name:'login',
    data () {
      var validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else{
          callback()
        }
      };
       var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formRegister.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        // userName:"",
        // userId:"",
        dialogFormVisible: false,
        dialogFormVisible2: false,
        formLogin: {
          userName: '',
          password:''
        },
        formRegister: {
          userName: '',
          password:'',
          checkPass:''
        },
         rulesLogin: {
          userName: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
          password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
        },
         rulesRegister: {
          userName: [ { validator: validateName, trigger: 'blur' }],
          password: [{ validator: validatePass, trigger: 'blur' }],
          checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        }
      };
    },
    computed:{
      ...mapState(['userId','userName','token'])
    },
    methods: {
      ...mapMutations(['handleUserId','handleUserName','setToken']),
      //登陆
       submitFormLogin(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            this.$api.user.login(this.formLogin)
            .then((data)=>{
              // console.log(data)
              if(data.code===1){
                // this.$message.success('登陆成功！')
                // this.userName = data.data.userName
                // this.userId = data.data.userId
                // this.$_setCookie("userName",this.userName,1)             
                // this.$_setCookie("userId",this.userId,1)  
                // this.$store.commit('handleUserId')  
                // this.$store.commit('handleUserName')  


                // this.$root.Bus.$emit('userId',this.userId)
                this.$message.success('登陆成功！')

                //保存token
                const token = data.data.token
                localStorage.setItem('token',token)
                this.setToken(token)
                this.getUserInfo()


              }else if(data.code===300){
                this.$message.error('用户不存在！')
              }else if(data.code===301){
                this.$message.error('密码错误！')
              }
              })
          } else {
            return false;
          }
        });
      },
      //获取用户信息
      getUserInfo(){
        this.$api.user.getUserInfo()
        .then((data)=>{
          if(data.code == 1){
            // this.userName = data.data.userName
            // this.userId = data.data.userId
            // this.$_setCookie("userName",this.userName,1)             
            // this.$_setCookie("userId",this.userId,1)  
            // this.$store.commit('handleUserId')  
            // this.$store.commit('handleUserName')  
            this.handleUserId(data.data.userId)
            this.handleUserName(data.data.userName)
          }
        })
      },

      //注册
       submitFormRegister(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible2 = false
            this.$api.user.register({
              userName:this.formRegister.userName,
              password:this.formRegister.password,
            }).then((data)=>{
              console.log(data)
              if(data.code===1){
                this.$message.success('注册成功！') 
              }else if(data.code===300){
                this.$message.error('用户名已被注册！')                                
              }
            })
          } else {
            return false;
          }
        });
      },

       //退出登陆
      loginout(){
        // this.$_setCookie("userName",this.userName,0)
        // this.$_setCookie("userId",this.userId,0)
        // this.$store.commit('handleUserId')
        // this.$store.commit('handleUserName')
        // this.handleUserName(null)
        // this.handleUserId(null)
        this.setToken(null)
        localStorage.removeItem('token')
      },
      //检查是否已经登陆
      checkCookie(){
          let token = localStorage.getItem('token') 
          // var user= this.$_getCookie("userName");
          // var id= this.$_getCookie("userId");
          if (token) {
            // this.userName = user
            // this.userId = id
            // this.$store.commit('handleUserId')  
            // this.$store.commit('handleUserId')  
            // this.$root.Bus.$emit('userId',this.userId)
            this.setToken(token)  
            this.getUserInfo()
          }
      },

    },
    mounted(){
      this.checkCookie()
    }

  }

</script>
<style lang='less' scoped>
 .loginBox /deep/ .el-dialog{
      width: 400px!important;
      .el-dialog__body {
      padding: 20px 20px 0 20px;
      }
  }
.loginBox /deep/ .el-menu-item .myicon{
    margin-right: 10px;
    font-size: 20px;
    color: #eee;
  }
</style>