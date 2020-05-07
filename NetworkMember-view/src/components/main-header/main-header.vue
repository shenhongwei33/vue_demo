<template>
  <el-header style="text-align: right; font-size: 12px">
      <el-col :span="12">
        <custom-bread-crumb :list="breadCrumbList"></custom-bread-crumb>
      </el-col>
      <el-col :span="12">
        <user-crumb></user-crumb>
      </el-col>
  </el-header>
</template>

<script>
import customBreadCrumb from "./custom-bread-crumb/custom-bread-crub";
import userCrumb from "./user-crumb/user-crumb";
export default {
  components: {
    customBreadCrumb,
    userCrumb
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    breadCrumbList() {
      return this.$store.state.breadCrumbList;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>