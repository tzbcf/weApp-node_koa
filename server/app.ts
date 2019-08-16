/**
 * FileName : app.ts
 * ProjectName : myblog-vue.cli-3.0-node-ts
 * Author : terrorblade
 * Created Date: 2019-08-12 15:32:17
 * Description : 
 * -----
 * Last Modified: 2019-08-16 17:57:22
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
import * as koa from 'koa';
import * as path from 'path';
import * as jsonBody from 'koa-json';
import * as kosLogger from 'koa-logger';
import * as koaStatic from 'koa-static';
import * as bodyparser from 'koa-bodyparser';
import * as session from 'koa-session';
import RouterModule from './src/router';
import createTable from './src/model/createTable';
import log from './src/model/log';
// import logger from './lib/logger';
// import commonRouter from './server/router/common';
// import wechatRouter from './server/router/wechat';
import historyApiFallback from './middleware/historyFillback';
class App {
    public koa: koa.Application;
    constructor(){
        this.mysqlStart();
        this.koa = new koa();
        this.middleware();
        this.router();
        this.error();
    }
    mysqlStart() {
        createTable.CREATE_TABLE();
        log.INSERT_SYSTEM_LOG({
            name:'1231',
            detail:'123131313'
        })
    }
    middleware () {
        this.koa.use(kosLogger());//日志
        this.koa.use(historyApiFallback());//vue打包的history模式
        this.koa.use(koaStatic(path.join(__dirname, './public')));//静态容器
        this.koa.use(jsonBody());//json解析
        this.koa.use(bodyparser({
            enableTypes: ['json', 'form', 'text'],
            onerror(err: any, ctx: any) {
                // logger.logRes(ctx, JSON.stringify(err));
                ctx.throw('body parse error', 422);
            }
        }));

        this.koa.keys = ['some secret hurr'];
        const CONFIG = {
            key: 'koa:sess',
            maxAge: 86400000,
            overwrite: true,
            httpOnly: true,
            signed: true,
            rolling: false,
            renew: false,
        };
        const self = this;
        this.koa.use(session(CONFIG, self.koa));
    }
    router () {
        new RouterModule(this.koa);
    }
    error () {
        process.on('uncaughtException', (err: any): void => {
            console.error(JSON.stringify(err.stack));
            // logger.logError(JSON.stringify(err.stack), 'uncaughtException');
        });
    }
}
export default App;