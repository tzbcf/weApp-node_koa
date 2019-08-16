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

class CreatedTable extends Db {
    constructor(){
        super();
    }
    CONNECT_VERIFY(){ // 启动判断是否能正常链接数据库
        this.query('SELECT 1').catch(() => {
            throw Error;
        });
    }
    CREATE_TABLE(){ // 启动创建数据库
        try {
            const keyArr = Object.getOwnPropertyNames(CreatedTable.prototype)
                .filter((v: string) => v !== 'CREATE_TABLE')
                .filter((v: string) => v !== 'constructor');
            keyArr.forEach((v: string) => {
                this[v]();
            })
        } catch (error) {
            throw error;
        }
    }
    CREATE_LOG_SYSTEM_RUN(){ // 创建日志表
        const CREATE_LOG_SYSTEM_RUN = `CREATE TABLE IF NOT EXISTS log_system_run(
            log_id INT(5) NOT NULL AUTO_INCREMENT,
            log_name VARCHAR(255) NOT NULL,
            log_detail TEXT(65534) NOT NULL,
            log_time DATETIME NOT NULL,
            PRIMARY KEY (log_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`
        this.query(CREATE_LOG_SYSTEM_RUN);
    }
}

export default new CreatedTable();


