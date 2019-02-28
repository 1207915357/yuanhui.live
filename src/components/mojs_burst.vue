<template>
    <div class="burst">
        <div id="wrapper">
            <div class="cssans cssans--center">
                <div class="cssans__accessible">yuanhui</div>
                <div class="cssans__word">
                    <b class="cssans:Y"></b>
                    <b class="cssans:u"></b>
                    <b class="cssans:a"></b>
                    <b class="cssans:n"></b>
                </div>
                <div class="cssans__word">
                    <b class="cssans:H"></b>
                    <b class="cssans:u"></b>
                    <b class="cssans:i"></b>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import mojs from 'mo-js'
  import '@/assets/css/cssans.css'
  export default {
    name: "burst",
    data() {
      return {
        colorArray : [
                '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
                '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
                '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
                '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
                '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
                '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
            ]
      };
    },
    methods: {
     
    },
    mounted() {
        const burst = new mojs.Burst({
            parent: document.getElementById('wrapper'),
            radius: { 500: 10 },
            duration: 4000,
            count: 200,
            children: {
                shape: 'polygon',
                points: 8,
                scale: { 'rand(0, 5)': 0 },
                fill: this.colorArray,
                angle: { 'rand(0, 360)': 'rand(0, 360)' },
                duration: 'rand(1000, 7000)',
                delay: 'rand(0, 2000)'
            },

            onComplete() {
                this.generate().replay();
            }

        }).replay();
    },
};

</script>

<style scoped lang="less">
.burst{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}

#wrapper {
  display:flex;
  justify-content:center;
  align-items:center;
  height:40vh;
  overflow: hidden;
}

.cssans__word {
  position: relative;
}
</style>