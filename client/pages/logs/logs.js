//logs.js
const app = getApp();
const {userInfo,base} = app.globalData;

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return base.formatTime(new Date(log))
      })
    })
  }
})
