/**
 * FileName : user.ts
 * ProjectName : ts-node
 * Author : terrorblade
 * Created Date: 2019-09-05 15:39:59
 * Description : 
 * -----
 * Last Modified: 2019-09-06 10:12:46
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
import {REMARK} from './common';

export interface LOGIN_USER{
    userName: string,
    password: string
}
interface WXAPP_USER_BASE extends REMARK{
    openid: string,
    avatarUrl: string,
    userName: string,
    gender: number,
    iphone: string,
    gradeTime: string,
    email?: string,
    duty?: string,
    nowLive?: string,
    residentship?: string
}

export interface WXAPP_USER extends WXAPP_USER_BASE{
    school: string,
    departments: string,
    specialty: string,
    className: string,
    company: string,
}

export interface WXAPP_USER_SCHOOL  extends REMARK{
    school: string
}

export interface WXAPP_USER_COMPANY  extends REMARK{
    company: string
}

export interface WXAPP_USER_ID extends REMARK{
    name: string,
    id: number
}
export interface WXAPP_USER_TABLE extends WXAPP_USER{
    school_id: number,
    departments_id: number,
    specialty_id: number,
    class_id: number,
    job_id: number
}