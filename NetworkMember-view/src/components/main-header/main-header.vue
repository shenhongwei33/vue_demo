<template>
  <el-header style="text-align: right; font-size: 12px">
      <el-col :span="12">
        <custom-bread-crumb :list="breadCrumbList"></custom-bread-crumb>
      </el-col>
      <el-col :span="12">
        <user-crumb @personal="toPerson"></user-crumb>
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
  methods: {
    toPerson(){
      this.$emit('person');
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>