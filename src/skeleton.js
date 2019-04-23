import Vue from 'vue';
import Skeleton from '@views/other/Skeleton.vue';

export default new Vue({
  components: {
    Skeleton,
  },
  render: h => h(Skeleton),
});