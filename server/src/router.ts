/**
 * FileName : router.ts
 * ProjectName : wxApp-server
 * Author : terrorblade
 * Created Date: 2019-08-13 15:47:27
 * Description : 
 * -----
 * Last Modified: 2019-09-04 16:58:40
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
// import * as requireDirectory from 'require-directory';
import * as koaRouter from 'koa-router';
import * as path from 'path';
import requireRouter from '../lib/requireRouter';
// const Router = new koaRouter();
class RouterModule extends requireRouter{
    constructor(app){
        super(path.resolve(__dirname, './controller'), (obj: any) => {
            if (obj instanceof koaRouter) {
                app.use(obj.routes());
            }
        } );
    }
}
export default RouterModule;