<template>
    <div class="register login">
        <div class="qrcodelogin-con">
            <div class="login_left">
                <div class="login_box">
                    <div class="titleTop">
                        <img :src="$config.oemOBJ[$config.buildOem].mainLogo" alt>
                    </div>
                    <span class="titleBottom">
                        {{`2019©${this.name}`}}
                    </span>
                </div>
            </div>

            <div class="login_right">
                <div class="loginBlock">
                    <div class="login">
                        <p class="spanbox">
                            <span>{{loginsessNew}}</span>
                            <span>{{loginsess}}</span>
                        </p>
                        <div class="form-con">
                            <Form ref="loginForm" :model="registerForm" :rules="rules">
                                <FormItem :label="$t('commonPage.registerjiq')">
                                    <Input v-model="registerForm.machineCode" readonly> </Input>
                                </FormItem>

                                <FormItem prop="registrationCode" :label="$t('commonPage.registerzc')">
                                    <Input type="textarea" v-model="registerForm.registrationCode" @on-focus="inputFocus"></Input>
                                </FormItem>

                                <FormItem>
                                    <Button class="login_button" @click="signIn" type="primary" long>{{$t("commonPage.autho")}}</Button>
                                </FormItem>
                            </Form>
                            <div class="app-vesion">{{$config.version}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
//import Cookies from "js-cookie";
import {stringacg} from "../../libs/util.js"
export default {
    name: "register",
    components: {},
    data() {
        return {
            loginsess: "",
            loginsessNew:"",
            name: '',
            registerForm: {
                machineCode: "",
                registrationCode: ""
            },
            rules: {
                machineCode: [{ required: true, message: " ", trigger: "blur" }],
                registrationCode: [{ required: true, message: " ", trigger: "blur" }]
            },
            fastClick:true
        };
    },
    created() {},
    mounted() {  
        this.name = this.$config.oemOBJ[this.$config.buildOem].name.split('*')[0];
        if(this.$route.params.logingCode == "0101" || this.$route.params.logingCode == "0102"){
            this.loginsessNew = ""
            this.loginsess= this.$t("errorCode[" + this.$route.params.logingCode + "]");
        }
        let paramsPkg = {
            fun: "/license/getMachineCode",
        };
        this.$store.dispatch("getHttpData", { paramsPkg }).then(json => {
            if (json.code == "0000") {
                this.registerForm.machineCode = json.data.code
            } else {
                
            }
        });
    },
    
    activated() {},
    deactivated() {},
    methods: {	  
        //注册
        signIn() {
            if(!this.fastClick){
                return;
            }
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.fastClick=false;
                    let self = this;       
                    let paramsPkg = {
                        fun: "/license/sign",
                        data:{
                            signCode: stringacg(this.registerForm.registrationCode)
                        }
                    };
                    this.$store.dispatch("getHttpData", { paramsPkg }).then(json => { 
                        if (json.code == "0000") {
                            Cookies.set("wdp-iam-code","0208");
                            this.$router.push({name: "login" });
                        } else {
                            this.fastClick=true;
                            Cookies.remove("wdp-iam-code");
                            this.loginsessNew=""
                            this.loginsess = this.$t("errorCode[" + json.code + "]");                
                        }
                    });
                } else {
                  this.loginsess= ""
                  this.loginsessNew = this.$t("messagePage.machineEmpty");
                }
            });      
        },
        //输入框落入焦点的时候
        inputFocus(){
            this.loginsess = "";
            this.loginsessNew="";
        },
       
        // 检查License状态
        liceseState(){
            let paramsPkg = {
                fun: "/license",
            };
            this.$store.dispatch("getHttpData", { paramsPkg }).then(json => {		
                if (json == "") {
                    return;
                }
                if (json.code == "0000") {
                    Cookies.set("wdp-iam-code","0208");
                    this.$router.push({ name: "login"});
                } else {
                    Cookies.remove("wdp-iam-code","0208");        	
                }
            });
        },

    },
    computed: {
        
    },
    watch: {
        
    }

};
</script>
<style lang="less">
    @import "../../assets/styles/independenceStyle/login.less";

    .register {
        background-image: url("../../assets/images/registerBg.jpg");

        .form-con {
          padding: 1rem 0 0;
        }

        .ivu-input {
          width: 264px;
          height: 28px;
          background-color: #d2d2d2;
          border: 1px solid #000;
          border-radius: 2px;
        }

        .ivu-input:focus {
          outline: none;
          border: 1px solid #000;
          box-shadow: none;
        }

        .ivu-input:hover {
          border: 1px solid #000;
        }

        .ivu-form-item {
          margin-bottom: 6px;
        }

        textarea {
          width: 264px !important;
          height: 58px !important;
          background-color: transparent !important;
          resize: none;
          border: 1px solid #000;
        }

        .ivu-form-item-label {
          font-size: 18px;
        }

        .ivu-input[disabled],
        fieldset[disabled] .ivu-input .register .ivu-input {
          color: #000 !important;
        }

        .ivu-form-item-required .ivu-form-item-label:before {
          content: "";
        }

        .register_button {
          width: 266px;
          height: 52px;
          font-size: 18px;
        }
        .app-vesion{
            font-size: 12px;
            font-weight: bolder;
            width: 100%;
            padding-top: 6px;
            text-align: right;
        }
    }
</style>