<template>
  <div :style="{height:topHeight}" class="backgroundSet">
    <div class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model.trim="form.name" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model.trim="form.password"
            placeholder="请输入密码"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" class="button-style">登录</el-button>
          <el-button @click="onReset('form')" class="button-style" style="margin-left:100px">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { getRSA } from "../../libs/secret.js";
import {reqUrl} from '../../store/actions/ajaxUtil.js';
export default {
  data() {
    //自定义密码校验
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
    return {
      form: {
        name: "",
        password: "",
        checkPass:''
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 32, message: "长度在 3 到 32 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      },
      windowHeight: "",
      topHeight: ""
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //认证通过
          let psw = getRSA(this.form.password);
            let name = this.form.name; 
            let paramsPkg = {
                fun: "/login",
                method:"post",
                data: {
                    userName: name,
                    password: psw,
                }
            };
            this.$store.dispatch("notGetHttpData", { paramsPkg }).then(json => {
                if (json.code == "200") {
                    var inFifteenMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);
                     Cookies.set("wdp-iam-cookie", json.data.token,{expires: inFifteenMinutes});
                     localStorage.userName = name;
                    // localStorage.userID = json.data.userId;
                    // localStorage.tagNaveList = "";               
                    this.$router.push({
                        name: "home"
                    });
                }
                else {
                    //console.log(json);
                }
            });
        } else {
          return false;
        }
      });
    },
    onReset(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.windowHeight = window.innerHeight; // 浏览器可见区域高度
    this.topHeight =this.windowHeight +"px"; // 浏览器可见区域高度
    window.onresize = () => {
      return (() => {
        this.windowHeight = window.innerHeight;
        this.topHeight = this.windowHeight + "px";
      })();
    };
  },
  watch: {
    topHeight(val) {
      this.topHeight = val;
    }
  }
};
</script>
<style scoped>
.login-box {
  width: 400px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -200px 0 0 -210px;
  padding: 20px 40px 20px 30px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  box-shadow: 0 2px 4px #dcdfe6;
  background-color: #FFFFFF;
}

.login-title {
  text-align: center;
}

.button-style {
  position: relative;
  left: -20px;
  top: 20px;
}

.backgroundSet{
  background-image: url(../../assets/images/loginBg1.jpg);
  
}
</style>