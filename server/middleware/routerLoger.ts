/**
 * FileName : routerLoger.ts
 * ProjectName : wxApp-server
 * Author : terrorblade
 * Created Date: 2019-08-26 15:03:29
 * Description : 
 * -----
 * Last Modified: 2019-09-05 15:21:28
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
import { Context } from 'vm';
import Log from '../src/model/log';
import status from '../lib/status';
import Base from '../lib/base';
const base = new Base();
const logs = new Log();
export default async (ctx:Context,next:Function) => {
    const startTime = new Date().getTime();
    await next();
    if (ctx.status != 200) {
        ctx.body = status.code404();
        ctx.status = 404;
    }
    const endTime = new Date().getTime();
    const token = ctx.request.header.token || '';
    let resBody;
    if (base.isJson(ctx.response.body)) {
        resBody = JSON.parse(ctx.response.body);
    } else {
        resBody = ctx.response.body;
    }
    logs.INSERT_SYSTEM_REQUEST_LOG({
        protocol:ctx.protocol,
        method:ctx.method,
        host:ctx.host,
        path:ctx.path,
        querystring:ctx.querystring||'',
        token:token,
        status:ctx.status,
        requestBody:JSON.stringify(ctx.request.body)||'',
        responseBody:JSON.stringify(resBody)||'',
        differenceTime: `${endTime-startTime}`
    });
};
