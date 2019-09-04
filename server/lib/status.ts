import App from "../app";

/**
 * FileName : status.ts
 * ProjectName : ts-node
 * Author : terrorblade
 * Created Date: 2019-09-04 17:25:57
 * Description : 
 * -----
 * Last Modified: 2019-09-04 17:46:49
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

interface API_STATUS{
    code:number,
    msg:string,
    datas?:any
}

class Status{
    /**
     * @name 成功状态
     * @param datas 返回参数
     */
    success(datas:any = []): API_STATUS {
        return {
            code: 0,
            msg: 'success',
            datas
        }        
    }
    /**
     * 
     */
    code101(name:string='', msg:string=''): API_STATUS {
        return {
            code: 101,
            msg: '参数'+name+(msg?msg:'不合法')
        }
    }
    /**
     * @name 404状态
     */
    code404(): API_STATUS {
        return {
            code: 404,
            msg: '路由不存在'
        }
    }
}

export default new Status();