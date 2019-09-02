import { stringify } from 'querystring';

/**
 * FileName : parameter.ts
 * ProjectName : myblog-vue.cli-3.0-node-ts
 * Author : terrorblade
 * Created Date: 2019-08-30 14:52:49
 * Description : 
 * -----
 * Last Modified: 2019-08-30 15:11:25
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
}

export default new ParamVerify();
