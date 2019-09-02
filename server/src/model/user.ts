/**
 * FileName : user.ts
 * ProjectName : myblog-vue.cli-3.0-node-ts
 * Author : terrorblade
 * Created Date: 2019-08-30 11:35:32
 * Description : 
 * -----
 * Last Modified: 2019-08-30 11:51:25
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

import Db from './db';
import * as moment from 'moment';

class User extends Db{
    constructor(){
        super();
    }
    async INSERT_USER_WXAPP(data):Promise<any>{
        const sql = `insert into user_wxapp values (null,"${data.openid}","${data.avatarUrl}","${data.name}",${data.gender},"${data.school}",
            "${data.gradeTime}","${data.departments}","${data.specialty}","${data.class}","${data.iphone}","${data.email}","${data.job}",
            "${data.duty}","${data.nowLive}","${data.residentship}","${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}","","${data.remark}")`;
        return await this.query(sql);
    }
}