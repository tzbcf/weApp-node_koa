import { stringify } from 'querystring';

/**
 * FileName : parameter.ts
 * ProjectName : wxApp-server
 * Author : terrorblade
 * Created Date: 2019-08-30 14:52:49
 * Description : 
 * -----
 * Last Modified: 2019-09-05 15:44:33
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
import {RETRUN_PARAM} from './interface/common';
class ParamVerify {
    /**
     * @name 检验字符串
     * @param args 
     */
    stringVerify(objects): RETRUN_PARAM{
        let obj = {
            name: '',
            flag: true
        };
        for (const key in objects) {
            if (typeof objects[key] != 'string') {
                obj.flag = false;
                obj.name = key;
            }
        }
        return obj;
    }
    /**
     * @name 检验字符串且长度不得超过16
     * @param args 
     */
    stringVerify_16(...args){
        let obj = {
            name: '',
            flag: true
        };
        args.forEach(v=>{
            if (typeof v != "string" && v.length < 16) {
                obj.flag = false;
                obj.name = v;
            }
        });
        return obj;
    }
    /**
     * @name 检验字符串且长度不得超过32
     * @param args 
     */
    stringVerify_32(...args){
        let obj = {
            name: '',
            flag: true
        };
        args.forEach(v=>{
            if (typeof v != "string" && v.length < 32) {
                obj.flag = false;
            }
        });
        return obj;
    }
    /**
     * @name 检验数值类型
     * @param args 
     */
    numberVerify(objects): RETRUN_PARAM{
        let obj = {
            name: '',
            flag: true
        };
        for (let key in objects) {
            if (typeof objects[key] != "number") {
                obj.flag = false;
                obj.name = key;
            }
        }
        return obj;
    }
    /**
     * 
     * @fn 检验参数是否是字符
     * @param 传递一个字符串
     */
    isNumberOrLetter(str: string): boolean {
        const regu = /^[0-9a-zA-Z]+$/;
        if (regu.test(str)) {
            return true;
        }
        return false;
    };
    /**
     * 
     * @fn 检验参数是否是邮箱
     * @param 传递一个字符串
     */
    isEmail(str: string): boolean {
        const myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+.)+[A-Za-z0-9]{2,3}$/;
        if (myReg.test(str)) return true;
        return false;
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
            return false;
        }
    };
    /**
     * 
     * @param obj 需要检验的对象
     * @param arr 需要检验的字符串
     */
    checkParamMust(obj:Object,arr:string[]): RETRUN_PARAM{
        let objs = {
            name: '',
            flag: true
        };
        arr.forEach(v=>{
            if (typeof obj[v] == 'undefined') {
                objs.name = v;
                objs.flag = false;
            }
        })
        return objs;
    }
}

export default new ParamVerify();
