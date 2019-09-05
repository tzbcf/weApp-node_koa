/**
 * FileName : base.ts
 * ProjectName : ts-node
 * Author : terrorblade
 * Created Date: 2019-09-04 15:35:27
 * Description : 
 * -----
 * Last Modified: 2019-09-05 15:41:47
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
import * as fs from 'fs';
import * as moment from 'moment';
import * as fsex from 'fs-extra';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import {LOGIN_USER} from './interface/user';

const request = require('request').defaults({
    'pool': { 'maxSockets': 5000 }
});
const config = require(`../../config/config.${global['env']}`).default; //系统配置
class Base {
    constructor() {};
    /**
     * 
     * @fn 创建文件夹 
     * @param url路径
     */
    confirmPath(pathStr: string): void {
        if (!fs.existsSync(pathStr)) {
            fsex.mkdirSync(pathStr);
        }
    };
     /**
     * 
     * @fn 字符串变数字 
     * @param  字符串
     */
    normalizeNum(val: string): number {
        const num = parseInt(val, 10);
        if (typeof num === 'number' && !isNaN(num)) {
            return num;
        }
        return NaN;
    };
    /**
     * 
     * @fn 获取当前时间
     * @param 
     */
    standardCurrDatetime(): string {
        return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    };
    /**
     * 
     * @fn 获取某个时间
     * @param 传递一个时间 时间格式或者字符串
     */
    standardParamDatetime(date: Date): string {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    };
    /**
     * 
     * @fn 检验参数是否是邮箱
     * @param 传递一个字符串
     */
    isJson(str: string): boolean {
        if (typeof str == 'string') {
            try {
                JSON.parse(str);
                return true;
            } catch(e) {
                return false;
            }    
        }else{
            return false
        }
    };
      /**
     * 
     * @fn 获取token
     * @param 传递用户信息
     */
    getToken(data:LOGIN_USER):Promise<string>{
        return new Promise((resolve,reject)=>{
            const created = Math.floor(Date.now());
            jwt.sign({ 
                user: JSON.stringify(data),
                iat: created +3600*24*1000 }, config.cert, { algorithm: 'HS256' }, (err, token)=> {
                if(err){
                    reject('')
                }else{
                    resolve(token)
                }
           
            });
        });
    };
    /**
     * 
     * @fn 解析验证token
     * @param 传递token
     */
    verifyToken(str:string):Promise<any>{
        return new Promise((resolve,reject)=>{
            jwt.verify(str,  config.cert,(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    };
    /**
     * 
     * @fn 解析验证token
     * @param 传递token
     */
    decodeToken(str:string):any{
        const decoded = jwt.decode(str, {complete: true});
        if(!decoded){
            return false;
        }
        return decoded;
    }
     /**
     * 
     * @fn http请求
     * @param {
     *          url路径:string,
     *          method请求方式:string
     *          data:请求参数
     *}
     */
    axios(url:string,method:string,data?:any):Promise<any>{
        const self = this;
        return new Promise((resolve,reject)=>{
            const opt = {
                'url':url,
                'method':method,
                'timeout': 5000,
                'pool':false,
                'headers': {
                    'content-type': 'application/json;charset=utf-8'
                },
                'body':data ? JSON.stringify(data) : ''
            }
            request(opt,(err,res,body)=>{
                if(err){
                    const r = {
                        'code':110,
                        'msg':'请求超时'
                    }
                    reject(r);
                }else if(res.statusCode && res.statusCode === 200){
                    if(!self.isJson(body)){
                        resolve(body)
                    }else{
                        resolve(JSON.parse(body))
                    }
                }else{
                    const r = {
                        'code':100,
                        'msg':'服务器异常'
                    }
                    reject(r);
                }
            });
        });
    }
}
export default Base;
