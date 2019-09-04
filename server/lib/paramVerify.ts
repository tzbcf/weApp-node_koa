import { stringify } from 'querystring';

/**
 * FileName : parameter.ts
 * ProjectName : wxApp-server
 * Author : terrorblade
 * Created Date: 2019-08-30 14:52:49
 * Description : 
 * -----
 * Last Modified: 2019-09-04 16:58:40
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

class ParamVerify {
    /**
     * @name 检验字符串
     * @param args 
     */
    stringVerify(...args){
        let flag = true;
        args.forEach(v=>{
            if (typeof v != "string") {
                flag = false;
            }
        });
        return flag;
    }
    /**
     * @name 检验字符串且长度不得超过16
     * @param args 
     */
    stringVerify_16(...args){
        let flag = true;
        args.forEach(v=>{
            if (typeof v != "string" && v.length < 16) {
                flag = false;
            }
        });
        return flag;
    }
    /**
     * @name 检验字符串且长度不得超过32
     * @param args 
     */
    stringVerify_32(...args){
        let flag = true;
        args.forEach(v=>{
            if (typeof v != "string" && v.length < 32) {
                flag = false;
            }
        });
        return flag;
    }
    /**
     * @name 检验数值类型
     * @param args 
     */
    numberVerify(...args){
        let flag = true;
        args.forEach(v=>{
            if (typeof v != "number" && v.length < 32) {
                flag = false;
            }
        });
        return flag;
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
}

export default new ParamVerify();
