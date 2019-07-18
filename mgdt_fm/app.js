//app.js
const config = require('./config/config.js')
const http = require('./utils/http')
const base = require('./utils/base')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    apiUrl: config.apiUrl(),
    imgUrl: config.apiUrl().devUrl + '/img/wxApp/',
    env: config.env,
    http:http.http,
    base:base
  }
})