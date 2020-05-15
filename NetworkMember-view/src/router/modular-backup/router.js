import Main from '../../views/modular-base/Main.vue'

//按需加载
const DatabaseBackup = r => require.ensure([], () => r(require('../../views/modular-backup/database-backup.vue')), 'DatabaseBackup');

const FileBackup = r => require.ensure([], () => r(require('../../views/modular-backup/file-backup.vue')), 'FileBackup');

const VirtualBackup = r => require.ensure([], () => r(require('../../views/modular-backup/virtual-backup.vue')), 'VirtualBackup');

//业务的页面
export const backupRuoterpage = {
    path: '/backup',
    name: 'backup',
    component: Main,
    icon: "el-icon-files",
    meta: {
        icon: "el-icon-files",
    },
    children: [
        {
            path: 'database',
            name: "database",
            icon: "",
            component: DatabaseBackup
        },{
            path: 'file',
            name: "file",
            icon: "",
            component: FileBackup
        }, {
            path: 'virtual',
            name: "virtual",
            icon: "",
            component: VirtualBackup
        }
    ]
};