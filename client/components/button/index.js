/**
 * FileName : index.js
 * ProjectName : button
 * Author : terrorblade
 * Created Date: 2019-08-13 10:16:20
 * Description : 
 * -----
 * Last Modified: 2019-08-13 11:49:46
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
const app = getApp();
const {userInfo,base,wx,api} = app.globalData;
Component({
    properties:{
        title:{
            type:String,
            value:''
        },
        type:{
            type:Number,
            value:1
        },
        route:{
            type:Object,
            value:{}
        }
    },
    methods: {
        router(){
            console.log("2-------",this.properties.route)
            wx.router(this.properties.route);
        },
        onGotUserInfo(e){
            console.log("2-------",this.properties.route)
            wx.router(this.properties.route);
        }
    },
})
