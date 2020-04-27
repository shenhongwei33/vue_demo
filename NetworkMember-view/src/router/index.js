import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/modular-base/login.vue'
import Home from '../views/modular-base/home.vue'
import Main from '../views/modular-base/Main.vue'

Vue.use(VueRouter)

export default new VueRouter({
routes:[
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path: '/home',
    name:'home',
    component: Main
  },
  {
    path: '/',
    redirect: '/login'
  }
]
});

// router.beforeEach((to, from, next) => {
//   if (to.name == 'login' || to.name == 'register') {
//       // 未登陆且要跳转的页面是登录页
//       next() // 跳转
//   } else if (to.name !== 'login') {
//       // 未登录且要跳转的页面不是登录页
//       next({
//           name: "login" // 跳转到登录页
//       })
//   } else if (to.name === 'login' || to.name === 'register') {
//       // 已授权成功登录且要跳转的页面是登录页
//       next({
//           name: "home" // 跳转到homeName页
//       })
//   } else {
//       //next();
//       //对路由进行权限设计，防止跳转到没有权限的页面中
      
//   }
// });
