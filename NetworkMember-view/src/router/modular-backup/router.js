import Main from '../../views/modular-base/Main.vue'

//按需加载
const DatabaseBackup = r => require.ensure([], () => r(require('../../views/modular-backup/database-backup.vue')), 'DatabaseBackup');

const FileBackup = r => require.ensure([], () => r(require('../../views/modular-backup/file-backup.vue')), 'FileBackup');

const VirtualBackup = r => require.ensure([], () => r(require('../../views/modular-backup/virtual-backup.vue')), 'VirtualBackup');



//业务的页面
export const accountManagementRuoterpage = {
    path: '/backup',
    name: 'backup',
    component: Main,
    icon: "_system-manage",
    meta: {
        icon: "_system-manage",
    },
    children: [
        {
            path: '/database',
            name: "databaseBackup",
            icon: "",
            component: DatabaseBackup
        },{
            path: '/file',
            name: "fileBackup",
            icon: "",
            component: FileBackup
        }, {
            path: '/virtual',
            name: "virtualBackup",
            icon: "",
            component: VirtualBackup
        }
    ]
};