<template>
  <div class="emojiBox">
    <i class="emo-btn iconfont icon-biaoqing-copy-copy-copy" @click='showEmojiBox = true'></i>
    <picker v-if='showEmojiBox' 
            :native='true'
            :include="emojiConfig"
            :showSkinTones='false'
            :sheetSize="16"
            :showSearch="false"
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
          emojiConfig:[
                "recent",
                "people"
          ]
      };
    },
     created(){
          // 点击其他不在的区域触发事件
        document.addEventListener('click', (e) => {
            if (!this.$el.contains(e.target)){
                this.showEmojiBox = false; 
            }
        })
     }, 
    methods: {
         selectEmoji(emoji){
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