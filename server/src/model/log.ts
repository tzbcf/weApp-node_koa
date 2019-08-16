/**
 * FileName : log.ts
 * ProjectName : myblog-vue.cli-3.0-node-ts
 * Author : terrorblade
 * Created Date: 2019-08-16 17:21:29
 * Description : 
 * -----
 * Last Modified: 2019-08-16 17:35:05
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
import Db from './db';
import * as moment from 'moment';
class Log extends Db{
    constructor(){
        super();
    }
    async INSERT_SYSTEM_LOG(data: any):Promise<any>{
        const sql = `insert into log_system_run values (null,"${data.name}","${data.detail}","${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}")`;
        return await this.query(sql);
    }
}

export default new Log;