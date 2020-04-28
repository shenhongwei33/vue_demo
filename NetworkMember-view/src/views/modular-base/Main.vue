<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <side-menu></side-menu>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main class="main-content-header"> 
        <span>haha</span>
        <span>/</span>
        <span>wefdf</span>
      </el-main>
      <el-main class="main-content"> 
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </el-main>
	  <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>
</template>
<script>
import sideMenu from '../../components/side-menu/side-menu'
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
    tableData: Array(20).fill(item),
    logo:'系统'
    };
  },
  methods:{
	  
  },
  components:{
    'side-menu':sideMenu
  }
}
</script>
<style scoped>
.el-header, .el-footer {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  height: 100vh;
}
.main-content {
  min-height: calc(100vh - 55px);
  padding: 0;
  margin: 0;
  width: 100%;
}
.el-container{height:100%;padding:0;margin:0;width:100%;}
#menu-title{height: 60px;font-weight: bold;}
.main-content-header{overflow: visible;background-color: rgb(238, 241, 246);text-align: left;padding: 10px;}
</style>