/**
 * FileName : index.js
 * ProjectName : reload
 * Author : terrorblade
 * Created Date: 2019-04-22 22:16:49
 * Description : 
 * -----
 * Last Modified: 2019-06-06 10:57:21
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

const app = getApp()

Page({
    data: {
        imgUrl:app.globalData.imgUrl,
        num:1,
        timers:'',
    },
    onLoad () {
        this.TimeRanges();
        this.getVoiceData();
    },
    TimeRanges(){
        const timer = setInterval(()=>{
            let nums = '';
            if (this.data.num === 3) {
                nums = 1;
            } else {
                nums = this.data.num + 1;
            }
            this.setData({
                num: nums
            })
        }, 500)
    },
    getVoiceData(){
        const params = {
            "base":{},
            "param":{
              "offset":`1`,
              "count": "10"
            }
        }
        console.log("---------",app)
        app.globalData.http(app.globalData.apiUrl.url+'/v3/detail?c=4021',JSON.stringify(params)).then(res=>{
            wx.setStorageSync('voiceData', JSON.stringify(res));
            wx.reLaunch({
                url: '/pages/home/index'
            })
            console.log("--------",res)
        }).catch(err=>{
            console.log("--------err",err)
        })
    }
  })