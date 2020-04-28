<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <div class="el-submenu__title el-menu-item" id="menu-title">
      <span class="title__sider-title is-active">{{logo}}</span>
    </div>
    <el-menu class="menu-font">
      <el-menu-item :index="myMenu.path" v-for="myMenu in noChildren" :key="myMenu.path">
        <i :class="myMenu.icon"></i>
        <span slot="title">{{myMenu.name}}</span>
      </el-menu-item>
      <el-submenu :index="myMenu.path" v-for="myMenu in hasChildren" :key="myMenu.name">
        <template
          slot="title"
          v-if="myMenu.children.length !== undefined || myMenu.children.length > 0">
          <i :class="myMenu.icon"></i>
          {{myMenu.name}}
        </template>
        <el-menu-item-group
          v-if="myMenu.children.length !== undefined && myMenu.children.length > 0"
        >
          <el-menu-item
            :index="subMenu.path"
            v-for="subMenu in myMenu.children"
            :key="subMenu.name"
          >{{subMenu.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import { menuList } from "../../store/actions/textData/menuList.js";
import config from '../../config/index'
export default {
  components: {},
  props: {},
  data() {
    return {
      myMenuList: [
        {
          //系统管理
          path: "/systemManagement",
          name: "首页信息",
          icon: "el-icon-s-grid",
          children: []
        },
        {
          //计划管理
          path: "/planManagement",
          name: "计划管理",
          icon: "el-icon-time",
          children: [
            {
              //任务计划
              path: "taskPlanning",
              name: "任务计划",
              icon: ""
            }
          ]
        },
        {
          //数据备份
          path: "/backUp",
          name: "备份管理",
          icon: "el-icon-files",
          children: [
            {
              //数据库
              path: "backUpDB",
              name: "数据库",
              icon: ""
            },
            {
              //传统文件系统
              path: "traditionalFileSystem",
              name: "传统文件系统",
              icon: ""
            },
            {
              //开放数据源
              path: "openSataSource",
              name: "开放数据源",
              icon: ""
            },
            {
              //虚拟化
              path: "virtualization",
              name: "虚拟化",
              icon: ""
            }
          ]
        }
      ],
      logo: config.oemOBJ.mysoft.title
    };
  },
  watch: {},
  computed: {
    noChildren() {
      return this.myMenuList.filter(item => (item.children.length===undefined || item.children.length===0));
    },
    hasChildren() {
      return this.myMenuList.filter(item => !(item.children.length===undefined || item.children.length===0));
    }
  },
  methods: {},
  created() {},
  mounted() {
    console.log(this.hasChildren);
  }
};
</script>
<style scoped>
.el-aside {
  color: #333;
  height: 100vh;
}
#menu-title {
  height: 60px;
  font-weight: bold;
}
.menu-font{
    text-align: left;
}
</style>