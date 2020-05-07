/**
 * 状态对象
 */
import {pageRouter} from '../router/pageRouter'
export default {
  userName: '',
  roleCode: '',
  permissions: [], //权限集合

  //打开页面地址
  breadCrumbList: [/* {name:'首页'} */],
  //导航栏
  tagNavList: [],
  homeRoute: {
    "path": "/home",
    "name": "home",
    "meta": {
      "title": "首页",
    }
  },
  //默认语言中文
  local: "zh-CN",
  /*
   *菜单 by 在F5刷新的时候左侧导航不会落焦点，
   *所以默认的时候给初始所有路由的值,前端在做效果的时候先隐藏菜单，
   *等数据获取后再显示
   */
  menuList: pageRouter,
  //加载状态
  loadingState: false,
  //超时状态
  timeOut: false,
  //菜单状态
  collapsed: false,
  
  loginName: "",
}