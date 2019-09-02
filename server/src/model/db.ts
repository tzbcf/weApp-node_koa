/**
 * FileName : db.ts
 * ProjectName : myblog-vue.cli-3.0-node-ts
 * Author : terrorblade
 * Created Date: 2019-08-16 11:03:58
 * Description : 
 * -----
 * Last Modified: 2019-08-30 11:29:01
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

const config = require(`../../../config/config.${global['env']}`).default;
import * as mysql from 'mysql';
const mysqlClient = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});

class Db {
    query(sql: string): Promise<any>{
        return new Promise((resolve, reject) => {
            mysqlClient.getConnection((err, connection) => {
                if (err) {
                    console.warn('sql----------err',err);
                    reject(err);
                } else {
                    connection.query(sql, (errs, rows) => {
                        if (errs) {
                            console.warn('sql----------errs',errs);
                            reject(errs);
                        } else {
                            resolve(rows);
                        }
                        connection.release();
                    });
                }
            });
        });
    }
};

export default Db;