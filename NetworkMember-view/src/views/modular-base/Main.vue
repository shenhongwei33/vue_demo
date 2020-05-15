<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <side-menu :menu-list="menuList" @select="turnToPage"></side-menu>
    <el-container style="flex-direction: column;">
      <main-header @person="turnToPerson"></main-header>
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import sideMenu from "../../components/side-menu/side-menu";
import mainHeader from "../../components/main-header/main-header";
import Cookies from "js-cookie";
import { mapGetters } from "vuex";
export default {
  name: "Main",
  data() {
    return {
      logo: "系统"
    };
  },
  methods: {
    initPage() {
      this.menuListAll();
      //初始化设置标签导航
      this.$store.dispatch("setBreadCrumb", this.$route.matched);
    },
    //获取菜单
    menuListAll() {
      let role_id = 1;
      let paramsPkg = {
        fun: "/getMenuList",
        method: "get",
        data: {
          roleId: role_id
        }
      };
      this.$store.dispatch("getMenuListSQL", { paramsPkg }).then(json => {});
    },
    //页面跳转
    turnToPage(route) {
      let routePath = "";
      if (typeof route === "string") {
        routePath = route;
        this.$router.push({ path: routePath });
      } else {
        params = route.params;
        query = route.query;
        path = route.path;
        this.$router.push({
          path,
          params,
          query
        });
      }
    },
    turnToPerson(){
      this.turnToPage('/userManagement');
    }
  },
  components: {
    "side-menu": sideMenu,
    "main-header": mainHeader
  },
  computed: {
    loading() {
      return this.$store.state.loadingState;
    },
    userName() {
      return localStorage.userName;
    },
    ...mapGetters({
      menuList: "getMenuList"
    })
  },
  mounted() {
    if (!Cookies.get("wdp-iam-cookie")) {
      this.$router.push({
        name: "login"
      });
    } else {
      this.initPage();
    }
  },
  watch: {
    $route(newRoute) {
      this.$store.dispatch("setBreadCrumb", this.$route.matched);

      // this.$store.dispatch(
      //   "setTagNavList",
      //   getNewTagList(this.tagNavList, newRoute)
      // );
    },
    collapsed() {
      this.$store.dispatch("getCollapsed", this.collapsed);
    }
  }
};
</script>
<style scoped>
.el-header,
.el-footer {
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
.el-container {
  height: 100%;
  padding: 0;
  margin: 0;
  width: 100%;
}
#menu-title {
  height: 60px;
  font-weight: bold;
}
.main-content-header {
  overflow: visible;
  background-color: rgb(238, 241, 246);
  text-align: left;
  padding: 10px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-breadcrumb {
  line-height: 60px;
  color: black;
}
.el-breadcrumb__separator {
  color: #606266;
}
</style>