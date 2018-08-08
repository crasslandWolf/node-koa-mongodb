import * as koa from 'koa';

export interface IParams {
    ctx: koa.Context;
    message: string;
    err?: any;
    result?: any;
}

/**
 * 获取用户信息，每个接口都加入
 * @param ctx
 */
const getUserInfo = () => {
    return {
        name: 'wolf'
    };
};

export const resError = (
    {ctx, message = '请求失败, 服务器内部错误，请联系管理员', err = ''}: IParams
) => {
    ctx.body = {code: 1, message, success: false,  debug: err, userInfo: getUserInfo() };
};

export const resSuccess = (
    { ctx, message = '请求成功', result = ''}: IParams
) => {
    ctx.response.body = { code: 0, message, success: true, result, userInfo: getUserInfo() };
};

export const resValidate = (
    {ctx, message = '接口协议出错', result = ''}: IParams
) => {
    ctx.response.body = { code: 2, message, success: false, result, userInfo: getUserInfo() };
};
