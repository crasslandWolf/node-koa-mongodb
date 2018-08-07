/**
 * @Author: jinzhengkun
 * @Date: 2018-08-07 21:15:40
 * @Last Modified by: jinzhengkun
 * @Last Modified time: 2018-08-07 21:16:10
 * 请求拦截器
 */
import { Context } from 'koa';

export default async (ctx: Context, next: () => Promise<any>) => {
    const origin = ctx.request.headers.origin || '';
    if (/.domain.com$/ig.test(origin) || /localhost/ig.test(origin) || /127.0.0.1/ig.test(origin)) { // 允许跨域
        ctx.set('Access-Control-Allow-Origin', origin);
    }
    ctx.set({
        'Access-Control-Allow-Credentials': 'true', // 跨域携带 cookie
        'Access-Control-Allow-Headers': 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With, x-app-code',
        'Access-Control-Allow-Methods': 'PUT,PATCH,POST,GET,DELETE,OPTIONS',
        'Access-Control-Max-Age': '1728000',
        'Content-Type': 'application/jsoncharset=utf-8'
      });

    // OPTIONS
    if (ctx.request.method === 'OPTIONS') {
        ctx.status = 200;
        return false;
    }
    /**
     * 所有管理员的接口统一再次拦截(理想)
     */
    await next();
};