<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in list" :to="item.to" :key="`bread-crumb-${item.name}`">{{showTitle(item)}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
import { showTitle} from '../../../libs/util'
export default {
  name:"customBreadCrumb",
  components: {},
  props: {
      list:{
        type: Array,
		default: () => []
      }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
      showTitle (item) {
			return showTitle(item, this)
		},
  },
  created() {},
  mounted() {}
};
</script>
<style>
.el-breadcrumb{
  line-height: 60px;
  color: #606266;
}
.el-breadcrumb__inner {
  color: #606266
} 
.el-icon-arrow-right{
  color: #606266
}
.el-breadcrumb__separator[class*=icon]{
color: #606266
}
</style>