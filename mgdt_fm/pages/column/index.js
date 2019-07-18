/**
 * FileName : index.js
 * ProjectName : column
 * Author : terrorblade
 * Created Date: 2019-05-23 17:30:47
 * Description : 
 * -----
 * Last Modified: 2019-05-27 15:16:43
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

const app = getApp().globalData

Page({
    data:{
        cid:"",  // 313853080921088
        type:"",
        offset:1,
        count:10,
        columnData:[],
        detail:{},
        isLoding:false
    },
    async onLoad(options){
       console.log("column--------",options)
        console.log("column-------",getCurrentPages());
        const {cid,type} = options;
        this.setData({
          cid:cid,
          type:type
        })
        await this.getColumnData();
    },
    async getColumnData(){
        const params = {
          "base":{},
          "param":{
            "cid":this.data.cid,
            "type":this.data.type,
            "offset":`${this.data.offset}`,
            "count": `${this.data.count}`
          }
        }
        const res = await app.http(app.apiUrl.url+'/v3/detail?c=4005',JSON.stringify(params));
        this.setData({
            columnData:this.data.columnData.concat(res.content),
            detail:res.detail
        })
        if (res.content && res.content.length >= 10) {
            this.setData({
              isLoding:false
            })
        }
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
      this.getColumnData();
    }
})
