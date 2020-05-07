<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <div class="el-submenu__title el-menu-item" id="menu-title">
      <span class="title__sider-title is-active">{{logo}}</span>
    </div>
    <el-menu class="menu-font" router :default-active="this.$route.path">
      <el-menu-item :index="myMenu.path" v-for="myMenu in noChildren" :key="myMenu.path">
        <i :class="myMenu.icon"></i>
        <span slot="title">{{myMenu.name}}</span>
      </el-menu-item>
      <el-submenu :index="subMenu.path" v-for="subMenu in hasChildren" :key="subMenu.name">
        <template
          slot="title"
          v-if="subMenu.children.length !== undefined || subMenu.children.length > 0">
          <i :class="subMenu.icon"></i>
          {{subMenu.name}}
        </template>
        <el-menu-item-group
          v-if="subMenu.children.length !== undefined && subMenu.children.length > 0"
        >
          <el-menu-item
            :index="subSubMenu.path"
            v-for="subSubMenu in subMenu.children"
            :key="subSubMenu.name"
          >{{subSubMenu.name}}</el-menu-item>
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
      myMenuList:[],
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
  methods: {
    
  },
  created() {},
  mounted() {
    let role_id=1;
    let paramsPkg = {
      fun: "/getMenuList",
      method:"get",
      data:{
        roleId: role_id
      }
    };
    this.$store.dispatch('getHttpData',{paramsPkg}).then((json)=>{
			if (json == "") {
                return;
            }
			if(json.code=="200"){
				let v = json.data;
				this.myMenuList = v;
			} else {
				if (json.code != '200') {
          if(json.errorMessage !==""){
            this.$message.error(json.errorMessage);
          }else{
            this.$message.error("获取菜单栏失败，请联系管理员");
          }
					
				}
			}
		});
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