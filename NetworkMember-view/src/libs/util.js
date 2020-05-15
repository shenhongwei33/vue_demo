import Cookies from 'js-cookie'
// cookie保存的天数
import config from '../config'
import { forEach, hasOneOf, objEqual } from './tools'

export const TOKEN_KEY = 'token'

export const setToken = (token) => {
    var exp = new Date();
    Cookies.set(TOKEN_KEY, token, { expires: exp.getTime() + (config.cookieExpires || (60 * 1000 * 30))})
}

export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}

export const hasChild = (item) => {
    return item.children && item.children.length !== 0
}

const showThisMenuEle = (item, access) => {
    if (item.meta && item.meta.access && item.meta.access.length) {
	    if (hasOneOf(item.meta.access, access)) return true
	    else return false
    } else return true
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
    let res = []
    forEach(list, item => {
		if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
		    let obj = {
			    icon: (item.meta && item.meta.icon) || '',
			    name: item.name,
			    meta: item.meta
		    }
		    if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
		    	obj.children = getMenuByRouter(item.children, access)
		    }
		    if (item.meta && item.meta.href) obj.href = item.meta.href
		    if (showThisMenuEle(item, access)) res.push(obj)
		}
    })
  return res
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (routeMetched, homeRoute) => {
  let res = routeMetched.filter(item => {
    return item.meta === undefined || !item.meta.hide
  }).map(item => {
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: item.meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })
  if(res.length ==0){
    return [Object.assign(homeRoute, { to: homeRoute.path })]
  }else{
    return [...res]
  }
}

export const showTitle = (item, vm) => {
    return vm.$t(item.name);
  //return vm.$config.useI18n ? vm.$t(item.name) : ((item.meta && item.meta.title) || item.name)
}


/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
    localStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
    const list = localStorage.tagNaveList
    return list ? JSON.parse(list) : []
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = routers => {
    let i = -1
    let len = routers.length
    let homeRoute = {}
    while (++i < len) {
	    let item = routers[i]
	    if (item.children && item.children.length) {
	        let res = getHomeRoute(item.children)
	        if (res.name) return res
	    } else {
	        if (item.name === 'home') homeRoute = item
	    }
    }
    return homeRoute
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
    const { name, path, meta } = newRoute
    let newList = [...list]
    if (newList.findIndex(item => item.name === name) >= 0) return newList
    else newList.push({ name, path, meta })
    return newList
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
    if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
    else return true
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, routes) => {
    const routePermissionJudge = (list) => {
	    return list.some(item => {
	        if (item.children && item.children.length) {
	          return routePermissionJudge(item.children)
	        } else {
                if (item.name === name) {
                    return true
                }else{
                    return false
                }
            }
	    })
    }
    return routePermissionJudge(routes);
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
    const keyValueArr = url.split('?')[1].split('&')
    let paramObj = {}
    keyValueArr.forEach(item => {
	    const keyValue = item.split('=')
	    paramObj[keyValue[0]] = keyValue[1]
    })
    return paramObj
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
    let res = {}
    if (list.length === 2) {
        res = getHomeRoute(list)
    } else {
        const index = list.findIndex(item => routeEqual(item, route))
        if (index === list.length - 1) res = list[list.length - 2]
        else res = list[index + 1]
    }
    return res
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
    let i = -1
    while (++i < times) {
    	callback(i)
    }
}

/**
 * @param {Object} file 从上传组件得到的文件对象
 * @returns {Promise} resolve参数是解析后的二维数组
 * @description 从Csv文件中解析出表格，解析成二维数组
 */
export const getArrayFromFile = (file) => {
    let nameSplit = file.name.split('.')
    let format = nameSplit[nameSplit.length - 1]
    return new Promise((resolve, reject) => {
	    let reader = new FileReader()
	    reader.readAsText(file) // 以文本格式读取
	    let arr = []
	    reader.onload = function (evt) {
	        let data = evt.target.result // 读到的数据
	        let pasteData = data.trim()
	        arr = pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
	       	    return row.split('\t')
	        }).map(item => {
	        	return item[0].split(',')
	      	})
	        if (format === 'csv') resolve(arr)
	        else reject(new Error('[Format Error]:你上传的不是Csv文件'))
	    }
    })
}

/**
 * @param {Array} array 表格数据二维数组
 * @returns {Object} { columns, tableData }
 * @description 从二维数组中获取表头和表格数据，将第一行作为表头，用于在iView的表格中展示数据
 */
