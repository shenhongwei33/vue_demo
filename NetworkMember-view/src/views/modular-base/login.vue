<template>
  <div class="login-box">
    <h3 class="login-title">欢迎登录</h3>
    <el-form ref="form" :model="form" :rules="rules" label-width="60px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
          auto-complete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item class="buttom-box">
        <el-button type="primary" @click="submitForm('form')" class="button-style">登录</el-button>
        <el-button @click="resetForm('form')" class="button-style" style="margin-left:100px">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onReset(formName) {
      this.$refs[formName].resetFields();
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
}

.login-title {
  text-align: center;
}

.button-box {
  margin: 0px;
}

.button-style {
  position: relative;
  left: -20px;
}
</style>