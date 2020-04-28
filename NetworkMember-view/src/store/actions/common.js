import * as types from '../mutation-types.js';
import {requestHelp} from './ajaxUtil.js';
//提取公共的action
export const commonAction = {
	//登录超时展示遮罩
	setTimeOut:({commit})=>{
		commit(types.TIME_OUT,false);
   },
	//面包屑导航
	setTagNavList:({commit},list)=>{
		 commit(types.SET_TAGNAV_LIST,list);
	},
	//加载首页
	setTag : ({commit},{route}) => {
		commit(types.SET_TAG,{route});
	},
	setBreadCrumb:({commit},data)=>{
		 commit(types.SET_BREADCRUMB,data);
	},
	//从后台拉取菜单数据
	getMenuListSQL:({commit},{paramsPkg})=>{
		 return requestHelp({paramsPkg}, commit).then((json)=>{
		 	return new Promise(function(resolve,reject){
				commit(types.SET_MENU_LIST,json.data.menuList);
		 		resolve("");
		 	})
		}).catch((error)=>{
		 	return Promise.resolve("Error");
		 })
	},

	//获取密码是否需要修改
	changePasswordAmend:({commit},{paramsPkg})=>{
		return requestHelp({paramsPkg}, commit).then((json) => {
			return new Promise(function(resolve,reject){
				if(json!="error"){
					resolve(json);
				}else{
					resolve("");
				}
			})
		}).catch((error) => {
			return Promise.resolve("");
		});
	},
	//控制导航缩进状态
	getCollapsed:({commit},data)=>{
		return new Promise(function(resolve){
			commit(types.SET_COLLAPSED,data);
	 		resolve();	
		})
	},
	//通用后台接口方法
	getHttpData:({commit},{paramsPkg})=>{
		return requestHelp({paramsPkg}, commit).then((json) => {
			return new Promise(function(resolve,reject){
				if (json.code == "4002") {                            
					window.vueModel.$Message.error(json.message);  
					resolve({code:"9090"})
				} else {
					resolve(json);
				}
			})
		}).catch((error) => {
			return Promise.resolve({code:"9999"});
		});
	},
	//返回用户当前对应的菜单信息
	getUserInfo:({state})=>{
		return new Promise(function(resolve){
	 		resolve(state.com.menuList);	
		})
	},

}



