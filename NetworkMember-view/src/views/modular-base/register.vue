<template>
    <div class="register login">
        注册页面
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
<style >

</style>