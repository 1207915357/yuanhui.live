<template>
  <div id="login">
      <div class="userbox">
          <div class="loginBtn" v-if='!userName'>
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
        userName:"",
        userId:"",
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
    methods: {
     
      //登陆
       submitFormLogin(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            this.$api.user.login(this.formLogin)
            .then((data)=>{
              console.log(data)
              if(data.code===1){
                this.$message.success('登陆成功！')
                this.userName = data.data.userName
                this.userId = data.data.userId
                this.setCookie("userName",this.userName,1)             
                this.setCookie("userId",this.userId,1)             
                // this.$root.Bus.$emit('userId',this.userId)
                // console.log(this.$root,'root')
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
                this.userName = data.data.userName;  
                this.userId = data.data.userId;  
                this.setCookie("userName",userName,1)             
                this.setCookie("userId",userId,1)    
                // this.$root.Bus.$emit('userId',this.userId)

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
        this.setCookie("userName",this.userName,0)
        this.setCookie("userId",this.userId,0)
        this.userName = ''
      },
      //检查是否已经登陆
      checkCookie(){
          var user= this.getCookie("userName");
          var id= this.getCookie("userId");
          if (user) {
            this.userName = user
            this.userId = id
            // this.$root.Bus.$emit('userId',this.userId)
          }
      },
      
      setCookie(cname,cvalue,exdays){
          var d = new Date();
          d.setTime(d.getTime()+(exdays*24*60*60*1000));
          var expires = "expires="+d.toGMTString();
          document.cookie = cname+"="+cvalue+"; "+expires;
      },

      // getCookie(cname){
      //     var name = cname + "=";
      //     var ca = document.cookie.split(';');
      //     for(var i=0; i<ca.length; i++) {
      //         var c = ca[i].trim();
      //         if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
      //     }
      //     return "";
      // }

    },
    mounted(){
      this.checkCookie()
    }

  }

</script>
<style lang='less' scoped>
 
</style>