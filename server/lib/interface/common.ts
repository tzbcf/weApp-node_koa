/**
 * FileName : common.ts
 * ProjectName : ts-node
 * Author : terrorblade
 * Created Date: 2019-09-05 15:42:28
 * Description : 
 * -----
 * Last Modified: 2019-09-05 16:19:26
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

export interface REMARK{
    remark?:string
}
export interface RETRUN_PARAM{
    name:string,
    flag:boolean
}

export interface API_STATUS{
    code: number,
    msg: string,
    datas?:any[]
}
