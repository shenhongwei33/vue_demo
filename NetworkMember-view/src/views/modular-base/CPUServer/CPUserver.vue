<template>
  <div id="CPUServer" class="rowStyle"></div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
// 引入饼图组件
require("echarts/lib/chart/pie");
// 引入提示框和图例组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
export default {
  name: "CPUServer",
  components: {},
  props: {},
  data() {
    return {
        nameList:[],
        allData:[]
    };
  },
  watch: {},
  computed: {},
  methods: {
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var cpuChart = echarts.init(document.getElementById("CPUServer"));
      // 绘制图表
      cpuChart.setOption({
        title: {
          text: "某站点用户访问来源", //主标题
          subtext: "纯属虚构", //副标题
          x: "left" //x轴方向对齐方式
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          bottom: "bottom",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  },
  created() {},
  mounted() {
      this.initData();
  }
};
</script>
<style scoped>
.rowStyle {
  height: 300px;
}
</style>