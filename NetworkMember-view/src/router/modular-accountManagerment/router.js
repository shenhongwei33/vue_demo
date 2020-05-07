import Main from '../../views/modular-base/Main.vue'

//按需加载
const UserManagerment = r => require.ensure([], () => r(require('../../views/modular-accountManagerment/userManagerMent.vue')), 'UserManagement');


//业务的页面
export const accountManagementRuoterpage = {
    path: '/accountManagement',
    name: 'accountManagement',
    component: Main,
    icon: "_system-manage",
    meta: {
        icon: "_system-manage",
    },
    children: [
        {
            path: 'userManagement',
            name: "userManagement",
            icon: "",
            component: UserManagerment
        }
    ]
};