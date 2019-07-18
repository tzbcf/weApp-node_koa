/**
 * FileName : index.js
 * ProjectName : tabar
 * Author : terrorblade
 * Created Date: 2019-05-05 11:47:15
 * Description : 
 * -----
 * Last Modified: 2019-05-24 10:42:49
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */


Component({
    options: {
      multipleSlots: false // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        type:{
            type:String,
            value:'1'
        },
        index:{
            type:Number,
            value:0
        }
    },
    data:{
        index:1
    },
    methods:{
        tabarChange(e){
            const index = parseInt(e.target.dataset.index, 10);
            switch(index){
                case 0:
                    wx.reLaunch({
                        url: '/pages/hear/index?index='+index
                    })
                    break;
                case 1:
                    wx.reLaunch({
                        url: '/pages/voice/index?index='+index
                    })
                    break;
                case 2:
                    wx.reLaunch({
                        url: '/pages/found/index?index='+index
                    })
                    break;
                case 3:
                    wx.reLaunch({
                        url: '/pages/radio/index?index='+index
                    })
                    break;
                case 4:
                    wx.reLaunch({
                        url: '/pages/home/index?index='+index
                    })
                    break;
            }
            this.setData({
                index:index
            })
            console.log("-------",this.data.index)
        },
        bindBack(){
            wx.navigateBack();
        }
    }
})