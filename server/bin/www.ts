/**
 * FileName : www.ts
 * ProjectName : myblog-vue.cli-3.0-node-ts
 * Author : terrorblade
 * Created Date: 2019-08-12 15:32:30
 * Description : 
 * -----
 * Last Modified: 2019-08-16 11:17:40
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
global['env'] =  process.argv.slice(2)[0] || process.env.NODE_ENV || 'dev';
const configPath = '../../config';
import App from '../app';
import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import * as https from 'https';
const debug: any = require('debug')('demo:server');
class Start extends App {
    private server : any;
    private config : any;
    private httpsOption: any;
    constructor () {
        super();
        this.config = require(`${configPath}/config.${global['env']}`).default;
        this.httpsOption = {
            key : fs.readFileSync(path.resolve(__dirname, `${configPath}/https/2_m.terrorblade.xyz.key`)),
            cert: fs.readFileSync(path.resolve(__dirname, `${configPath}/https/1_m.terrorblade.xyz_bundle.crt`)),
        };
        this.start();
    }
    start () {
        this.createHttp();
        this.createHttps();
        this.server.on('error',this.onerror);
        this.server.on('error',this.onListening);
    }
    createHttp () {
        this.server = http.createServer(this.koa.callback());
        this.server.listen(this.config.port);
        console.info(`server start listen on ${this.config.port}`);
    }
    createHttps () {
        this.server = https.createServer(this.httpsOption, this.koa.callback());
        this.server.listen(443);
        console.info(`server start listen on 443`);
    }
    onerror (error: any): void {
        if (error.syscall !== 'listen') {
            // logger.logError(JSON.stringify(error),'error')
            throw error;
        }
    
        let bind = typeof this.config.port === 'string'
            ? 'Pipe ' + this.config.port
            : 'Port ' + this.config.port;
    
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                // logger.logError(JSON.stringify(error),'EACCES')
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                // logger.logError(JSON.stringify(error),'EADDRINUSE')
                process.exit(1);
                break;
            default:
                // logger.logError(JSON.stringify(error),'onError')
                throw error;
        }
    }
    onListening () {
        const addr = this.server.address();
        let bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
        // logger.logInfo('程序启动','onListening');
    }
}
new Start()