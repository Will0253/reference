<template>
  <view>
    <view style="width: 100%;" @touchstart.stop.prevent="startVoice" @touchmove.stop.prevent="moveVoice"
          @touchend.stop="endVoice" @touchcancel.stop="cancelVoice"
          :style="{ background: recording ? '#c7c6c6' : '#FFFFFF' }">
      {{ voiceTitle }}
    </view>
    <!-- 语音动画 -->
    <view class="voice_an" v-if="recording">
      <view class="voice_an_icon">
        <view id="one" class="wave"></view>
        <view id="two" class="wave"></view>
        <view id="three" class="wave"></view>
        <view id="four" class="wave"></view>
        <view id="five" class="wave"></view>
        <view id="six" class="wave"></view>
        <view id="seven" class="wave"></view>
      </view>
      <view class="text">{{ voiceIconText }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {uploadImage, uploadMedia} from "../../../api/common";
import {sendChatMessage} from "../../../store/chat/utils";

const Recorder = ref(uni.getRecorderManager())
const isStopVoice = ref(false)//标识是否正在录音
const recording = ref(false)//加锁 防止点击过快引起的当录音正在准备(还没有开始录音)的时候,却调用了stop方法但并不能阻止录音的问题
const voiceInterval = ref(0)//标识是否正在录音
const voiceTime = ref(0)//总共录音时长
const canSend = ref(true)//是否可以发送
const PointY = ref(0)//坐标位置
const voiceIconText = ref('正在录音...')
const voiceTitle = ref('按住 说话')

//录音开始事件
//录音结束事件
Recorder.value.onStart(e => {
  beginVoice();
});
Recorder.value.onStop(res => {
  clearInterval(voiceInterval.value);
  handleRecorder(res);
});

//准备开始录音
const startVoice = (e: any) => {
  recording.value = true;
  isStopVoice.value = false;
  canSend.value = true;
  voiceIconText.value = "正在录音..."
  PointY.value = e.touches[0].clientY;
  Recorder.value.start({
    format: 'mp3'
  });
}

//录音已经开始
const beginVoice = () => {
  if (isStopVoice.value) {
    Recorder.value.stop();
    return;
  }
  voiceTitle.value = '松开 结束'
  voiceInterval.value = setInterval(() => {
    //console.log("voiceTime", voiceTime.value);
    if (voiceTime.value > 49) {
      voiceIconText.value = "录音结束倒计时[" + (60 - voiceTime.value) + "]s";
    }

    if (voiceTime.value == 60) {
      clearInterval(voiceInterval.value!);
      endVoice();
    }
    voiceTime.value++;
  }, 1000)
}

//move 正在录音中
const moveVoice = (e: any) => {
  const _py = e.touches[0].clientY;
  const slideY = PointY.value - _py;
  if (slideY > uni.upx2px(120)) {
    canSend.value = false;
    voiceIconText.value = '松开手指 取消发送 '
  } else if (slideY > uni.upx2px(60)) {
    canSend.value = true;
    voiceIconText.value = '手指上滑 取消发送 '
  } else {
    voiceIconText.value = '正在录音... '
  }
}

//结束录音
const endVoice = () => {
  isStopVoice.value = true; //加锁 确保已经结束录音并不会录制
  Recorder.value.stop();
  voiceTitle.value = '按住 说话'
}

//录音被打断
const cancelVoice = (e: any) => {
  console.log("路由被打断", e);
  voiceTime.value = 0;
  voiceTitle.value = '按住 说话';
  canSend.value = false;
  Recorder.value.stop();
}

//处理录音文件
const handleRecorder = ({tempFilePath, duration}: any) => {
  if (voiceTime.value < 1) {
    voiceIconText.value = "说话时间过短";
    setTimeout(() => {
      recording.value = false;
    }, 200)
    return;
  }
  const times=voiceTime.value
  voiceTime.value = 0;
  recording.value = false;
  clearInterval(voiceInterval.value!);
  console.log("语音文件", tempFilePath);
  if (canSend) {
    //uploadFile(voiceFile);
    uploadMedia(tempFilePath).then((data)=>{
      sendChatMessage({
        //地址和时间秒一起
        message: data!.path+','+times,
        type: 3
      })
    })

    return;
  } else {
    console.log("=====已经取消发送语音信息====")
    return;
  }
}
</script>

<style lang="scss" scoped>
.voice_an {
  width: 300rpx;
  height: 300rpx;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  background-color: rgba(41, 41, 41, 0.7);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 10rpx;
  z-index: 100;

  .text {
    padding-top: 10rpx;
  }

  @keyframes runVoice {
    0% {
      height: 10%;
    }

    20% {
      height: 50%;
    }

    50% {
      height: 100%;
    }

    80% {
      height: 50%;
    }

    100% {
      height: 0%;
    }
  }

  .wave {
    width: 6rpx;
    height: 100%;
    margin-left: 10rpx;
    border-radius: 50rpx;
    background-color: #999;
    vertical-align: middle;
    display: inline-block;
  }

  .voice_an_icon {
    width: 200rpx;
    height: 100rpx;
    line-height: 50rpx;
    margin: 50rpx 0;

    & > view {
      &:nth-child(1) {
        animation: runVoice 0.6s infinite 0.1s;
      }

      &:nth-child(2) {
        animation: runVoice 0.6s infinite 0.3s;
      }

      &:nth-child(3) {
        animation: runVoice 0.6s infinite 0.6s;
      }

      &:nth-child(4) {
        animation: runVoice 0.6s infinite 0.1s;
      }

      &:nth-child(5) {
        animation: runVoice 0.6s infinite 0.3s;
      }

      &:nth-child(6) {
        animation: runVoice 0.6s infinite 0.6s;
      }

      &:nth-child(7) {
        animation: runVoice 0.6s infinite 0.1s;
      }
    }
  }
}
</style>
