import { getBreadCrumbList, setTagNavListInLocalstorage, getMenuByRouter, getTagNavListFromLocalstorage, getHomeRoute, routeHasExist } from '../../libs/util.js'
import * as types from '../mutation-types.js';
import {pageRouter} from '../../router/pageRouter.js'
const state={
    //打开页面地址
    breadCrumbList: [],
    //导航栏
    tagNavList: [],
    homeRoute: {"path":"/home","name":"home","meta":{"title":"首页",}},
    //默认语言中文
    local: "zh-CN",
    /*
     *菜单 by 在F5刷新的时候左侧导航不会落焦点，
     *所以默认的时候给初始所有路由的值,前端在做效果的时候先隐藏菜单，
     *等数据获取后再显示
     */
    menuList:pageRouter,
    //加载状态
    loadingState:false,
    //超时状态
    timeOut:false,
    //菜单状态
    collapsed: false,
    loginName:"",
   
}

const mutations={
    //标签导航
    [types.SET_BREADCRUMB] (state, routeMetched) {
		state.breadCrumbList = getBreadCrumbList(routeMetched, state.homeRoute)
    },
    //面包屑导航
    [types.SET_TAGNAV_LIST] (state, list) {
        if (list) {
            state.tagNavList = [...list];
            setTagNavListInLocalstorage([...list]);
        } else {
        	state.tagNavList = getTagNavListFromLocalstorage()
        }
    },
    //加载首页
    [types.SET_TAG] (state, { route, type = 'unshift' }) {
		if (!routeHasExist(state.tagNavList, route)) {
			if (type === 'push'){
				state.tagNavList.push(route)
			} 
			else {
				if (route.name === 'home'){
					state.tagNavList.unshift(route)
				} 
				else{
					state.tagNavList.splice(1, 0, route)
				} 
			}
			setTagNavListInLocalstorage([...state.tagNavList])
		}
    },
    //设置菜单
    [types.SET_MENU_LIST] (state, data) {
        state.menuList=[];
        state.menuList = data;
    },
    //设置加载状态
    [types.LOADING_STATE](state,data){
        state.loadingState=data
    },
    //设置超时状态
    [types.TIME_OUT](state,data){
        if(state.timeOut != data)
        state.timeOut=data
    },
    //设置菜单状态
    [types.SET_COLLAPSED](state,data) {
		state.collapsed = data
    },
}

export default {
    state,
    mutations
}
