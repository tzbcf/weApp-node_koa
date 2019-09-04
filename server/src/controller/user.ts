/**
 * FileName : user.ts
 * ProjectName : wxApp-server
 * Author : terrorblade
 * Created Date: 2019-08-14 15:32:58
 * Description : 
 * -----
 * Last Modified: 2019-09-04 16:58:40
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

import * as koaRouter from 'koa-router';
import { Context } from 'vm';
import verify from '../../lib/paramVerify';
const router = new koaRouter();

router.post('/api/v1/user/addWxAppUser', (ctx:Context)=>{
    const body = ctx.request.body;
    console.log('------',body);
    const param = verify.stringVerify(body.a,body.b,body.c);
    console.log('---',param)
    // if (body) {
        
    // }
    ctx.body = '11';
});

module.exports = router;
