/**
 * FileName : base.js
 * ProjectName : myblog-vue.cli-3.0-node-ts
 * Author : terrorblade
 * Created Date: 2019-07-18 11:36:38
 * Description : 
 * -----
 * Last Modified: 2019-08-06 16:50:53
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

class Base {
    constructor() {
        this.requrl='https://m.terrorblade.xyz';
		window.vConsole = new window.VConsole();
    }
    urlToObj(str){
        try {
            const obj = {};
            const arr1 = str.split("?");
            const arr2 = arr1[1].split("&");
        　　for(let i=0 ; i < arr2.length; i++){
                const res = arr2[i].split("=");
        　　　　    obj[res[0]] = res[1];
        　　}
        　　return obj;
        } catch (e) {
            return {};
        }
    }
    fetch(obj){
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.requrl + obj.url,
                type: obj.methods || 'GET',
                data: JSON.stringify(obj.data || ''),
                timeout: 5000,
                dataType: 'json',
                contentType: obj.contentType || 'application/json',
                success(res){
                    if (!res.code) {
                        resolve(res.data);
                    } else {
                        reject(res);
                    }
                },
                error(err){
                    reject(err)
                },
            })
        })
    }
    async weShare(title, sub, img, url, callback){
        const data = await this.fetch({
            url: '/api/v1/wechat/getWechatConfig',
            methods: 'POST',
            data: {
                url: url,
            }
        });
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId || '', // 必填，公众号的唯一标识
            timestamp: data.timestamp || '', // 必填，生成签名的时间戳
            nonceStr: data.nonceStr || '', // 必填，生成签名的随机串
            signature: data.signature || '',// 必填，签名
            jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"] // 必填，需要使用的JS接口列表
        });
        wx.ready((res) => {
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            console.log("------ready-res",res);
            wx.onMenuShareAppMessage({ 
                title: title, // 分享标题
                desc: sub, // 分享描述
                link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: img, // 分享图标
                success () {
                    console.log("分享好友成功")
                    if (typeof callback === 'function') {
                        callback();
                    }
                  // 设置成功
                },
                cancel(){
                    console.log("用户取消分享好友");
                }
            })
            wx.onMenuShareTimeline({ 
                title: title, // 分享标题
                link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: img, // 分享图标
                success () {
                    console.log("分享朋友圈成功")
                    if (typeof callback === 'function') {
                        callback();
                    }
                  // 设置成功
                },
                cancel(){
                    console.log("用户取消分享好友圈");
                }
            })
        });
        wx.error((err) => {
            console.log("------ready-err",err);
        })
        console.log("-------",data)
    }
    async wxAudioPlay(callback){
        const data = await this.fetch({
            url: '/api/v1/wechat/getWechatConfig',
            methods: 'POST',
            data: {
                url: url,
            }
        });
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId || '', // 必填，公众号的唯一标识
            timestamp: data.timestamp || '', // 必填，生成签名的时间戳
            nonceStr: data.nonceStr || '', // 必填，生成签名的随机串
            signature: data.signature || '',// 必填，签名
            jsApiList: [] // 必填，需要使用的JS接口列表
        });
        wx.ready((res) => {
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            console.log("------ready-res",res);
            callback()
        });
        wx.error((err) => {
            console.log("------ready-err",err);
        })
        console.log("-------",data)
    }
    isWx(){
        const ua = navigator.userAgent.toLowerCase();
        if (`${ua.match(/MicroMessenger/i)}` === 'micromessenger') { // 微信客服端
          return true;
        } else {
          return false;
        }
    }
}
const base = new Base();