/**
 * FileName : wxApi.js
 * ProjectName : base
 * Author : terrorblade
 * Created Date: 2019-08-12 17:27:33
 * Description : 
 * -----
 * Last Modified: 2019-08-13 11:54:37
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

import Base from './base';
class WxApi extends Base{
    constructor () {
        super();
    }
    /**
     * param:路由跳转
     * obj 对象，如下属性
     *  url:路径
     *  type:跳转类型
     *   1：跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
     *   2: 关闭所有页面，打开到应用内的某个页面
     *   3: 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
     *   4: 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
     *   5: 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。 
     *  delta: 返回的层数
     */
    router (
        obj
    ) {
        switch(obj.type){
            case 1:
                wx.switchTab({url:obj.url});
                break;
            case 2:
                wx.reLaunch({url:obj.url});
                break;
            case 3:
                wx.redirectTo({url:obj.url});
                break;
            case 4:
                wx.navigateTo({url:obj.url});
                break;
            case 5:
                wx.navigateBack({url:obj.url});
                break;
            default:
                wx.navigateTo({url:obj.url});
                break;
        }
    }
}
export default WxApi;