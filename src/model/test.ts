/**
 * @Author: jinzhengkun
 * @Date: 2018-06-14 18:03:33
 * @Last Modified by: jinzhengkun
 * @Last Modified time: 2018-08-08 15:01:35
 */
import { db } from '../mongodb';
import { Document } from 'mongoose';
import * as paginate from 'mongoose-paginate'; // 分页

// 自增 id 初始化

export interface ITest extends Document {
    // 标题
    title: string;

    // 内容
    content: string;

    // 创建时间
    createTime: Date;

    // 最后更新时间
    updateTime: Date;

    // 创建人信息
    author: IAuthor;
}

export interface IAuthor {
    // 名字
    name: string;

    // 邮箱
    email: string;
}
const testSchema = new db.Schema({
    title: { type: String, required: true },
    content: {type: String, required: true},
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
    author: {
        name: { type: String, required: true},
        email: { type: String, required: false, default: ''}
    }
});

// 转化为 js 对象
testSchema.set('toObject', {getters: true});

// 翻页 + 自增 id 插件配置
testSchema.plugin(paginate);
// 时间更新
testSchema.pre('findOneAndUpdate', function (next) {
    this.findOneAndUpdate({}, { updateTime: Date.now() });
    next();
});

// 创建问题模型
const Test = db.model('Test', testSchema);

export default Test;
