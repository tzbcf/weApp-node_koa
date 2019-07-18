/**
 * FileName : index.js
 * ProjectName : album
 * Author : terrorblade
 * Created Date: 2019-05-20 16:22:15
 * Description : 
 * -----
 * Last Modified: 2019-05-27 17:35:05
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */


const app = getApp().globalData

Page({
  data: {
      offset:1,
      albumData:[],
      periods:[],
      albumIndex:0,
      voiceData:[],
      detail:{},
      cid:"", // 313849538872320
      type:""
  },
  async onLoad (options) {
    console.log("album--------",options)
    console.log("album-------",getCurrentPages())
    const {cid,type} = options;
    this.setData({
      cid:cid,
      type:type
    })
    this.tabar = this.selectComponent("#tabar");
    if (parseInt(type,10) === 5) {
      await this.getAlbumData();
    }
    await this.getVoiceData();
  },
  async getVoiceData(){
    const {periods,albumIndex,type,cid} = this.data;
    let params = null;
    if (parseInt(type,10) === 5) {
      params = {
        "base":{},
        "param":{
          "cid":periods[albumIndex].themeId,
          "type":periods[albumIndex].type,
          "offset":`${this.data.offset}`,
          "count": "10"
        }
      }
    } else {
      params = {
        "base":{},
        "param":{
          "cid":cid,
          "type":type,
          "offset":`${this.data.offset}`,
          "count": "10"
        }
      }
    }
    const res = await app.http(app.apiUrl.url+'/v3/detail?c=4005',JSON.stringify(params));
    this.setData({
        voiceData:this.data.voiceData.concat(res.content.map(v=>{
          v.time = app.base.formatDate(v.duration);
          return v;
        }))
    })
    if (parseInt(type,10) !== 5) {
      this.setData({
        detail:res.detail
      })
    }
    if (res.content && res.content.length >= 10) {
      this.setData({
        isLoding:false
      })
    }
  },
  async getAlbumData(){
    const params = {
      "base":{},
      "param":{
        "cid":this.data.cid,
        "type":this.data.type,
        "offset":`1`,
        "count": "10"
      }
    }
    const res = await app.http(app.apiUrl.url+'/v3/detail?c=4005',JSON.stringify(params));
    this.setData({
        albumData:res.content,
        periods:res.periods,
        detail:res.detail
    })
  },
  routerPage(e){
    const {obj} = e.target.dataset;
    if (parseInt(obj.type,10) === 5) {
      wx.navigateTo({
        url: `/pages/album/index?cid=${obj.id}&&type=${obj.type}`
      })
    } else if (parseInt(obj.type,10) === 6) {
      wx.navigateTo({
        url: `/pages/column/index?cid=${obj.id}&&type=${obj.type}`
      })
    } else {
      wx.navigateTo({
        url: `/pages/play/index?cid=${obj.id}&&type=${obj.type}`
      })
    }
  },
  onReachBottom(){
    let {offset,isLoding} = this.data;
    if (isLoding) {
      return;
    }
    offset++;
    this.setData({
      isLoding:true,
      offset:offset
    })
    this.getVoiceData();
  }
})
