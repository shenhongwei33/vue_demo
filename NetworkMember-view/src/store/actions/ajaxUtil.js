import config from '../../config/index.js';
import Cookies from 'js-cookie';
import axios from 'axios';
import * as types from '../mutation-types.js'
axios.defaults.withCredentials=true;
//创建axios实例
let instance = axios.create();

//开发环境默认采用代理方式，/api映射在根目录下config/index.js中的target
let requestUrl="";
//切换到生产环境采用真实的地址，跨域需要后台去解决
if(process.env.NODE_ENV == 'production'){
	requestUrl=window.location.origin+"/interface/restful";
}else{
	requestUrl=config.dev_requestUrl;
}

//requestUrl=config.dev_requestUrl;

//paramsPkg 四个参数
/*
*fun 方法名(必填)
*responseType 参数类型 json  blob (非必填)
*templateName 下载文件是传入的文件名(非必填)
*data 传入参数(必填)
*headers 上传文件请求头(非必填)
*/
// filterAddresses 过滤不需要遮罩层的一些请求以防加载时间过长
let filterAddresses = ["/login"];
export const requestHelp = ({paramsPkg}, commit) => {
	if(!filterAddresses.includes(paramsPkg.fun)){
		commit(types.LOADING_STATE,true);
	}
	return new Promise(function(resolve,reject){
		instance({
			method:"post",
			url:requestUrl+paramsPkg.fun,
			responseType:paramsPkg.responseType?paramsPkg.responseType:"json",
			data:paramsPkg.data?paramsPkg.data:{},
			headers:{
				'Content-Type':paramsPkg.headers?paramsPkg.headers:"application/json",
				"key":"bcbu",
				"token":Cookies.get("wdp-iam-cookie")?Cookies.get("wdp-iam-cookie"):""
			},
			timeout:1000*60*10
		}).then(response =>{
			commit(types.LOADING_STATE,false);
			let status=response.status;
			if(status>=200 && status<=300){
				//判断，如果不是登录页面，授权页面，其他页面如果直接提示登录超时,则退出登录
				if(response.data.code=="9090" && (window.vueModel.$route.name!="login" || window.vueModel.$route.name!="register")){
					commit(types.TIME_OUT,true);
					resolve({code:"9090"});
				}else{
					resolve(response.data);
				}
				
			}else{
				//window.vueModel.$router.push({name:"error-500"})
				resolve({code:"9980"});
			}

		}).catch((error)=>{ 
			commit(types.LOADING_STATE,false);
			//window.vueModel.$router.push({name:"error-500"})
			resolve({code:"9980"});
		})
	});
}


//paramsPkg 四个参数
/*
*fun 方法名(必填)
*responseType 参数类型 json  blob (非必填)
*templateName 下载文件是传入的文件名(非必填)
*data 传入参数(必填)
*headers 上传文件请求头(非必填)
*/
export const requestHelps = (paramsPkgs, commit) => {
	let list= [];
	paramsPkgs.map((item)=>{
		list.push(createAxions(item));
	})
	return new Promise(function(resolve,reject){
		axios.all(list).then(axios.spread(function(data1={},data2={},data3={},data4={},data5={},data6={},data7={},data8={}){
			resolve({
				data1,
				data2,
				data3,
				data4,
				data5,
				data6,
				data7,
				data8
			});
		})
		).catch();
	});
}

const createAxions = (pkg)=>{
	return axios.post(requestUrl+pkg.fun, {timeout:1000*60*10});
}

//添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error.response.status);
});
