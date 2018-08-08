/**
 * @Author: jinzhengkun
 * @Date: 2018-08-07 20:56:55
 * @Last Modified by: jinzhengkun
 * @Last Modified time: 2018-08-08 16:53:31
 */
import { Context } from 'koa';
import Test, { ITest } from '../model/test';
import { resError, resSuccess, resValidate } from '../utils/response';
class TestController {
    /**
     * 新建
     * @param ctx
     */
    public static async newTest (ctx: Context) {
        const {
            title = '',
            content = '',
            author = {
                name: '',
                email: ''
            }
        } = ctx.request.body;
        const result = await new Test({ title, content, author})
                        .save()
                        .then(res => {
                            return res;
                        })
                        .catch( err => {
                            ctx.throw(500, err);
                            return false;
                        });
        if (result) {
            resSuccess({
                ctx,
                result,
                message: '创建成功'
            });
        } else {
            resError({
                ctx,
                message: '创建失败',
                err: result
            });
        }
    }
    /**
     * 列表
     * @param ctx
     */
    public static async testList (ctx: Context) {
        const {
            page = 1, // 第几页
            pageSize = 10, // 每页数量
            keyWord = '', // 关键字查询
            sort = -1, // 排序
            author = '' // 作者
        } = ctx.request.query;

        const options: {
            sort: any,
            page: number,
            limit: number
        } = {
            sort: { createTime: Number(sort) },
            page: Number(page),
            limit: Number(pageSize)
        };

        const querys: {
            $or?: any,
            'author.name'?: string
        } = {};

        // 关键字查询
        if (keyWord) {
            const keyWordReg = new RegExp(keyWord);
            querys.$or = [
                { 'title': keyWordReg },
                { 'content': keyWordReg }
            ];
        }
        // 作者过滤
        if (author) {
            querys['author.name'] = author;
        }

        const result = await Test
                            .paginate(querys, options)
                            .then(res => {
                                return res;
                            })
                            .catch(err => {
                                ctx.throw(500, err);
                                return err;
                            });
        if (result) {
            resSuccess({
                ctx,
                message: '列表获取成功',
                result
            });
        } else {
            resError({
                ctx,
                message: '列表获取失败',
                err: result
            });
        }
    }

    /**
     * 详情
     * @param ctx
     */
    public static async testDetail (ctx: Context) {
        return ctx.body = '详情获取成功';
    }

    /**
     * 删除
     * @param ctx
     */
    public static async testDelete (ctx: Context) {
        return ctx.body = '删除成功';
    }

    /**
     * 修改
     * @param ctx
     */
    public static async testEdit (ctx: Context) {
        return ctx.body = '修改成功';
    }
}
export default TestController;
