/**
 * FileName : logs.ts
 * ProjectName : ts-node
 * Author : terrorblade
 * Created Date: 2019-09-04 15:34:33
 * Description : 
 * -----
 * Last Modified: 2019-09-06 09:56:19
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

import * as log4js from 'log4js';
import * as path from 'path';
import Base from './base';
import logConfig from '../config/logConfig';
class Logger extends Base{
    private logConfig: any;
    private resLogger:any;
    private errorLogger:any;
    private consoleLogger:any;
    constructor() { 
        super();
        this.logConfig = logConfig;
        this.initLogPath();
        log4js.configure(logConfig);
        this.resLogger = log4js.getLogger("resLogger");
        this.errorLogger = log4js.getLogger("errorLogger");
        this.consoleLogger = log4js.getLogger('ruleConsole');
    };
    initLogPath():void{
        //创建log的根目录'logs'
        if (this.logConfig.baseLogPath) {
            this.confirmPath(path.resolve(__dirname,`${logConfig.baseLogPath}`));
            //根据不同的logType创建不同的文件目录
            for(const attr in this.logConfig.appenders){
                if(logConfig.appenders[attr].path){
                    logConfig.appenders[attr].filename = path.resolve(__dirname,`${logConfig.appenders[attr].path}/${logConfig.appenders[attr].name}`);
                    this.confirmPath(path.resolve(__dirname,`${logConfig.appenders[attr].path}`));
                }
            }
        }
    };
    formatInfo (info:string,type:string):string{
        let logText = '';
        logText +=`\n  ${type} --- ${info} \n`;
        return logText;
    };
    /**
     * @name 日志控制台输出
     * @param type 日志登记
     * @param info 
     */
    logConsole (type:string,info:string):void{
        try {
            if(info && type){
                this.consoleLogger[type](info);
            }
        } catch(e) {
            this.consoleLogger.error(e);
        }
    };
    /**
     * @name 错误日志写入
     * @param error 报错信息
     * @param type 类型
     */
    logError (type:string,error:string):void{
        if(error && type){
            this.errorLogger.error(this.formatInfo(error,type));
        }
    };
    logInfo (type:string,info:string):void{
        if(type && info){
            this.resLogger.info(this.formatInfo(info,type));
        }
    };
}
export default new Logger();