/**
 * FileName : requireRouter.ts
 * ProjectName : myblog-vue.cli-3.0-node-ts
 * Author : terrorblade
 * Created Date: 2019-08-14 14:49:37
 * Description : 
 * -----
 * Last Modified: 2019-08-14 15:32:43
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
import * as path from 'path';
import * as fs from 'fs';
class requireRouter {
    constructor(urlStr:string, fn:Function){
        try {
            const url = path.resolve(__dirname,urlStr);
            const fileList = fs.readdirSync(url);
            fileList.forEach((v: string) => {
                fn(require(url + '/' + v));
            });
        } catch (error) {
            throw error;
        }
    }
}
export default requireRouter;