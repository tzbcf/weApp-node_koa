/**
 * FileName : log.ts
 * ProjectName : ts-node
 * Author : terrorblade
 * Created Date: 2019-09-05 16:16:37
 * Description : 
 * -----
 * Last Modified: 2019-09-05 16:23:53
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
import {REMARK} from './common';

export interface SYSTEM_RUN extends REMARK{
    name: string,
    detail: string
}

export interface SYSTEM_REQUEST_LOG extends REMARK{
    protocol: string,
    method: string,
    host: string,
    path: string,
    querystring: string,
    token: string,
    status: number,
    requestBody: string,
    responseBody: string,
    differenceTime: string
}
