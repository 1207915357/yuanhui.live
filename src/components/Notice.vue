<!--通知模块-->
<template>
  <div class="notice">

    <div class="noticeIcon"  @click="dialogVisible = true">
        <el-badge :value='2' class="notice-badge">
            <i class="iconfont icon-youjian"></i>
        </el-badge>
    </div>

    <el-dialog
    title="通知"
    :visible.sync="dialogVisible"
    width="60%">

    <div>这是一段信息</div>
    <div>这是一段信息</div>
    <div>这是一段信息</div>
    <div>这是一段信息</div>

    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false">已 读</el-button>
    </span>
    </el-dialog>

  </div>
</template>

<script>

  export default {
    name:'notice',
    data () {
      return {
          dialogVisible: false
      };
    },

    methods: {},

     methods: {
      // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      // }
    }

  }

</script>
<style lang='less' scoped>
.notice{
    display: inline-block;
    position: absolute;
    top: 18px;
    right: 120px;
    .notice-badge{
        cursor: pointer;
        i{
            color: #fff;
            font-size: 22px;
        }
    }
}
</style>