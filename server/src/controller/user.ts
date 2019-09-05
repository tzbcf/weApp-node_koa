/**
 * FileName : user.ts
 * ProjectName : wxApp-server
 * Author : terrorblade
 * Created Date: 2019-08-14 15:32:58
 * Description : 
 * -----
 * Last Modified: 2019-09-05 11:40:21
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

import * as koaRouter from 'koa-router';
import { Context } from 'vm';
import verify from '../../lib/paramVerify';
import status from '../../lib/status';
const router = new koaRouter();

/**
 * @param {
	"openid":"asdadsasdsadaddasda", // 用户微信小程序标识符
	"avatarUrl":"asdadadadsadasdadadasda", // 用户微信头像
	"userName":"asdadsadadadasdadasdadasd", // 用户名称
	"gender":1, // 用户性别
	"school":"sadsadasdsadad", // 用户学校
	"gradeTime":"2014级", // 用户入学年级
	"departments":"院校", // 用户院校
	"specialty":"专业", // 用户专业
	"className":"班级", // 用户班级
	"iphone":"手机号", // 用户手机号
	"email":"邮箱", // 用户邮箱 **非必须
	"company":"公司名", // 用户公司
	"duty":"职业", // 用户职业
	"nowLive":"现居住地", // **非必须
	"residentship":"原居住地" // **非必须
    }
*/
router.post('/api/v1/user/addWxAppUser', (ctx:Context)=>{
    const {body} = ctx.request;
    const gender = body.gender;
    delete body.gender;
    const objStr = body;
    const paramStr = verify.stringVerify(objStr);
    if (!paramStr.flag) {
        ctx.body = status.code101(paramStr.name);
        return;
    }
    const  paramNum = verify.numberVerify({gender});
    if (!paramNum.flag) {
        ctx.body = status.code101(paramNum.name);
        return;
    }
    ctx.body = status.success();
});

module.exports = router;
