/**
 * FileName : user.ts
 * ProjectName : wxApp-server
 * Author : terrorblade
 * Created Date: 2019-08-14 15:32:58
 * Description :
 * -----
 * Last Modified: 2019-09-05 17:03:52
 * Modified By :
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

import * as koaRouter from "koa-router";
import { Context } from "vm";
import verify from "../../lib/paramVerify";
import status from "../../lib/status";
import serviceUser from '../service/user';
const router = new koaRouter();

/**
 * @param
 * {
 *	"openid":"asdadsasdsadaddasda", // 用户微信小程序标识符
 *	"avatarUrl":"asdadadadsadasdadadasda", // 用户微信头像
 *	"userName":"asdadsadadadasdadasdadasd", // 用户名称
 *	"gender":1, // 用户性别
 *	"school":"sadsadasdsadad", // 用户学校
 *	"gradeTime":"2014级", // 用户入学年级
 *	"departments":"院校", // 用户院校
 *	"specialty":"专业", // 用户专业
 *	"className":"班级", // 用户班级
 * 	"iphone":"手机号", // 用户手机号
 *	"email":"邮箱", // 用户邮箱 **非必须
 *	"company":"公司名", // 用户公司
 *	"duty":"职业", // 用户职业 **非必须
 *	"nowLive":"现居住地", // **非必须
 *	"residentship":"原居住地" // **非必须
 *   }
 */
router.post("/api/v1/user/addWxAppUser",async (ctx: Context) => {
  try{
    const { body } = ctx.request;
    // 检验是否缺少必传参数
    const mustParamArr = ['openid','avatarUrl','userName','gender','school','gradeTime','departments','specialty','className','iphone','company'];
    const mustVerify = verify.checkParamMust(body,mustParamArr);
    if (!mustVerify.flag) {
      ctx.body = status.code101(mustVerify.name);
      return;  
    }
    const gender = body.gender;
    delete body.gender;
    const objStr = body;
    // 检验字符串参数类型是否正确
    const paramStr = verify.stringVerify(objStr);
    if (!paramStr.flag) {
      ctx.body = status.code102(paramStr.name);
      return;
    }
    // 检验数值参数类型是否正确
    const paramNum = verify.numberVerify({ gender });
    if (!paramNum.flag) {
      ctx.body = status.code102(paramNum.name);
      return;
    }
    await serviceUser.addUser({gender,...body});
    ctx.body = status.success();
  }catch(e){
    ctx.body = status.code500();
  }
});

module.exports = router;
