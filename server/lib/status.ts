import App from "../app";

/**
 * FileName : status.ts
 * ProjectName : ts-node
 * Author : terrorblade
 * Created Date: 2019-09-04 17:25:57
 * Description : 
 * -----
 * Last Modified: 2019-09-05 17:03:40
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
import {API_STATUS} from './interface/common';

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
    code101(name:string=''): API_STATUS{
        return {
            code:101,
            msg:'缺少必传参数字段'+name
        }
    }
    /**
     * 
     */
    code102(name:string='', msg:string=''): API_STATUS {
        return {
            code: 102,
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
    /**
     * @name 500服务器异常错误
     */
    code500(): API_STATUS {
        return {
            code: 500,
            msg: '服务异常错误'
        }
    }
}

export default new Status();