//app.js
import Base from './base/base';
import WxApi from './base/wxApi';
import Api from './base/api';

App({
  login(){},
  globalData: {
    openid: null,
    userInfo: null,
    userData: null,
    base: new Base(),
    api: new Api(),
    Wx: new WxApi()
  }
})