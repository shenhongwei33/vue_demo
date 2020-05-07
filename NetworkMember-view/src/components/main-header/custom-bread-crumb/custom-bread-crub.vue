<template>
    <el-breadcrumb separator="/">
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
<style scoped>
.el-breadcrumb{
  line-height: 60px;
  color: black;
}
</style>