/**
 * FileName    : wechat.ts
 * ProjectName : koa-ts
 * Author      : terrorblade
 * Created Date: 2019-01-09 09:43:08
 * Description : 
 * -----
 * Last Modified: 2019-07-18 15:10:36
 * Modified By  : 
 * -----
 * Copyright (c) 2018 Huazhi Corporation. All rights reserved.
 */

import * as koaRouter from 'koa-router';
import wechat from '../controller/wechat';
const router = new koaRouter();
/**
 * @wechat 微信api接口
 */
router.get('/api/v1/wechat/init',wechat.init);
router.post('/api/v1/wechat/init',wechat.postInit);
router.post('/api/v1/wechat/getUserInfo',wechat.getUserInfo);
router.get('/api/v1/wechat/weapp/login',wechat.weAppLogin);
router.post('/api/v1/wechat/getWechatConfig',wechat.getWechatConfig);


export default router;