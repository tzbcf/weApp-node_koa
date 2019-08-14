/**
 * FileName : router.ts
 * ProjectName : myblog-vue.cli-3.0-node-ts
 * Author : terrorblade
 * Created Date: 2019-08-13 15:47:27
 * Description : 
 * -----
 * Last Modified: 2019-08-14 15:32:37
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
// import * as requireDirectory from 'require-directory';
import * as koaRouter from 'koa-router';
import requireRouter from '../lib/requireRouter';
// const Router = new koaRouter();
class RouterModule extends requireRouter{
    constructor(app){
        super('../src/controller', (obj: any) => {
            if (obj instanceof koaRouter) {
                app.use(obj.routes());
            }
        } );
    }
}
export default RouterModule;