/**
 * FileName : routerLoger.ts
 * ProjectName : myblog-vue.cli-3.0-node-ts
 * Author : terrorblade
 * Created Date: 2019-08-26 15:03:29
 * Description : 
 * -----
 * Last Modified: 2019-08-26 17:12:34
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
import { Context } from 'vm';
import log from '../src/model/log';

export default async (ctx:Context,next:Function) => {
    const startTime = new Date().getTime();
    await next();
    const endTime = new Date().getTime();
    const token = ctx.request.header.token || '';
    log.INSERT_SYSTEM_REQUEST_LOG({
        protocol:ctx.protocol,
        method:ctx.method,
        host:ctx.host,
        path:ctx.path,
        querystring:ctx.querystring||'',
        token:token,
        status:ctx.status,
        requestBody:JSON.stringify(ctx.request.body)||'',
        responseBody:ctx.response.body||'',
        differenceTime: `${endTime-startTime}`
    })
};
