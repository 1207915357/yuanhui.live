<template>
  <div class="lifeBox">
    <div class="youku" id="youkuplayer" ></div>
  </div>
</template>

<script>
  import '@/assets/js/youku.js'
  export default {
    
    name:'lifeBox',
    data () {
      return {

      };
    },

    methods: {},

    mounted() {
       var player = new YKU.Player('youkuplayer', {
          styleid: '0',
          client_id: 'd680ac576cf726e5',
          vid: 'XMjkwMDM5NjQ3Ng',
          newPlayer: true
      });

    }


  }
</script>
<style lang='less' scoped>
  .youku{
    width:350px;
    height:200px;
  }
</style>