import * as types from './mutation-types';
import { getBreadCrumbList, setTagNavListInLocalstorage,getTagNavListFromLocalstorage, routeHasExist } from '../libs/util.js'


export default {
  //设置用户名
  [types.SET_USERNAME](state, { userName }) {
    state.userName = userName;
  },
  //设置角色code
  [types.SET_ROLECODE](state, {
    roleCode
  }) {
    state.roleCode = roleCode;
  },
  //设置权限列表
  [types.SET_PERMISSIONS](state, {
    permissions
  }) {
    state.permissions = permissions;
  },

  //标签导航
  [types.SET_BREADCRUMB](state, routeMetched) {
    state.breadCrumbList = getBreadCrumbList(routeMetched, state.homeRoute)
  },
  //面包屑导航
  [types.SET_TAGNAV_LIST](state, list) {
    if (list) {
      state.tagNavList = [...list];
      setTagNavListInLocalstorage([...list]);
    } else {
      state.tagNavList = getTagNavListFromLocalstorage()
    }
  },
  //加载首页
  [types.SET_TAG](state, { route, type = 'unshift' }) {
    if (!routeHasExist(state.tagNavList, route)) {
      if (type === 'push') {
        state.tagNavList.push(route)
      }
      else {
        if (route.name === 'home') {
          state.tagNavList.unshift(route)
        }
        else {
          state.tagNavList.splice(1, 0, route)
        }
      }
      setTagNavListInLocalstorage([...state.tagNavList])
    }
  },
  //设置菜单
  [types.SET_MENU_LIST](state, data) {
    state.menuList = [];
    state.menuList = data;
  },
  //设置加载状态
  [types.LOADING_STATE](state, data) {
    state.loadingState = data
  },
  //设置超时状态
  [types.TIME_OUT](state, data) {
    if (state.timeOut != data)
      state.timeOut = data
  },
  //设置菜单状态
  [types.SET_COLLAPSED](state, data) {
    state.collapsed = data
  },
}