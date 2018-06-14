/**
 * @Author: jinzhengkun
 * @Date: 2018-06-14 18:03:33
 * @Last Modified by: jinzhengkun
 * @Last Modified time: 2018-06-14 18:58:40
 */
import { db } from '../mongodb';
import { Document } from 'mongoose';
import * as autoIncrement from 'mongoose-auto-increment'; // 自增id
import * as paginate from 'mongoose-paginate'; // 分页

// 自增 id 初始化
autoIncrement.initialize(db.connection);

export interface IQuestion extends Document {
    // 问题标题
    title: string;

    // 创建时间
    createTime: Date;

    // 最后更新时间
    updateTime: Date;

    // 问题创建人信息
    author: IAuthor;

    // 置顶标志(默认false)
    isTop: boolean;

    // 访问量(可作为判断热度的依据)
    views: number;

    // 点赞数
    likes: number;

    // 所有点赞人的 erp
    likeErp: ArrayBuffer;

    // 评论数
    commonts: number;
}

export interface IAuthor {
    // 名字
    name: string;

    // erp
    erp: string;

    // 邮箱
    email: string;
}
const questionSchema = new db.Schema({
    title: { type: String, required: true },
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
    author: {
        name: { type: String, required: false},
        erp: { type: String, required: true},
        email: { type: String, required: false}
    },
    isTop: { type: Boolean, default: false },
    views: { type: Number, default: 1 },
    likes: { type: Boolean, default: 1 },
    likeErp: { type: ArrayBuffer, default: new ArrayBuffer(Number.MAX_SAFE_INTEGER) }
});

// 转化为 js 对象
questionSchema.set('toObject', {getters: true});

// 翻页 + 自增 id 插件配置
questionSchema.plugin(paginate);
questionSchema.plugin(autoIncrement.plugin, {
    model: 'Question',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});

// 时间更新
questionSchema.pre('findOneAndUpdate', function (next) {
    this.findOneAndUpdate({}, { updateTime: Date.now() });
    next();
});

// 创建问题模型
const Question = db.model('Question', questionSchema);

export default Question;
