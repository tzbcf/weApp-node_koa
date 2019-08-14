/**
 * FileName : user.ts
 * ProjectName : myblog-vue.cli-3.0-node-ts
 * Author : terrorblade
 * Created Date: 2019-08-14 15:32:58
 * Description : 
 * -----
 * Last Modified: 2019-08-14 15:35:21
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

import * as koaRouter from 'koa-router';
import { Context } from 'vm';
const router = new koaRouter();

router.get('/api/v1/user/getUser', (ctx:Context)=>{
    ctx.body = '11';
});

module.exports = router;
