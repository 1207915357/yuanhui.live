<template>
  <div class="page401">
      <h3 class='title'>
          <p class="text"> 对不起！！！您没有权限....
                           you have no permission
          </p>
      </h3>
  </div>
</template>

<script>

  export default {
    name:'page401',
    data () {
      return {

      };
    },

    methods: {},

    mounted() {},

  }

</script>
<style lang='less' scoped>
    .title{
        color: #fff;
        padding-top: 50px;
        text-align: center;
        width: 200px;
        margin: 0 auto;
        overflow: hidden;
        .text{
            white-space: nowrap;
            animation: text-show 2s infinite steps(2) ;
        }
    }

    @keyframes text-show {
        to {
            margin-left: -410px
        }
    }
</style>