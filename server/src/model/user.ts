/**
 * FileName : user.ts
 * ProjectName : wxApp-server
 * Author : terrorblade
 * Created Date: 2019-08-30 11:35:32
 * Description : 
 * -----
 * Last Modified: 2019-09-05 17:01:19
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

import Db from './db';
import * as moment from 'moment';
import {WXAPP_USER_SCHOOL, WXAPP_USER_ID, WXAPP_USER_COMPANY, WXAPP_USER_TABLE} from '../../lib/interface/user';

class User extends Db{
    constructor(){
        super();
    }
    /**
     * @name 插入用户基础数据
     * @param data 参见创建表
     */
    async INSERT_USER_WXAPP(data:WXAPP_USER_TABLE):Promise<any>{
        const sql = `insert into user_wxapp values (null,"${data.openid}","${data.avatarUrl}","${data.userName}",${data.gender},${data.school_id},
            "${data.gradeTime}","${data.departments_id}","${data.specialty_id}","${data.class_id}","${data.iphone}","${data.email}","${data.job_id}",
            "${data.duty}","${data.nowLive}","${data.residentship}","${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}",null,"${data.remark||''}");`;
        return await this.query(sql);
    }
    /**
     * @name 创建学校数据
     * @param data 学校名称 和备注
     */
    async INSERT_USER_WXAPP_SCHOOL(data:WXAPP_USER_SCHOOL):Promise<any>{
        const sql = `insert into user_wxapp_school values (null,"${data.school}","${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}","${data.remark||''}");`;
        return await this.query(sql);
    }
    /**
     * @name 插入学校院校数据
     * @param data 
     */
    async INSERT_USER_WXAPP_SCHOOL_DEP(data:WXAPP_USER_ID):Promise<any>{
        const sql = `insert into user_wxapp_school_departments values (null,"${data.id}","${data.name}","${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}","${data.remark||''}");`;
        return await this.query(sql);
    }
    /**
     * @name 插入专业数据
     * @param data 
     */
    async INSERT_USER_WXAPP_DEP_SPECIALTY(data:WXAPP_USER_ID):Promise<any>{
        const sql = `insert into user_wxapp_dep_specialty values (null,"${data.id}","${data.name}","${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}","${data.remark||''}");`;
        return await this.query(sql);
    }
    /**
     * @name 插入班级数据
     * @param data 
     */
    async INSERT_USER_WXAPP_DEP_CLASS(data:WXAPP_USER_ID):Promise<any>{
        const sql = `insert into user_wxapp_spe_class values (null,"${data.id}","${data.name}","${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}","${data.remark||''}");`;
        return await this.query(sql);
    }
    /**
     * @name 插入公司数据
     * @param data 
     */
    async INSERT_USER_WXAPP_COMPANY(data:WXAPP_USER_COMPANY):Promise<any>{
        const sql = `insert into user_wxapp_company values (null,"${data.company}","${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}","${data.remark||''}");`;
        return await this.query(sql);
    }
}
export default User;