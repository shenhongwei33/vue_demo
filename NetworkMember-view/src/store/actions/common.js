﻿import * as types from '../mutation-types.js';
import {requestHelp,getRequestHelp} from './ajaxUtil.js';
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
		return getRequestHelp({paramsPkg}, commit).then((json)=>{
		 	return new Promise(function(resolve,reject){
				commit(types.SET_MENU_LIST,json.data);
		 		resolve("");
		 	})
		}).catch((error)=>{
		 	return Promise.resolve("Error");
		 })
	},
	//通用get后台接口方法
	getHttpData:({commit},{paramsPkg})=>{
		return getRequestHelp({paramsPkg}, commit).then((json) => {
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
	//通用后台接口方法
	notGetHttpData: ({ commit }, { paramsPkg }) => {
		return requestHelp({ paramsPkg }, commit).then((json) => {
			return new Promise(function (resolve, reject) {
				if (json.code == "4002") {
					window.vueModel.$Message.error(json.message);
					resolve({ code: "9090" })
				} else {
					resolve(json);
				}
			})
		}).catch((error) => {
			return Promise.resolve({ code: "9999" });
		});
	},
	//返回用户当前对应的菜单信息
	getMenus:({state})=>{
		return new Promise(function(resolve){
	 		resolve(state.menuList);	
		})
	},
	//获取用户名
	getUserName:({commit,state}) => {
		//发送异步ajax请求
		
		//提交一个mutation
	}

}



