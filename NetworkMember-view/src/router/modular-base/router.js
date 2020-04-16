//登录
const login = r => require.ensure([], () => r(require('../../views/modular-base/login.vue')), 'login');
//首页
const homePage = r => require.ensure([], () => r(require('../../views/modular-base/home.vue')), 'home');
//注册
const register = r => require.ensure([], () => r(require('../../views/modular-base/register.vue')), 'Register');


const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: login
};

const registerRouter = {
    path: '/register',
    name: 'register',
    meta: {
        title: '注册'
    },
    component: register
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    meta: {
        hide: true,
    },
    children: [
        { path: 'home', name: 'home', meta: { title: '首页' }, component: homePage },
    ]
};

export const independenceRouterPage = [
    loginRouter,
    otherRouter,
    registerRouter
]

