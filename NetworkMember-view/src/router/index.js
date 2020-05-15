import Vue from 'vue'
import VueRouter from 'vue-router'
import {routers} from './router'
import Cookies from 'js-cookie';
import store from '../store/store';
import { errorRouterPage } from './modular-error/router';
import { independenceRouterPage } from './modular-base/router';
import { canTurnTo } from '../libs/util';

Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
  routes: routers,
};

//防止没有err对象报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const router = new VueRouter(RouterConfig);


router.beforeEach((to, from, next) => {

  if (!Cookies.get('wdp-iam-cookie') && (to.name == 'login' || to.name == 'register')) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (!Cookies.get('wdp-iam-cookie') && to.name !== 'login') {
    // 未登录且要跳转的页面不是登录页
    next({
      name: "login" // 跳转到登录页
    })
  } else if (Cookies.get('wdp-iam-cookie') && (to.name === 'login')) {
    // 已授权成功登录且要跳转的页面是登录页
    next({
      name: "home" // 跳转到homeName页
    })
  } else {
    //对路由进行权限设计，防止跳转到没有权限的页面中
    store.dispatch("getMenus").then(json => {
      if (canTurnTo(to.name, [...json, ...errorRouterPage, ...independenceRouterPage])) {
        next();
      } else if (canTurnTo(to.name, routers)) {
        next({
          replace: true,
          name: "error-403" // 跳转到登录页
        })
      }
    })
  }
});

router.afterEach((to) => {
  
});