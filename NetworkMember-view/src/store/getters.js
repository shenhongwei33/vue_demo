//提取公共的getter
const commonGetters = {
	//获取面包屑导航
	getTagNavList: state =>state.tagNavList,
	//获取菜单
	getMenuList: state =>state.menuList,
	//获取加载状态
	getLoadingState:state =>state.loadingState,
	//获取超时状态
	getTimeOut:state=>state.timeOut,
	//获取未读信息
	getunreadMessages:state=>state.unreadMessages,
	//获取页面菜单状态
	getCollapsed: state => state.collapsed,
};


export default Object.assign(
	{},
	commonGetters,
);
