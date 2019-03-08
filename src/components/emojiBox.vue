<template>
  <div class="emojiBox">
    <i class="emo-btn iconfont icon-biaoqing-copy-copy-copy" @click='showEmojiBox = true'></i>
    <picker v-show='showEmojiBox' 
            set="apple" 
            :showSkinTones='false'
            title='Welcome to yuanhui.live'
            @select="selectEmoji" />
  </div>
</template>

<script>
  //表情包插件
  import {Picker} from 'emoji-mart-vue'
  export default {
    name:'emojiBox',
     components:{
        Picker,
    },
    data () {
      return {
          showEmojiBox:false,
      };
    },
     created(){
          // 点击其他不在的区域触发事件
        document.addEventListener('click', (e) => {
            // console.log(e,this.$el)
            // console.log(this.$el.contains(e.target));
            if (!this.$el.contains(e.target)){
                this.showEmojiBox = false; 
            }
        })
     }, 
    methods: {
         selectEmoji(emoji){
            // console.log(emoji,'emoji')
            this.$emit("getEmoji" , emoji.native) ;
        },
    },

    mounted() {},

  }

</script>
<style lang='less' scoped>
    .emo-btn{
      cursor: pointer; 
      display: inline-block;
      padding: 0 5px 5px;
      font-size: 25px;
      color: #409eff;
    }
</style>