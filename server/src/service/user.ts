/**
 * FileName : user.ts
 * ProjectName : ts-node
 * Author : terrorblade
 * Created Date: 2019-09-05 15:15:40
 * Description : 
 * -----
 * Last Modified: 2019-09-05 17:28:38
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
import modelUser from '../model/user';
import Log from '../model/log';
import {WXAPP_USER, WXAPP_USER_SCHOOL, WXAPP_USER_ID, WXAPP_USER_COMPANY} from '../../lib/interface/user';
const logs = new Log();
class User extends modelUser{
    /**
     * @name 添加微信小程序用户
     * @param objs 
     */
    async addUser(objs:WXAPP_USER){
        try{
            const schoolRes = await this.addSchool({school:objs.school});
            const depRes = await this.addDep({
                id:schoolRes.insertId,
                name: objs.departments
            });
            const speRes = await this.addSpe({
                id:depRes.insertId,
                name:objs.specialty
            });
            const classRes = await this.addClass({
                id: speRes.insertId,
                name: objs.className
            });
            const companyRes = await this.addCompany({company:objs.company});
            return await this.INSERT_USER_WXAPP({
                school_id: schoolRes.insertId,
                departments_id: depRes.insertId,
                specialty_id: speRes.insertId,
                class_id: classRes.insertId,
                job_id: companyRes.insertId,
                ...objs
            });
        }catch(e){
            logs.INSERT_SYSTEM_LOG({
                name:'addUser',
                detail:`'${e}'`
            });
        }
    }
    /**
     * @name 添加学校
     * @param data 
     */
    async addSchool(data:WXAPP_USER_SCHOOL):Promise<any>{
        try{
            return await this.INSERT_USER_WXAPP_SCHOOL(data);
        }catch(e){
            logs.INSERT_SYSTEM_LOG({
                name:'addSchool',
                detail:`'${e}'`
            });
        }
    }
    /**
     * @name 添加院校
     * @param data 
     */
    async addDep(data:WXAPP_USER_ID):Promise<any>{
        try{
            return await this.INSERT_USER_WXAPP_SCHOOL_DEP(data);
        }catch(e){
            logs.INSERT_SYSTEM_LOG({
                name:'addDep',
                detail:`'${e}'`
            });
        }
    }
    /**
     * @name 添加专业
     * @param data 
     */
    async addSpe(data:WXAPP_USER_ID):Promise<any>{
        try{
            return await this.INSERT_USER_WXAPP_DEP_SPECIALTY(data);
        }catch(e){
            logs.INSERT_SYSTEM_LOG({
                name:'addSpe',
                detail:`'${e}'`
            });
        }
    }
    /**
     * @name 添加班级
     * @param data 
     */
    async addClass(data:WXAPP_USER_ID):Promise<any>{
        try{
            return await this.INSERT_USER_WXAPP_DEP_CLASS(data);
        }catch(e){
            logs.INSERT_SYSTEM_LOG({
                name:'addClass',
                detail:`'${e}'`
            });
        }
    }
    /**
     * @name 添加公司
     * @param data 
     */
    async addCompany(data:WXAPP_USER_COMPANY):Promise<any>{
        try{
            return await this.INSERT_USER_WXAPP_COMPANY(data);
        }catch(e){
            logs.INSERT_SYSTEM_LOG({
                name:'addCompany',
                detail:`'${e}'`
            });
        }
    }
}
export default new User();