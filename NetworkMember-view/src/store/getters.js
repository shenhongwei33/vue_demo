//提取公共的getter
const commonGetters = {
	//获取面包屑导航
	getTagNavList: state =>state.com.tagNavList,
	//获取菜单
	getMenuList: state =>state.com.menuList,
	//获取加载状态
	getLoadingState:state =>state.com.loadingState,
	//获取超时状态
	getTimeOut:state=>state.com.timeOut,
	//获取未读信息
	getunreadMessages:state=>state.com.unreadMessages,
	//获取页面菜单状态
	getCollapsed: state => state.com.collapsed,
};


export default Object.assign(
	{},
	commonGetters,
);
