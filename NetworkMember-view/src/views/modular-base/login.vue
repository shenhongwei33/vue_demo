<template>
    
</template>
<script>
export default {
    name: "qrcodelogin",
    data() {
        return {
            errorMsg: "",
            errorMsgNew: "",
            form: {
                userCode: "",
                userPass: ""
            },
            codeError: "",
            name:"",
            verifyModel:false,
            text: '＞＞＞＞＞＞',
            UUID:"",
            verifyErr:0, //记录错误的次数
        };
    },
    mounted() {
        
    },
    methods: {
       
    },
    computed: {
       
    },
    watch: {
       
    }
};
</script>
<style scoped>


</style>