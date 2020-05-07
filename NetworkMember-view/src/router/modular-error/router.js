const page_403 = r => require.ensure([], () => r(require('../../views/modular-error/403.vue')), 'page404');


const page403={
    path:'/403',
    meta:{
        title:'403-权限不足'
    },
    name:'error-403',
    component: page_403
}




export const errorRouterPage = [
    page403
]


