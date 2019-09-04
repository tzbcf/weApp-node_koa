/**
 * FileName : log.ts
 * ProjectName : wxApp-server
 * Author : terrorblade
 * Created Date: 2019-08-16 17:21:29
 * Description : 
 * -----
 * Last Modified: 2019-09-04 16:58:40
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
    /**
     * @name 插入日志运行数据
     * @param data 
     */
    async INSERT_SYSTEM_LOG(data: any):Promise<any>{
        JSON.stringify
        const sql = `insert into log_system_run values (null,"${data.name}","${data.detail}","${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}","${data.remark}")`;
        return await this.query(sql);
    }
    /**
     * @name 插入请求日志
     * @param data 
     */
    async INSERT_SYSTEM_REQUEST_LOG(data: any):Promise<any>{
        const sql = `insert into log_system_request values (null,"${data.protocol}","${data.method}","${data.host}","${data.path}","${data.querystring}","${data.token}","${data.status}",
            '${data.requestBody}','${data.responseBody}',"${data.differenceTime}","${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}","${data.remark}");`;
        return await this.query(sql);
    }
}

export default new Log;