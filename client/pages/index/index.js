//index.js
//获取应用实例
const app = getApp();
const {userInfo,base,wx} = app.globalData;

Page({
  data: {
    userInfo: {},
    type:2,
    routeOption:{
      url:'/pages/logs/logs',
      type:4
    }
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad () {

  },
  getUserInfo: function(e) {
  },
  set(){
    console.log("2-----")
  }
})
