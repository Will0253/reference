import Vue from 'vue'
import App from './App';

// #ifdef  H5
// H5使用打开 此sdk
// import TIM from './static/tim-js'
// #endif

// #ifdef  MP-WEIXIN || APP-PLUS
// 小程序 app使用sdk
import TIM from './static/tim-wx-sdk'
// #endif

import store from './store/index'
import dayjs from './static/dayjs'
import { isJSON } from './utils'

import COS from './static/cos-wx-sdk-v5'
import { SDKAPPID } from './static/utils/GenerateTestUserSig'
import TYPES from './utils/types'
Vue.config.productionTip = false

 App.mpType = 'app'
const tim = TIM.create({
  SDKAppID: SDKAPPID
})
tim.setLogLevel(0)
wx.$app = tim
wx.$app.registerPlugin({'cos-wx-sdk': COS})
wx.store = store
wx.TIM = TIM
wx.dayjs = dayjs
dayjs.locale('zh-cn')

let $bus = new Vue()
Vue.prototype.TIM = TIM
Vue.prototype.$type = TYPES
Vue.prototype.$store = store
Vue.prototype.$bus = $bus

tim.on(TIM.EVENT.SDK_READY, onReadyStateUpdate, this)
tim.on(TIM.EVENT.SDK_NOT_READY, onReadyStateUpdate, this)

tim.on(TIM.EVENT.KICKED_OUT, kickOut, this)
// 出错统一处理
tim.on(TIM.EVENT.ERROR, onError, this)

tim.on(TIM.EVENT.MESSAGE_RECEIVED, messageReceived, this)
tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, convListUpdate, this)
tim.on(TIM.EVENT.GROUP_LIST_UPDATED, groupListUpdate, this)
tim.on(TIM.EVENT.BLACKLIST_UPDATED, blackListUpdate, this)
tim.on(TIM.EVENT.NET_STATE_CHANGE, netStateChange, this)
tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, onMessageReadByPeer)

function onReadyStateUpdate ({ name }) {
  const isSDKReady = (name === TIM.EVENT.SDK_READY)
  if (isSDKReady) {
    wx.$app.getMyProfile().then(res => {
      store.commit('updateMyInfo', res.data)
    })
    wx.$app.getBlacklist().then(res => {
      store.commit('setBlacklist', res.data)
    })
  }
  store.commit('setSdkReady', isSDKReady)
}

function kickOut (event) {
  store.dispatch('resetStore')
  wx.showToast({
    title: '你已被踢下线',
    icon: 'none',
    duration: 1500
  })
  setTimeout(() => {
    wx.reLaunch({
      url: '../login/main'
    })
  }, 500)
}

function onError (event) {
  // 网络错误不弹toast && sdk未初始化完全报错
  if (event.data.message && event.data.code && event.data.code !== 2800 && event.data.code !== 2999) {
    store.commit('showToast', {
      title: event.data.message,
      duration: 2000
    })
  }
}

function checkoutNetState (state) {
  switch (state) {
    case TIM.TYPES.NET_STATE_CONNECTED:
      return { title: '已接入网络', duration: 2000 }
    case TIM.TYPES.NET_STATE_CONNECTING:
      return { title: '当前网络不稳定', duration: 2000 }
    case TIM.TYPES.NET_STATE_DISCONNECTED:
      return { title: '当前网络不可用', duration: 2000 }
    default:
      return ''
  }
}

function netStateChange (event) {
  console.log(event.data.state)
  store.commit('showToast', checkoutNetState(event.data.state))
}

function onMessageReadByPeer (event) {
  console.log(event)
}

function messageReceived (event) {
  for (let i = 0; i < event.data.length; i++) {
    let item = event.data[i]
    if (item.type === TYPES.MSG_GRP_TIP) {
      if (item.payload.operationType) {
        $bus.$emit('groupNameUpdate', item.payload)
      }
    }
    if (item.type === TYPES.MSG_CUSTOM) {
      if (isJSON(item.payload.data)) {
        const videoCustom = JSON.parse(item.payload.data)
        if (videoCustom.version === 3) {
          switch (videoCustom.action) {
            // 对方呼叫我
            case 0:
              if (!store.getters.isCalling) {
                let url = `../call/main?args=${item.payload.data}&&from=${item.from}&&to=${item.to}`
                wx.navigateTo({url})
              } else {
                $bus.$emit('isCalling', item)
              }
              break
            // 对方取消
            case 1:
              wx.navigateBack({
                delta: 1
              })
              break
            // 对方拒绝
            case 2:
              $bus.$emit('onRefuse')
              break
            // 对方不接1min
            case 3:
              wx.navigateBack({
                delta: 1
              })
              break
            // 对方接听
            case 4:
              $bus.$emit('onCall', videoCustom)
              break
            // 对方挂断
            case 5:
              $bus.$emit('onClose')
              break
            // 对方正在通话中
            case 6:
              $bus.$emit('onBusy')
              break
            default:
              break
          }
        }
      }
    }
  }
  store.dispatch('onMessageEvent', event)
}

function convListUpdate (event) {
  store.commit('updateAllConversation', event.data)
}

function groupListUpdate (event) {
  store.commit('updateGroupList', event.data)
}

function blackListUpdate (event) {
  store.commit('updateBlacklist', event.data)
}

// 获取系统信息
// let sysInfo = uni.getSystemInfo()
// store.commit('setSystemInfo', sysInfo)


const app = new Vue({
	store,
    ...App
});
app.$mount();
