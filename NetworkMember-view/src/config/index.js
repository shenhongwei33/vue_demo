export default {
	//token在Cookie中存储的天数，默认1天
	cookieExpires: 1,
	//国际化，防止后期做在线语言切换
	useI18n:true,
	//所有页面展示，批量获取数据
	pageSize:15,
	//摘要Max-length
	MaxLength: 20,
	//导出默认条数
	exportPageSize:9999,
	//版本号(每次发布版本或者发布补丁修改)
	version:"v2.5.0",
	//OEM
	//中移（苏州）软件技术有限公司 BC-BU备份管理平台
	/* name：网页title显示的内容
	 * favicon：网页的icon
	 * maxLogo:首页大LOGO的地址
	 * minLogo:首页小LOGO的地址
	 */
	oemOBJ:{
		mysoft:{
			"title": "模板平台",
			//"mainLogo":process.env.BASE_URL+"cmsoft/logo3.png"
		}
	},
	//当前打包的OEM版本，中移（苏州）软件技术有限公司
	buildOem:"cmsoft",
	//开发环境请求地址
	dev_requestUrl:"http://127.0.0.1:8081"
}
