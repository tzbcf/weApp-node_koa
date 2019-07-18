/**
 * FileName : index.js
 * ProjectName : hear
 * Author : terrorblade
 * Created Date: 2019-05-23 17:55:16
 * Description : 
 * -----
 * Last Modified: 2019-06-06 10:59:37
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

const app = getApp().globalData

Page({
    data:{
        index:1,
        offset:1,
        albumData:[],
        isLoding:false
    },
    async onLoad(){
        this.setData({
            isLoding:true
          })
        this.search = this.selectComponent("#search");
        await this.getVoiceData();
    },
    tabarChange(e){
        const index = parseInt(e.target.dataset.index, 10);
        this.setData({
            index:index
        });
    },
    async getVoiceData(){
        if (!this.data.isLoding) {
          return;
        }
        const params = {
          "base":{},
          "param":{
            "offset":`${this.data.offset}`,
            "count": "10"
          }
        }
        let res = null;
        try{
          res = JSON.parse(wx.getStorageSync('voiceData'));
        }catch(e){
          res = {};
        }
        this.setData({
          albumData: this.data.albumData.concat(res.content)
        })
        if (res.content.length >=10) {
          this.setData({
            isLoding: false
          })
        }
    },
    routerPage(e){
      const {obj} = e.target.dataset;
      if (parseInt(obj.type,10) === 5 || parseInt(obj.type,10) === 1) {
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
