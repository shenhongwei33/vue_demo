import Main from '../../views/modular-base/Main.vue';
//登录
const login = r => require.ensure([], () => r(require('../../views/modular-base/login.vue')), 'login');
//首页
const homePage = r => require.ensure([], () => r(require('../../views/modular-base/home.vue')), 'home');
//注册
const register = r => require.ensure([], () => r(require('../../views/modular-base/register.vue')), 'Register');

//按需加载
const DatabaseBackup = r => require.ensure([], () => r(require('../../views/modular-backup/database-backup.vue')), 'DatabaseBackup');

const FileBackup = r => require.ensure([], () => r(require('../../views/modular-backup/file-backup.vue')), 'FileBackup');

const VirtualBackup = r => require.ensure([], () => r(require('../../views/modular-backup/virtual-backup.vue')), 'VirtualBackup');


export const loginRouter = {
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

// const registerRouter = {
//     path: '/register',
//     name: 'register',
//     meta: {
//         title: '注册'
//     },
//     component: register
// };

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  meta: {
    hide: true,
  },
  children: [{
      path: '/home',
      name: 'home',
      meta: {
        title: '首页'
      },
      component: homePage
  }, {
      path: '/database',
      name: 'database',
      meta: {
        title: '数据库'
      },
      component: DatabaseBackup
    }, {
      path: '/file',
      name: 'file',
      meta: {
        title: '传统文件系统'
      },
      component: FileBackup
    }, {
      path: '/virtual',
      name: 'virtual',
      meta: {
        title: '虚拟化'
      },
      component: VirtualBackup
    }
  ]
};

export const independenceRouterPage = [
    loginRouter,
    otherRouter,
    registerRouter
]

