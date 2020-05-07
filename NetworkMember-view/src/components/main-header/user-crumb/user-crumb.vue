<template>
  <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
             {{userName}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item divided @click.native="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>       
</template>

<script>
import { getAESDecrypt } from "../../../libs/secret.js";
import Cookies from "js-cookie";
export default {
  name:"userCrumb",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    userName() {
      return localStorage.userName;
    }
  },
  methods: {
      logOut() {
      let paramsPkg = {
        fun: getAESDecrypt("7NgoYWZwF786ew=="),
        method: "post"
      };
      this.$store.dispatch("getHttpData", { paramsPkg }).then(json => {
        if (json.code == "200") {
          Cookies.remove("wdp-iam-cookie");
          this.$router.push({
            name: "login"
          });
        } else {
          if (json.code != "9090") {
            this.$message.error("错了哦，这是一条错误消息");
          }
        }
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>