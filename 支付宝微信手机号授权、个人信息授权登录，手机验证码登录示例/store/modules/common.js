import { isWechat } from '@/config/h5Utils';
import { setCookie,getCookie } from '@/plugins/cookie';
export const state = {
	PrimaryColor: '#fe461d', //主题色
    loginPopupShow:false,//控制是否打开登录弹窗
	showWxLogin:false,//微信授权登录弹窗-新2022-10
    loadingShow:false,//加载动画
    chatScenesInfo:{},//扫码参数
    locateInformation:{},//定位信息
};
//缓存浏览器的数据名称
const cacheNameList = ["userInfo","PrimaryColor"];
let clearTime;
export const mutations = {
    //取出缓存数据（打开APP就取出）
    setCacheData(state) {
        for (let name of cacheNameList) {
            let data;
            // #ifndef H5
            data = uni.getStorageSync(name);
            // #endif
            // #ifdef H5
            // if(isWechat()){
            	data = getCookie(name)
            	if(name == 'userInfo' && data){
            		data = decodeURIComponent(data) //数据长需要对应的解码
            	}
            // }else{
            // 	data = sessionStorage.getItem(name) || localStorage.getItem(name);
            // }
            // #endif
            if (data) {
                // #ifdef H5
                try {
                    data = JSON.parse(data);
                } catch (e) {}
                // #endif
                state[name] = data;
            }
        }
    },
	setPrimaryColor(state, data){
		state.PrimaryColor =  data;
		// #ifdef H5
		setCookie('PrimaryColor',JSON.stringify(state.PrimaryColor),60)
		// #endif
		// #ifndef H5
		uni.setStorageSync('PrimaryColor', state.PrimaryColor);
		// #endif
	},
    setLoginPopupShow(state, data){
        state.loginPopupShow = data
    },
	setShowWxLogin(state, data){
	    state.showWxLogin = data
	},
    setLoadingShow(state, data){
        state.loadingShow = data
    },
    setChatScenesInfo(state, data){
        state.chatScenesInfo = data
    },
    setLocateInformation(state, data){
        state.locateInformation = data
    },
};
export const actions = {
  
};