export const getTableDataFromArray = (array) => {
	let columns = []
    let tableData = []
    if (array.length > 1) {
	    let titles = array.shift()
	    columns = titles.map(item => {
	        return {
	       		title: item,
	        	key: item
	        }
	    })
	    tableData = array.map(item => {
	        let res = {}
	        item.forEach((col, i) => {
	        	res[titles[i]] = col
	        })
	        return res
	    })
  	}
    return {
	    columns,
	    tableData
    }
}

export const findNodeUpper = (ele, tag) => {
    if (ele.parentNode) {
	    if (ele.parentNode.tagName === tag.toUpperCase()) {
	        return ele.parentNode
	    } else {
	        return findNodeUpper(ele.parentNode, tag)
	    }
    }
}

export const findNodeDownward = (ele, tag) => {
    const tagName = tag.toUpperCase()
    if (ele.childNodes.length) {
	    let i = -1
	    let len = ele.childNodes.length
	    while (++i < len) {
	        let child = ele.childNodes[i]
	        if (child.tagName === tagName) return child
	        else return findNodeDownward(child, tag)
	    }
    }
}

export const showByAccess = (access, canViewAccess) => {
    return hasOneOf(canViewAccess, access)
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
    const params1 = route1.params || {}
    const params2 = route2.params || {}
    const query1 = route1.query || {}
    const query2 = route2.query || {}
    return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
    let len = tagNavList.length
    let res = false
    doCustomTimes(len, (index) => {
    	if (routeEqual(tagNavList[index], routeItem)) res = true
    })
    return res
}

/**
 * 判断显示容量
 */
export const capacity = (num)=>{
    let fileSizeString = "NaN"; 
    num=parseFloat(num);
    if (num == 0) { 
        fileSizeString = "0"; 
    } else if (num < 1) { 
        fileSizeString = (num *1024).toFixed(2) + "K"; 
    } else if(num < 1024){ 
        fileSizeString = (num ).toFixed(2) + "M"; 
    } else if(num < (1024*1024)) {
        fileSizeString =(num/1024 ).toFixed(2) + "G"; 
    } else if(num < (1024*1024*1024)) {
        fileSizeString = (num/1024/1024).toFixed(2) + "T"; 
    } else {
        fileSizeString = (num/1024/1024/1024).toFixed(2) + "P"; 
    }
    return fileSizeString
}


export const speed = (num)=>{
    let fileSizeString = "0"; 
    let speedUnit = "B";
    num=parseFloat(num);
    if (num == 0) { 
        fileSizeString = "0"; 
    } else if (num < 0.0001) { 
        fileSizeString = (num *1024 * 1024).toFixed(4) ; 
        speedUnit = "B/S";
    }  else if (num < 1) { 
        fileSizeString = (num *1024).toFixed(4) ; 
        speedUnit = "KB/S";
    } else{ 
        fileSizeString = (num).toFixed(4); 
        speedUnit = "MB/S";
    } 
    return {fileSizeString,speedUnit}
}

/**
 * 时间戳转时间格式
 */
export const timestampToTime=(timestamp,type="YYYY-MM-DD hh:mm:ss")=> {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate()<10?'0'+date.getDate():date.getDate()) + ' ';
    var h = (date.getHours()<10?'0'+date.getHours():date.getHours()) + ':';
    var m = (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) + ':';
    var s = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
    if(type=="YYYY-MM-DD hh:mm:ss"){
    	return Y+M+D+h+m+s;
    }else if(type=="YYYY-MM-DD"){
    	return Y+M+D
    }else{
    	return h+m+s;
    }
    
}


/*
 *后台数据key - value匹配 
 */
//传输方式
export const interfaces=(key)=>{
    if(key=="1"){
        return "iSCSI";
    }else if(key=="2"){
        return "FC";
    }else if(key=="3"){
        return "InfiniBand";
    }else if(key=="4"){
        return "IP";
    }else if(key=="5"){
        return "Replication IP";
    }
}

/**
 * 字符串前后去空格
 */
export const stringacg=(str)=>{
	return str.replace(/(^\s*)|(\s*$)/g, "")
}

/**
 * 深拷贝
 */
