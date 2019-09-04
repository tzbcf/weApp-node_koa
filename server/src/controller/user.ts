/**
 * FileName : user.ts
 * ProjectName : wxApp-server
 * Author : terrorblade
 * Created Date: 2019-08-14 15:32:58
 * Description : 
 * -----
 * Last Modified: 2019-09-04 17:48:08
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

import * as koaRouter from 'koa-router';
import { Context } from 'vm';
import verify from '../../lib/paramVerify';
import status from '../../lib/status';
const router = new koaRouter();

router.post('/api/v1/user/addWxAppUser', (ctx:Context)=>{
    const {body} = ctx.request;
    const param = verify.stringVerify({a:body.a,b:body.b,c:body.c});
    if (!param.flag) {
        ctx.body = status.code101(param.name);
        return;
    }
    ctx.body = '11';
});

module.exports = router;
