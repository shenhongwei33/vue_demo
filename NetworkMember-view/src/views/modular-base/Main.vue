<template>
	<Layout style="height: 100%" class="main">
		<Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}" ref="chartd">
			<side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList" :isShowMenu="isShowMenu">
				<!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
				<div class="logo-con">
					<router-link to="/home"><img class="maxLogo" v-show="!collapsed" :src="$config.oemOBJ[$config.buildOem].maxLogo" key="max-logo" /></router-link> 
					<router-link to="/home"><img class="minLogo" v-show="collapsed" :src="$config.oemOBJ[$config.buildOem].minLogo" key="min-logo" /></router-link> 
				</div>
			</side-menu>
		</Sider>
		<Layout>
			<Header class="header-con">
				<header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
					<div>{{usetName}}</div>
					<div class="logOut" @click="logOut">
						<Tooltip :content="this.$t('commonPage.logOut')">
							<Icon custom="iconfont icon-exit" size="16" />
						</Tooltip>
					</div>

					<div class="changePwd" @click="messageClick">
						<Tooltip :content="this.$t('commonPage.alarm')">
							<Badge overflow-count='99' :count="count" :offset=[22,0]>
								<Icon custom="iconfont icon-message" size="16" />
							</Badge>
						</Tooltip>
					</div>

					<div class="changePwd" @click="changePassword">
						<Tooltip :content="this.$t('commonPage.alterpassword')">
							<Icon custom="iconfont icon-password" size="16" />
						</Tooltip>
					</div>
				</header-bar>
			</Header>
			<Content class="main-content-con">
				<Layout class="main-layout-con">
					<div class="tag-nav-wrapper">
						<tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag" />
					</div>
					<Content class="content-wrapper" id="contentwidth">
						<router-view />
					</Content>
				</Layout>
			</Content>
		</Layout>
		<!-- 修改密码抽屉 -->
		<Drawer :closable="pswCancel" v-model="showpsw" width="556" :mask-closable="false" @on-visible-change="visibleChange">
			<header class="headerDraw">
				<span>{{$t('commonPage.resetpassword')}}</span>
			</header>
			<div class="drawer-body-content">
				<Form :model="pswItem" inline :rules="pswrules" ref="pswfrom">
					<Row :gutter="32">
						<Col span="12">
							<FormItem :label="$t('commonPage.originalPassword')" prop="oldpsw">
								<Input type="password" v-model="pswItem.oldpsw" :placeholder="$t('commonPage.pleaseenter')" :maxlength="20" />
							</FormItem>
						</Col>
					</Row>
					<Row :gutter="32">
						<Col span="12">
							<FormItem :label="$t('commonPage.newPassword')" prop="newpsw">
								<Input type="password" v-model="pswItem.newpsw" :placeholder="$t('commonPage.pleaseenter')" :maxlength="20" />
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem :label="$t('commonPage.confirmPassword')" prop="renewpsw">
								<Input type="password" v-model="pswItem.renewpsw" :placeholder="$t('commonPage.pleaseenter')" :maxlength="20" />
							</FormItem>
						</Col>
					</Row>
					<div class="demo-drawer-footer">
						<Button style="margin-right: 8px" v-if="pswCancel" @click="cancel">{{$t('commonPage.cancel')}}</Button>
						<Button type="primary" @click="closepswinput('pswfrom')">{{$t('commonPage.determine')}}</Button>
					</div>
				</Form>
			</div>
		</Drawer>
	</Layout>
</template>
<script>
//import SideMenu from "../../components/side-menu";
//import HeaderBar from "../../components/header-bar";
//import TagsNav from "../../components/tags-nav";
//import { getRSA } from "../../libs/secret.js";

