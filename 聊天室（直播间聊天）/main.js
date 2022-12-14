import Vue from 'vue'
import App from './App'
import GoEasy from "./lib/goeasy-2.1.11.min.js";

const goEasy = GoEasy.getInstance({
	host:"hangzhou.goeasy.io",//应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
	appkey:"BC-xxxx",// common key,
	modules: ['pubsub']
});

Vue.prototype.goEasy = goEasy;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
