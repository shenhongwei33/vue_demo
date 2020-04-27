export const menuList=[
    {   //系统管理
        path: '/systemManagement',
        name: 'systemManagement',
        icon: "_system-manage",
        meta: {
            icon: "_system-manage",
        },
        children:[{ //存储服务器管理
            path: 'storageServerManagement',
            name: "storageServerManagement",
            icon: "",
        },{ //存储池管理
            path: 'StoragePool',
            name: "StoragePool",
            icon: "",
        },{ //客户端管理
            path: 'clientManagement',
            name: "clientManagement",
            icon: "",
        },{ //日志管理
            path: 'logManagement',
            name: "logManagement",
            icon: "",
        },{ //备份与恢复
            path: 'backupAndRecovery',
            name: "backupAndRecovery",
            icon: "",
        },{ //产品授权
            path: 'productAuthorizationManagement',
            name: "productAuthorizationManagement",
            icon: "",
        },
        {   //安全策略
            path: 'securityPolicyManagement',
            name: "securityPolicyManagement",
            icon: "",
            
        },{ //复制管理
            path: 'replicationManagement',
            name: "replicationManagement",
            icon: "",
        }]
    },{ //计划管理
        path: '/planManagement',
        name: 'planManagement',
        icon: "_plan",
        meta: {
            icon: "_plan",
        },
        children:[{ //任务计划
            path: 'taskPlanning',
            name: "taskPlanning",
            icon: "",
        }]
    },{ //数据备份
        path: '/backUp',
        name: 'backUp',
        icon: "_backup",
        meta: {
            icon: "_backup",
        },
        children:[{ //数据库
            path: 'backUpDB',
            name: "backUpDB",
            icon: "",
        },{ //传统文件系统
            path: 'traditionalFileSystem',
            name: "traditionalFileSystem",
            icon: "",
        },{ //开放数据源
            path: 'openSataSource',
            name: "openSataSource",
            icon: "",
        },{ //虚拟化
            path: 'virtualization',
            name: "virtualization",
            icon: "",
        }]
    },{ //数据服务
        path: '/dataServices',
        name: 'dataServices',
        icon: "_data-server",
        meta: {
            icon: "_data-server",
        },
        children:[
           { //数据使用
            path: 'singleDataUsageNew',
            name: "singleDataUsageNew",
            icon: "",
        },{ //工作流
            path: 'workflowAndPlanning',
            name: "workflowAndPlanning",
            icon: "",
        }]
    },{ //实时灾备
        path: '/disasterPreparedness',
        name: 'disasterPreparedness',
        icon: "_disaster",
        meta: {
            icon: "_disaster",
        },
        children:[{ //存储服务
            path: 'persistentStore',
            name: "persistentStore",
            icon: "",
        },
       
        ]
    },{ //监控
        path: '/monitoring',
        name: 'monitoring',
        icon: "_monitor",
        meta: {
            icon: "_monitor",
        },
        children:[{ //作业状态
            path: 'jobStatus',
            name: "jobStatus",
            icon: "",
        }]
    },{ //账户管理
        path: '/accountManagement',
        name: 'accountManagement',
        icon: "_account-manage",
        meta: {
            icon: "_account-manage",
        },
        children:[{ //用户管理
            path: 'userManagement',
            name: "userManagement",
            icon: "",
        },{ //角色管理
            path: 'roleManagement',
            name: "roleManagement",
            icon: "",
        },{ //权限管理
            path: 'authorityManagement',
            name: "authorityManagement",
            icon: "",
        }]
    },{ //邮件管理
        path: '/emailManagement',
        name: 'emailManagement',
        icon: "_email",
        meta: {
            icon: "_email",
        },
        children:[{ //邮件设置
            path: 'emailSettings',
            name: "emailSettings",
            icon: "",
        },{ //联系人
            path: 'contacts',
            name: "contacts",
            icon: "",
        }]
    }]