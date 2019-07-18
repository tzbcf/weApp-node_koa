/**
 * FileName : index.js
 * ProjectName : play
 * Author : terrorblade
 * Created Date: 2019-05-21 17:15:17
 * Description : 
 * -----
 * Last Modified: 2019-05-27 16:48:52
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */


const app = getApp().globalData
const {formatDateStr} = require('../../utils/base');
Page({
  data: {
    modeIcon:'',
    randomIcon:'../../img/icon/icon_suiji.png',
    cycle:'../../img/icon/icon_xunhuan.png',
    leftIcon:'',
    leftBeforeIcon:'../../img/icon/icon_shangyishoucopy@2x.png',
    leftAfterIcon:'../../img/icon/icon_shangyishou@2x.png',
    rightIcon:'',
    rightBeforeIcon:'../../img/icon/icon_xiayishoucopy@2x.png',
    rightAfterIcon:'../../img/icon/icon_xiayishou@2x.png',
    playIcon:'',
    LoadingIcon:'../../img/icon/icon_loading@2x.png',
    playerIcon:'../../img/icon/icon_player@2x.png',
    pauseIcon:'../../img/icon/icon_stop@2x.png',
    voiceData:[],
    voiceObj:{},
    starTime:'00:00',
    endTime:'10:10',
    innerAudioContext:null,
    play:false,
    deg:0,
    rotateTimer:null,
    animationData:{},
    cid:"", // 359180785983488
    type:"",
    isLoading:false,
    percentage:0
  },
  async onLoad (options) {
    console.log("play--------",options)
    console.log("play------------",getCurrentPages())
    console.log("play------------",formatDateStr(100))
    const {cid,type}= options;
    this.tabar = this.selectComponent("#tabar");
    this.setData({
      modeIcon:this.data.randomIcon,
      leftIcon:this.data.leftBeforeIcon,
      playIcon:this.data.playerIcon,
      rightIcon:this.data.rightAfterIcon,
      cid:cid,
      type:type,
      innerAudioContext:wx.createInnerAudioContext()
    })
    await this.getVoiceData();
    this.audioEvent();
  },
  async getVoiceData(){
    const params = {
        "base":{},
        "param":{
          "cid":this.data.cid,
          "type":this.data.type,
        }
    }
    const res = await app.http(app.apiUrl.url+'/v3/detail?c=4005',JSON.stringify(params));
    this.setData({
        voiceData:res.content,
        voiceObj:res.detail,
        endTime:formatDateStr(res.detail.duration)
    })
  },
  audioEvent(){
    const {innerAudioContext} = this.data;
    innerAudioContext.src = this.data.voiceObj.playUrl;
  },
  player(){
    const {innerAudioContext,play,rotateTimer,playTimer} = this.data;
    if (!play) {
      this.setData({
        isLoading:true
      })
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
        innerAudioContext.pause();
        clearInterval(rotateTimer);
        wx.showToast({
          title: "视频格式错误",
          icon: 'none',
          duration: 1500
        })
        this.setData({
          isLoading:false,
          play:false
        })
      })
      innerAudioContext.play();
      this.playInterval();
      this.rotateSetInterval();
    } else {
      innerAudioContext.pause();
      clearInterval(rotateTimer);
      clearInterval(playTimer);
    }
    this.setData({
      play:!play
    })
  },
  playInterval(){
    const {innerAudioContext} = this.data;
    const playTimer = setInterval(()=>{
      const {currentTime,duration} = innerAudioContext;
      if (currentTime > 0) {
        this.setData({
          isLoading:false,
          starTime:formatDateStr(currentTime * 1000),
          percentage: currentTime / duration
        })
      }
      if (currentTime === duration && duration !== 0) {
        clearInterval(playTimer);
        this.setData({
          play:false
        })
      }
    },1000);
    this.setData({
      playTimer:playTimer
    })
  },
  rotateSetInterval(){
    const animation = wx.createAnimation()
    this.animation = animation
    this.setData({
      animationData: animation.export()
    })
   //连续动画需要添加定时器,所传参数每次+1就行
    const rotateTimer = setInterval(function () {
      let {deg} = this.data;
      deg++;
      this.animation.rotate(1 * (deg)).step()
      this.setData({
        animationData: this.animation.export(),
        deg:deg
      })
    }.bind(this), 100)
    this.setData({
      rotateTimer:rotateTimer
    })
  }
})