export const deepClone=(o)=>{
    if (o instanceof Array) {
	    var n = [];
	    for (var i = 0; i < o.length; ++i) {
	        n[i] = deepClone(o[i]);
	    }
	    return n;
    } else if (o instanceof Function) {
    	var n = new Function("return " + o.toString())();
    	return n
    } else if (o instanceof Object) {
	    var n = {}
	    for (var i in o) {
	        n[i] = deepClone(o[i]);
	    }
	    return n;
    } else {
    	return o;
    }
} 

/**
 * 时间点方法
 */
export const timePointLimit = (startTimeNew,endTimeNew,date,time) => {   
    let hourcontrol = []; //小时初始值置为空，不能选择的    
    let minutescontrol = [];
    let secondscontrol = [];
    let newdata = ''
    if (date == "" && time == "") {
        hourcontrol = timeAction().hourcontrol;
        minutescontrol = timeAction().minutescontrol;
        secondscontrol = timeAction().secondscontrol;
    } else {
        let startDate = timestampToTime(startTimeNew).split(" ")[0];
        let endDate = timestampToTime(endTimeNew).split(" ")[0];
        let startTime = timestampToTime(startTimeNew).split(" ")[1];
        let endTime = timestampToTime(endTimeNew).split(" ")[1]; //获得的时间戳把时分秒分割出来
        //拿到的开始时间和结束时间是00:00:00这种格式
        let starhour = startTime.split(":")[0];  //分割开始的小时并赋值
        let starminute = startTime.split(":")[1];
        let starseconds = startTime.split(":")[2];
        let endhour = endTime.split(":")[0];  //分割结束的小时并赋值
        let endminute = endTime.split(":")[1];
        let endeconds = endTime.split(":")[2];

        //切换年月日如果是日期在中间，则时分秒不用做任何限制
        if (date != startDate && date != endDate) {
            hourcontrol = [];
            minutescontrol = [];
            secondscontrol = [];
        } else if (date == startDate && date == endDate) {
            //代表同一天
            //计算小时
            for (var i = 0; i <= 23; i++) {
                if (i < starhour || i > endhour) {
                    hourcontrol.push(i);
                }
            }
            //如果不是切换时间点，则分钟和秒全部屏蔽
            minutescontrol = timeAction().minutescontrol;
            secondscontrol = timeAction().secondscontrol;
            if (time != "") {
                minutescontrol = [];
                secondscontrol = [];
                let newHour = time.split(":")[0];
                let newMinute = time.split(":")[1];
                let newSeconds = time.split(":")[2];
                if (newHour == starhour && newHour != endhour) {
                    if (newMinute <= starminute) {
                        newdata = starhour + ":" + (newMinute < starminute ? starminute : newMinute) + ":" + (newSeconds < starseconds ? starseconds : newSeconds)
                    }
                    for (var i = 0; i <= 59; i++) {
                        if (i < starminute) {
                            minutescontrol.push(i);
                        }
                    }
                    newMinute = newdata != "" ? newdata.split(":")[1] : newMinute;
                    if (newMinute == starminute) {
                        for (var i = 0; i <= 59; i++) {
                            if (i < starseconds) {
                                secondscontrol.push(i);
                            }
                        }
                    } else if (newMinute > starminute) {
                        secondscontrol = [];
                    } else {
                        secondscontrol = timeAction().secondscontrol;
                    }
                } else if (newHour == endhour && newHour != starhour) {
                    if (newMinute >= endminute) {
                        newdata = endhour + ":" + (newMinute > endminute ? endminute : newMinute) + ":" + (newSeconds > endeconds ? endeconds : newSeconds)
                    }
                    for (var i = 0; i <= 59; i++) {
                        if (i > endminute) {
                            minutescontrol.push(i);
                        }
                    }
                    newMinute = newdata != "" ? newdata.split(":")[1] : newMinute;
                    if (newMinute == endminute) {
                        for (var i = 0; i <= 59; i++) {
                            if (i > endeconds) {
                                secondscontrol.push(i);
                            }
                        }
                    } else if (newMinute < endminute) {
                        secondscontrol = [];
                    } else {
                        secondscontrol = timeAction().secondscontrol;
                    }
                } else if (newHour == endhour && newHour == starhour) {                     
                    newMinute = newMinute > endminute || newMinute < starminute ? starminute : newMinute
                    for (var i = 0; i <= 59; i++) {
                        if (i < starminute || i > endminute) {
                            minutescontrol.push(i);
                        }
                    }
                    if (newMinute == starminute && newMinute != endminute) {
                        newdata = endhour + ":" + newMinute + ":" + (newSeconds < starseconds ? starseconds : newSeconds)
                        
                        for (var i = 0; i <= 59; i++) {
                            if (i < starseconds) {
                                secondscontrol.push(i);
                            }
                        }
                    } else if (newMinute == endminute && newMinute != starminute) {
                        newdata = endhour + ":" + newMinute + ":" + (newSeconds > endeconds ? endeconds : newSeconds) 
                        for (var i = 0; i <= 59; i++) {
                            if (i > endeconds) {
                                secondscontrol.push(i);
                            }
                        }
                    } else if (newMinute == endminute && newMinute == starminute) { 
                        newdata = endhour + ":" + newMinute + ":" + (newSeconds < starseconds || newSeconds > endeconds ? starseconds : newSeconds) 
                        for (var i = 0; i <= 59; i++) {
                            if (i < starseconds || i > endeconds) {
                                secondscontrol.push(i);
                            }
                        }
                    } else if (newMinute > starminute && newMinute < endminute) {                        
                        secondscontrol = [];
                    } else {
                        secondscontrol = timeAction().secondscontrol;
                    }
                } else {
                    minutescontrol = [];
                    secondscontrol = [];
                }
            }

        } else {
            //相隔一天
            if (date == startDate) {
                //计算小时
                for (var i = 0; i <= 23; i++) {
                    if (i < starhour) {
                        hourcontrol.push(i);
                    }
                }
                //如果不是切换时间点，则分钟和秒全部屏蔽
                minutescontrol = timeAction().minutescontrol;
                secondscontrol = timeAction().secondscontrol;
                if (time != "") {
                    minutescontrol = [];
                    secondscontrol = [];
                    let newHour = time.split(":")[0];
                    let newMinute = time.split(":")[1];
                    let newSeconds = time.split(":")[2];
                    if (newHour <= starhour) {
                        newdata = starhour + ":" + (newMinute < starminute ? starminute : newMinute) + ":" + (newSeconds < starseconds ? starseconds : newSeconds)
                    }
                    if (newHour == starhour) {

                        for (var i = 0; i <= 59; i++) {
                            if (i < starminute) {
                                minutescontrol.push(i);
                            }
                        }
                        newMinute = newdata != "" ? newdata.split(":")[1] : newMinute;
                        if (newMinute == starminute) {
                            for (var i = 0; i <= 59; i++) {
                                if (i < starseconds) {
                                    secondscontrol.push(i);
                                }
                            }
                        } else if (newMinute > starminute) {
                            secondscontrol = [];
                        } else {
                            secondscontrol = timeAction().secondscontrol;
                        }
                    }

                }
            } else if (date == endDate) {
                //计算小时
                for (var i = 0; i <= 23; i++) {
                    if (i > endhour) {
                        hourcontrol.push(i);
                    }
                }
                //如果不是切换时间点，则分钟和秒全部屏蔽
                minutescontrol = timeAction().minutescontrol;
                secondscontrol = timeAction().secondscontrol;
                if (time != "") {
                    minutescontrol = [];
                    secondscontrol = [];
                    let newHour = time.split(":")[0];
                    let newMinute = time.split(":")[1];
                    let newSeconds = time.split(":")[2];

                    if (newHour == endhour) {
                        newdata = endhour + ":" + (newMinute > endminute ? endminute : newMinute) + ":" + (newSeconds > endeconds ? endeconds : newSeconds)

                        for (var i = 0; i <= 59; i++) {
                            if (i > endminute) {
                                minutescontrol.push(i);
                            }
                        }
                        newMinute = newdata != "" ? newdata.split(":")[1] : newMinute;
                        if (newMinute == endminute) {
                            for (var i = 0; i <= 59; i++) {
                                if (i > endeconds) {
                                    secondscontrol.push(i);
                                }
                            }
                        } else if (newMinute < endminute) {
                            secondscontrol = [];
                        } else {
                            secondscontrol = timeAction().secondscontrol;
                        }
                    }
                }
            }
        }
    }
    function timeAction(){
        let hourcontrol=[];
        let minutescontrol=[];
        let secondscontrol=[];
        for(var i = 0;i<=23;i++){
            hourcontrol.push(i);
        }
        for(var i = 0;i<=59;i++){
            minutescontrol.push(i);
            secondscontrol.push(i);
        }
        return {hourcontrol,minutescontrol,secondscontrol}
    }

    let obj = {
        hourcontrol,
        minutescontrol,
        secondscontrol,
        newdata,
    }
    return obj
}
