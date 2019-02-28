<template>
    <div class="about">
      <burst></burst>

      <pixels></pixels>
    </div>
</template>
<script>
  import burst from '@/components/mojs_burst.vue'
  import pixels from '@/components/pixels.vue'
  export default {
    name: "about",
    components:{
      burst,
      pixels
    },
    data() {
      return {
       
      };
    },
    methods: {
     
    }
  };

</script>

<style scoped lang="less">

</style>