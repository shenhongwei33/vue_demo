import Vue from 'vue'
import VueRouter from 'vue-router'
import { routers } from './router';

Vue.use(VueRouter)

const RouterConfig = {
  routes: routers,
};

export default router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  if (to.name == 'login' || to.name == 'register') {
      // 未登陆且要跳转的页面是登录页
      next() // 跳转
  } else if (to.name !== 'login') {
      // 未登录且要跳转的页面不是登录页
      next({
          name: "login" // 跳转到登录页
      })
  } else if (to.name === 'login' || to.name === 'register') {
      // 已授权成功登录且要跳转的页面是登录页
      next({
          name: "home" // 跳转到homeName页
      })
  } else {
      //next();
      //对路由进行权限设计，防止跳转到没有权限的页面中
      
  }
});
