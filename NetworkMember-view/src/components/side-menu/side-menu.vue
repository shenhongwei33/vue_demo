<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <div class="el-submenu__title el-menu-item" id="menu-title">
      <router-link to="/home">
        <span class="title__sider-title is-active logo">{{logo}}</span>
      </router-link>
    </div>
    <el-menu class="menu-font" router :default-active="this.$route.path" @select="handleSelect">
      <el-menu-item :index="myMenu.path" v-for="myMenu in noChildren" :key="myMenu.path">
        <i :class="myMenu.icon"></i>
        <span slot="title">{{showTitle(myMenu)}}</span>
      </el-menu-item>
      <el-submenu :index="subMenu.path" v-for="subMenu in hasChildren" :key="subMenu.name">
        <template
          slot="title"
          v-if="subMenu.children.length !== undefined || subMenu.children.length > 0">
          <i :class="subMenu.icon"></i>
          {{showTitle(subMenu)}}
        </template>
        <el-menu-item-group
          v-if="subMenu.children.length !== undefined && subMenu.children.length > 0">
          <el-menu-item
            :index="subSubMenu.path"
            v-for="subSubMenu in subMenu.children"
            :key="subSubMenu.name"
          >{{showTitle(subSubMenu)}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import config from "../../config/index";
export default {
  components: {},
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
  },
  data() {
    return {
      myMenuList: [],
      logo: config.oemOBJ.mysoft.title
    };
  },
  watch: {
    menuList(newMenu){
      this.myMenuList=newMenu;
    }
  },
  computed: {
    noChildren() {
      return this.myMenuList.filter(
        item => item.children.length === undefined || item.children.length === 0
      );
    },
    hasChildren() {
      return this.myMenuList.filter(
        item =>
          !(item.children.length === undefined || item.children.length === 0)
      );
    }
  },
  methods: {
    showTitle (item) {
      return this.$t(item.name);
    },
    handleSelect (name) {
      this.$emit('select', name);
    },
  },
  created() {},
  mounted() {
    
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
.menu-font {
  text-align: left;
}
a {
  text-decoration: none;
  color: #303133;
}

.router-link-active {
  text-decoration: none;
  color: #303133;
}
</style>