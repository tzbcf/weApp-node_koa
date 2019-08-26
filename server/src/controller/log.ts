/**
 * FileName : log.ts
 * ProjectName : myblog-vue.cli-3.0-node-ts
 * Author : terrorblade
 * Created Date: 2019-08-14 11:23:57
 * Description : 
 * -----
 * Last Modified: 2019-08-26 17:03:04
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
import * as koaRouter from 'koa-router';
import { Context } from 'vm';
const router = new koaRouter();

router.get('/api/v1/log/getLogList', (ctx:Context)=>{
    ctx.body = '1';
});

router.get('/api/v1/log/getLogDetail', (ctx:Context)=>{
    ctx.body = '2';
});

router.post('/api/v1/log/setLog', (ctx:Context)=>{
    ctx.body = {
        a:1
    };
});

module.exports = router;

