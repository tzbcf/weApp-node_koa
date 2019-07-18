/**
 * FileName : index.js
 * ProjectName : imageLoad
 * Author : terrorblade
 * Created Date: 2019-05-23 16:50:08
 * Description : 
 * -----
 * Last Modified: 2019-05-23 16:52:09
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

/**
 * 图片预加载组件
 */
Component({
    properties: {
      //默认图片
      defaultImage: String,
      //默认颜色
      type:Number, // 1是defaultImage 2是background
      defaultColor:String,//默认颜色  
      //原始图片
      originalImage: String,
      width: String,
      height: String,
      //图片剪裁mode，同Image组件的mode
      mode: String
    },
    data: {
      finishLoadFlag: false
    },
    methods: {
      finishLoad: function (e) {
        this.setData({
          finishLoadFlag: true
        })
      }
    }
})