//import Cookies from "js-cookie";
//import { mapGetters } from "vuex";
//import { getNewTagList, getNextRoute, routeEqual } from "../../libs/util";
export default {
	name: "Main",
	components: {
		SideMenu,
		HeaderBar,
		TagsNav
	},
	data() {
		const pwdValidate = (rule, value, callback) => {
			if(value == "") {
				callback(new Error(this.$t("messagePage.forver")));
			}
			if(value.indexOf(" ") != -1) {
				callback(new Error(this.$t("messagePage.noSpaces")));
				return;
			} else {
				if(this.pswverify.isWhether == true) {
					if(value.length < this.pswverify.length) {
						let str = this.$t("messagePage.InsufficientPasswordLength") + this.pswverify.length
						callback(new Error(str));
						return;
					}
					if(this.pswverify.num == "1") {
						if(!/[0-9]/g.test(value)) {
							callback(new Error(this.$t("messagePage.containNumbers")));
							return;
						}
					}
					if(this.pswverify.lower == "1") {
						if(!/[a-z]/g.test(value)) {
							callback(new Error(this.$t("messagePage.containLowercaseLetters")));
							return;
						}
					}
					if(this.pswverify.upper == "1") {
						if(!/[A-Z]/g.test(value)) {
							callback(new Error(this.$t("messagePage.containCapitalLetters")));
							return;
						}
					}
					if(this.pswverify.special == "1") {
						if(!/[~!@#$%^&*()]/g.test(value)) {
							callback(new Error(this.$t("messagePage.symbolsMustIncluded")));
							return;
						}
					}
					this.$refs.pswfrom.validateField("renewpsw");
					callback();
				}
			}

		};
		const pwdCheckValidate = (rule, value, callback) => {
			if(value == "") {
				callback(new Error(this.$t("messagePage.forver1")));
			} else if(this.pswItem.newpsw != value) {
				callback(new Error(this.$t("messagePage.forver2")));
			} else {
				callback();
			}
		};
		return {
			//菜单收缩展开  false:展开  true:收缩
			collapsed: false,
			isFullscreen: false,
			isShowMenu: false,
			//图片引用静态资源的路径
			baseUrl: process.env.BASE_URL,
			showpsw: false,
			//数据未读条数
			// count:1,
			//修改密码抽屉,取消按钮
			pswCancel: true,
			//密码验证规则
			pswverify: {
				isWhether: false,
			},
			pswItem: {
				oldpsw: "",
				newpsw: "",
				renewpsw: ""
			},

			pswrules: {
				oldpsw: [{
					required: true,
					message: this.$t('commonPage.passworld'),
					trigger: "blur"
				}],
				newpsw: [{
					required: true,
					validator: pwdValidate,
					trigger: "blur"
				}],
				renewpsw: [{
					required: true,
					validator: pwdCheckValidate,
					trigger: "blur"
				}]
			}
		};
	},

	computed: {
		//tagNavList 导航栏数组集合
		//menuList 菜单栏数组集合
		...mapGetters({
			tagNavList: "getTagNavList",
			menuList: "getMenuList",
			count: "getunreadMessages",
		}),
		userAvator() {
			return "";
		},
		cacheList() {
			return this.tagNavList.length ? this.tagNavList.map(item => item.name) : [];
		},
		local() {
			return "";
		},
		usetName() {
			return localStorage.userName;
		}
	},
	methods: {
		//页面跳转
		turnToPage(route) {
			let {
				name,
				params,
				query
			} = {};
			if(typeof route === "string") name = route;
			else {
				name = route.name;
				params = route.params;
				query = route.query;
			}
			if(name.indexOf("isTurnByHref_") > -1) {
				window.open(name.split("_")[1]);
				return;
			}
			this.$router.push({
				name,
				params,
				query
			});
		},
		handleCollapsedChange(state) {
			this.collapsed = state;
		},
		//关闭修改密码抽屉
		closepsw() {
			this.showpsw = !this.showpsw;
		},
		//关闭导航
		handleCloseTag(res, type, route) {
			let openName = "";
			if(type === "all") {
				this.turnToPage("home");
				openName = "home";
			} else if(routeEqual(this.$route, route)) {
				if(type === "others") {
					openName = route.name;
				} else {
					const nextRoute = getNextRoute(this.tagNavList, route);
					this.$router.push(nextRoute);
					openName = nextRoute.name;
				}
			}
			this.$store.dispatch("setTagNavList", res);
			this.$refs.sideMenu.updateOpenName(openName);
		},
		handleClick(item) {
			this.turnToPage(item);
		},
		logOut() {
			let paramsPkg = {
				fun: atob("L2xvZ291dA==")
			};
			this.$store.dispatch("getHttpData", {paramsPkg}).then(json => {						
				if(json.code == "0000") {
					Cookies.remove("wdp-iam-cookie");
					this.$router.push({
						name: "login"
					});
				} else {
					if(json.code != "9090"){
						this.$Message.error(this.$t("errorCode[" + json.code + "]"));
					}
				}
			});
			// Cookies.remove("wdp-iam-cookie");
			// 		this.$router.push({
			// 			name: "login"
			// 		});
		},
		//打开密码抽屉
		changePassword() {
			this.showpsw = !this.showpsw;
		},
		//密码抽屉显示状态发生变化时触发
		visibleChange() {
			if(this.showpsw) {
				this.pswItem = {
					oldpsw: "",
					newpsw: "",
					renewpsw: ""
				};

				let paramsPkg = {
					fun: atob("L3NlY3VyaXR5L2xpc3Q=")
				};
				this.$store.dispatch("getHttpData", {paramsPkg}).then(json => {						
					if(json.code == "0000") {
						this.pswverify = json.data.securityVO
						this.pswverify.isWhether = true;
					} else {
						if(json.code != "9090"){
							this.$Message.error(this.$t("errorCode[" + json.code + "]"));
						}
					}
				});
			} else {
				this.$refs.pswfrom.resetFields();
			}
		},
		//密码修改取消
		cancel() {
			this.showpsw = !this.showpsw;
		},
		//密码修改确认
		closepswinput(name) {
			this.$refs[name].validate(valid => {
				if(valid) {
					var newPsw = getRSA(this.pswItem.renewpsw)
					var oldpsw = getRSA(this.pswItem.oldpsw)
					this.pswPost(oldpsw, newPsw)
				}
			});
		},
		pswPost(oldPassword, password) {
			let paramsPkg = {
				fun: atob("L3N5c1VzZXIvdXBkYXRlVXNlclBhc3N3b3Jk"),
				data: {
					oldPassword: oldPassword, //旧密码
					password: password, //新密码
					userId: localStorage.userID, //用户编号
				},
			};
			this.$store.dispatch("getHttpData", {paramsPkg}).then(json => {					
				if(json.code == "0000") {
					this.showpsw = !this.showpsw;
					this.pswCancel = true;
				} else {
					if(json.code != "9090"){
						this.$Message.error(this.$t("errorCode[" + json.code + "]"));
					}						
				}
			});
		},
		//信息
		messageClick() {
			this.$router.push({
				name: "information"
			});
		},
		
		//获取密码是否需要修改
		changePasswordAmend() {
			let paramsPkg = {
				fun: atob("L2NoZWNrUGFzc3dvcmQ="),
				data: {},
			};
			this.$store.dispatch("changePasswordAmend", {paramsPkg}).then(json => {
				if(json == "") {
					return;//qiandi5678
				}
				if(json.code != "0000" && json.code != "9090") {
					this.pswCancel = false;
					this.$refs.pswfrom.resetFields();
					this.showpsw = true;
				} else {						
				}
			});
		},
		
		//获取菜单
		menuListAll(){	
			this.isShowMenu = false;		
			let paramsPkg = {
				fun:atob("L21lbnU="),
				data:{
					userId:localStorage.userID,
				}
			}
			this.$store.dispatch("getMenuListSQL",{paramsPkg}).then((json) => {
				this.isShowMenu = true;
			});
		},
		//首页添加检测状态
		liceseState(){
			let paramsPkg = {
				fun: atob("L2xpY2Vuc2U=")
			};
			this.$store.dispatch("getHttpData", { paramsPkg }).then(json => {		
				if (json == "") {
					return;
				}					
				if (json.code == "0000") {	
					this.initPage();
				} else if(json.code == "0110" || json.code == "0102" || json.code == '0101'){
					Cookies.remove("wdp-iam-code");
					Cookies.remove("wdp-iam-cookie");
					this.$router.push({
						name: "register",
						params:{
							'logingCode':json.code
						}
					});		
				} else {
					if(json.code != "9090"){
						if(json.code == '0103' || json.code == '0104' || json.code == '0105' || json.code == '0106'|| json.code == '0107'|| json.code == '0108'|| json.code == ''){
							var messageList=json.message.split(',')
							for(var i=0;i<messageList.length;i++){
								this.$Message.error(messageList[i]);
							}
							this.initPage();
						}
						else{
							this.$Message.error(this.$t("errorCode[" + json.code + "]"));
						}
					}
				}
			});
		},
		initPage(){
			this.$store.dispatch("getCollapsed", this.collapsed);
			// 获取菜单
			this.menuListAll()
			//初始化设置面包屑导航
			this.$store.dispatch("setTagNavList");
			//初始化加载首页
			this.$store.dispatch("setTag", {
				route: this.$store.state.com.homeRoute
			});
			//初始化设置标签导航
			this.$store.dispatch("setBreadCrumb", this.$route.matched);

			//获取密码是否需要修改
			this.changePasswordAmend()
			// 获取未读信息条数
			let paramsPkg = 'eyJmdW4iOiIvc3lzVXNlci9ub3RpY2UiLCJkYXRhIjp7ImVuZFRpbWUiOiIiLCJvcGVyVHlwZSI6Ii0xIiwicmVhZFN0YXRlIjoiLTEiLCJzdGFydFRpbWUiOiIiLCJwYWdlTm8iOjEsInBhZ2VTaXplIjoxNSwib3JkZXIiOiIifX0=';
			paramsPkg = JSON.parse(atob(paramsPkg));
			this.$store.dispatch("getHttpData", {paramsPkg}).then(json => {
				if(json.code == "0000") {
					this.$store.dispatch("setunreadMessages", json.data.messageNum);
				} else {
					if(json.code != "9090"){
						this.$Message.error(this.$t("errorCode[" + json.code + "]"));
					}
				}
			});
		}
	},
	watch: {
		$route(newRoute) {
			this.$store.dispatch("setBreadCrumb", this.$route.matched);
			this.$store.dispatch("setTagNavList",getNewTagList(this.tagNavList, newRoute));
		},
	
		collapsed() {
			this.$store.dispatch("getCollapsed", this.collapsed);
		},
	
	},
	mounted() {
		if(!Cookies.get('wdp-iam-cookie')){
			this.$router.push({
				name: "login"
			});	
		}else{
			this.liceseState();
		}
	}
};
</script>
<style lang="less">
@import "../../assets/styles/main.less";
@import "../../assets/styles/drawerStyle/Common.less";
</style>