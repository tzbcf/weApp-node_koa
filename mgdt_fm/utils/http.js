/**
 * FileName : http.js
 * ProjectName : utils
 * Author : terrorblade
 * Created Date: 2019-05-16 11:33:19
 * Description : 
 * -----
 * Last Modified: 2019-05-23 16:58:01
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

const http = (url,data) => {
    return new Promise((resolve,reject)=>{
        wx.request({
            url:url,
            method:'POST',
            data:data,
            dataType:'json',
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success:res=>{
                if(res.statusCode == 200 && res.data.biz && Array.isArray(res.data.biz.content)){
                    resolve(res.data.biz)
                }else {
                    console.warn(res.data.desc);
                    resolve([])
                }
            },
            fail:err=>{
                console.warn(err);
                reject(err);
                wx.showToast({
                    title: '网络错误',
                    icon: 'none',
                    duration: 1500
                })
            }
        })
    })
}
module.exports = {
    http
}
  