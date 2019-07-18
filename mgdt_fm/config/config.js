/**
 * FileName : app.js
 * ProjectName : config
 * Author : terrorblade
 * Created Date: 2019-04-22 22:28:35
 * Description : 
 * -----
 * Last Modified: 2019-05-27 15:40:51
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

const env = __wxConfig.platform;

const apiUrl = () => {
    switch(env){
        case "devtools":
            return {
                        devUrl:'https://www.terrorblade.xyz',
                        url:'https://fm.tingdao.com'
                    };
            break;
        default:
            return {
                devUrl:'https://www.terrorblade.xyz',
                url:'https://fm.tingdao.com'
            };
            break;
    }
}
module.exports = {
    apiUrl,
    env
}