<template>
  <div id="app" v-loading="loading">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Cookies from "js-cookie";
export default {
  name: 'App',
  components:{

  },
  mounted() {
    /*区分关闭和刷新，关闭退出登录 start*/
    window.onload = function() {
      if (!window.sessionStorage["ISlogin"]) {
        Cookies.remove("wdp-iam-cookie");
        location.reload(); //不能省，强制跳到登陆页
      } else {
        window.sessionStorage.removeItem("ISlogin");
      }
    };
    window.onunload = function() {
      window.sessionStorage["ISlogin"] = true;
    };
    window.onbeforeunload = function() {
      window.sessionStorage["ISlogin"] = true;
    };
  },
  computed:{
    loading(){
      return this.$store.state.loadingState;
    }
  },
  watch:{
        timeOut(){
            if(!this.timeOut){
                return;
            }
             Cookies.remove("wdp-iam-cookie");
                this.$store.dispatch("setTimeOut");
                this.$router.push({
                    name: "login"
            });
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  width:100%;height: 100%;
  overflow: visible;
}
#app>div[data-v-a8a45aac]{width:100%;height: 100%;}
</style>

<style>
body,html{
  margin: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
