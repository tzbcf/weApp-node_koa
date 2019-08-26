/*
 * FileName : createTable
 * ProjectName : myblog-vue.cli-3.0-node-ts
 * Author : terrorblade
 * Created Date: 2019-08-16 11:25:30
 * Description : 
 * -----
 * Last Modified: 2019-08-16 11:28:33
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

import Db from './db';
import { debug } from 'util';

class CreatedTable extends Db {
    constructor(){
        super();
    }
    CONNECT_VERIFY(){ // 启动判断是否能正常链接数据库
        return this.query('SELECT 1').catch(() => {
            throw Error;
        });
    }
    async CREATE_TABLE(){ // 启动创建数据库
        try {
            const keyArr = Object.getOwnPropertyNames(CreatedTable.prototype)
                .filter((v: string) => v !== 'CREATE_TABLE')
                .filter((v: string) => v !== 'constructor');
            for (let i=0;i<keyArr.length;i++) {
                await this[keyArr[i]]();
            }
        } catch (error) {
            throw error;
        }
    }
    CREATE_LOG_SYSTEM_RUN(){ // 创建运行日志表
        const sql = `CREATE TABLE IF NOT EXISTS log_system_run(
            log_id INT(5) NOT NULL AUTO_INCREMENT,
            log_name VARCHAR(255) NOT NULL,
            log_detail TEXT(65534) NOT NULL,
            log_time DATETIME NOT NULL,
            log_remark TEXT(65534),
            PRIMARY KEY (log_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
        return this.query(sql);
    }
    CREATE_LOG_SYSTEM_REQUEST(){ //创建请求日志表
        const sql = `CREATE TABLE IF NOT EXISTS log_system_request(
            log_id INT(5) NOT NULL AUTO_INCREMENT,
            log_protocol VARCHAR(255) NOT NULL,
            log_method VARCHAR(12) NOT NULL,
            log_host VARCHAR(255) NOT NULL,
            log_path VARCHAR(255) NOT NULL,
            log_querystring VARCHAR(255),
            log_token VARCHAR(255),
            log_status VARCHAR(4),
            log_request_body VARCHAR(255) NOT NULL,
            log_response_body TEXT(65534) NOT NULL,
            log_difference_time VARCHAR(255) NOT NULL,
            log_time DATETIME NOT NULL,
            log_remark TEXT(65534),
            PRIMARY KEY (log_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
        return this.query(sql);
    }
}

export default new CreatedTable();


