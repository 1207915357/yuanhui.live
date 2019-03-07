<template>
  <div class="emojiBox">
    <span class="emo-btn" @click='showEmojiBox = true'>表情</span>
    <picker v-show='showEmojiBox' set="emojione" @select="selectEmoji" />
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
            console.log(this.$el.contains(e.target));
            if (!this.$el.contains(e.target)){
                this.showEmojiBox = false; 
            }
        })
     }, 
    methods: {
         selectEmoji(emoji){
            // console.log(emoji,'emoji')
            this.$parent.top_formBoxVal += emoji.native;
        },
    },

    mounted() {},

  }

</script>
<style lang='less' scoped>
    .emo-btn{
      display: block;
      width: 50px; 
      cursor: pointer; 
    }
</style>