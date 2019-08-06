/**
 * FileName    : common.ts
 * ProjectName : koa-ts
 * Author      : terrorblade
 * Created Date: 2019-01-09 09:11:15
 * Description : 
 * -----
 * Last Modified: 2019-08-06 16:50:19
 * Modified By  : 
 * -----
 * Copyright (c) 2018 Huazhi Corporation. All rights reserved.
 */
import { Context } from "vm";
import status from '../../lib/status';
const configPath = '../../../config';
const config = require(`${configPath}/config.${global['env']}`).default;
class Common{
    constructor(){
      
    };
    uploadImg(ctx:Context):void{
        try{
            const r = status.success();
            r.datas = {};
            r.datas.url = `${config.protocol}://${config.host}:${config.configuration.port}/uploads/${ctx.req.file.filename}`;
            ctx.body = r;
        }catch(e){
            ctx.body = status.param410();
        }

    };
    cs(ctx:Context):void{
        ctx.body = status.success();
    }
};
export default new Common();
