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
/**
 * @name CONNECT_VERIFY 判断数据库是否正常
 * @name CREATE_TABLE 启动创建表
 * @name CREATE_LOG_SYSTEM_RUN 创建运行日志表
 * @name CREATE_LOG_SYSTEM_REQUEST 创建请求日志表
 * @name CREATE_USER_WXAPP 创建微信小程序用户表
 * @name CREATE_SHCHOOL_NAME 创建学校表
 * @name CREATE_SCHOOL_DEPARTMENTS 创建院校表
 * @name CREATE_DEP_SPECIALTY 创建专业表
 * @name CREATE_CLASS_TABLE 创建班级表
 * @name CREATE_COMPANY_TABLE 创建公司表
 * 
 */
import Db from './db';

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
    /**
     * @name 创建运行日志表
     * @param 
     *  log_id 主键序号
     * log_name 系统错误名称
     * log_detail 系统错误详情
     * log_time 系统报错时间
     * log_remark 系统备注
     */
    async CREATE_LOG_SYSTEM_RUN(){
        const sql = `CREATE TABLE IF NOT EXISTS log_system_run(
            log_id INT(11) NOT NULL AUTO_INCREMENT,
            log_name VARCHAR(255) NOT NULL,
            log_detail TEXT(65534) NOT NULL,
            log_time DATETIME NOT NULL,
            log_remark VARCHAR(255),
            PRIMARY KEY (log_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
        return await this.query(sql);
    }
    /**
     * @name 创建请求日志表
     * @param
     *  log_id 主键名
     *  log_protocol 请求协议
     * log_method 请求方式
     * log_host 请求域名
     * log_path 接口地址
     * log_querystring 地址后的参数
     * log_token 请求token
     * log_status 请求完成后状态码
     * log_request_body 请求参数
     * log_response_body 返回数据
     * log_difference_time 接口耗时
     * log_time 请求时间
     * log_remark 请求备注
     */
    async CREATE_LOG_SYSTEM_REQUEST(){
        const sql = `CREATE TABLE IF NOT EXISTS log_system_request(
            log_id INT(11) NOT NULL AUTO_INCREMENT,
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
            log_remark VARCHAR(255),
            PRIMARY KEY (log_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
        return await this.query(sql);
    }
    /**
     * @name 创建微信小程序用户表
     * @param
     *  user_id 用户主键
     * user_openid 用户openid
     * user_avatarUrl 用户头像
     * user_name 用户姓名
     * user_gender 性别
     * user_school_id 学校id
     * user_grade_time 入学年级
     * user_departments_id 院校id
     * user_specialty_id 专业id
     * user_class_id 班级id
     * user_iphone 用户手机
     * user_email 用户邮箱
     * user_company_id 公司id
     * user_duty 岗位
     * user_now_live 现居住地
     *  user_residentship 原居住地
     * user_create_time 创建时间
     * user_update_time 修改时间
     * user_remark 备注
     */
    async CREATE_USER_WXAPP(){
        const sql = `CREATE TABLE IF NOT EXISTS user_wxapp(
            user_id INT(11) NOT NULL AUTO_INCREMENT,
            user_openid VARCHAR(255) NOT NULL,
            user_avatarUrl VARCHAR(255) NOT NULL,
            user_name VARCHAR(16) NOT NULL,
            user_gender INT(1) NOT NULL,
            user_school_id INT(4) NOT NULL,
            user_grade_time VARCHAR(16) NOT NULL,
            user_departments_id INT(4) NOT NULL,
            user_specialty_id INT(4) NOT NULL,
            user_class_id INT(4) NOT NULL,
            user_iphone VARCHAR(16) NOT NULL,
            user_email VARCHAR(32) NOT NULL,
            user_company_id INT(4) NOT NULL,
            user_duty VARCHAR(32),
            user_now_live VARCHAR(64),
            user_residentship VARCHAR(64),
            user_create_time DATETIME NOT NULL,
            user_update_time DATETIME,
            user_remark VARCHAR(255),
            PRIMARY KEY (user_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
        return await this.query(sql);
    }
    /**
     * @name 创建学校表
     * @param
     * school_id 学校主键名
     * school_name 学校名称
     * school_time 学校创建时间
     * school_remark 学校备注
     */
    async CREATE_SHCHOOL_NAME(){
        const sql = `CREATE TABLE IF NOT EXISTS user_wxapp_school(
            school_id INT(4) NOT NULL AUTO_INCREMENT,
            school_name VARCHAR(32) NOT NULL,
            school_time DATETIME NOT NULL,
            school_remark VARCHAR(255),
            PRIMARY KEY (school_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
        return await this.query(sql);
    }
    /**
     * @name 创建院校表
     * @param
     * dep_id 院校主键
     * school_id 学校id
     * dep_name 院校名称
     * dep_time 创建院校时间
     * dep_remark 院校备注
     */
    async CREATE_SCHOOL_DEPARTMENTS(){
        const sql = `CREATE TABLE IF NOT EXISTS user_wxapp_school_departments(
            dep_id INT(4) NOT NULL AUTO_INCREMENT,
            school_id INT(4) NOT NULL,
            dep_name VARCHAR(32) NOT NULL,
            dep_time DATETIME NOT NULL,
            dep_remark VARCHAR(255),
            PRIMARY KEY (dep_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
        return await this.query(sql);
    }
    /**
     * @name 创建专业表
     * @param
     * spe_id 专业主键
     * dep_id 院校id
     * spe_name 专业名称
     * spe_time 创建时间
     * spe_remark 备注
     */
    async CREATE_DEP_SPECIALTY(){
        const sql = `CREATE TABLE IF NOT EXISTS user_wxapp_dep_specialty(
            spe_id INT(11) NOT NULL AUTO_INCREMENT,
            dep_id INT(4) NOT NULL,
            spe_name VARCHAR(32) NOT NULL,
            spe_time DATETIME NOT NULL,
            spe_remark VARCHAR(255),
            PRIMARY KEY (spe_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
        return await this.query(sql);
    }
    /**
     * @name 创建班级表
     * @param
     * class_id 班级表
     * spe_id 专业id 
     * class_name 专业名称
     * class_time 创建时间
     * class_remark 备注
     */
    async CREATE_CLASS_TABLE(){
        const sql = `CREATE TABLE IF NOT EXISTS user_wxapp_spe_class(
            class_id INT(11) NOT NULL AUTO_INCREMENT,
            spe_id INT(11) NOT NULL,
            class_name VARCHAR(32) NOT NULL,
            class_time DATETIME NOT NULL,
            class_remark VARCHAR(255),
            PRIMARY KEY (class_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
        return await this.query(sql);
    }
    /**
     * @name 创建公司表
     * @param
     * company_id 公司主键
     * company_name 公司名称
     * company_time 公司创建时间
     * company_remark 备注
     */
    async CREATE_COMPANY_TABLE(){
        const sql = `CREATE TABLE IF NOT EXISTS user_wxapp_company(
            company_id INT(11) NOT NULL AUTO_INCREMENT,
            company_name VARCHAR(32) NOT NULL,
            company_time DATETIME NOT NULL,
            company_remark VARCHAR(255),
            PRIMARY KEY (company_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
        return await this.query(sql);
    }
}

export default new CreatedTable();


