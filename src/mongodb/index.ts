/**
 * @Author: jinzhengkun
 * @Date: 2018-06-13 16:57:05
 * @Last Modified by: jinzhengkun
 * @Last Modified time: 2018-08-07 21:14:57
 */
import * as mongoose from 'mongoose';
import * as config from '../config';

(mongoose as any).Promise = require('bluebird');

export const db = mongoose;

export const connect = () => {
    if (process.env.NODE_ENV === 'development') {
        mongoose.connect(config.MONGODB.url);
    } else {
        mongoose.connect(config.MONGODB.url, config.MONGODB.options);
    }

    /**
     * 连接成功
     */
    mongoose.connection.on('connected', () => {
        console.log(`Mongoose connection open to: ${config.MONGODB.url}`);
    });

    /**
     * 连接异常
     */
    mongoose.connection.on('error', err => {
        console.log(`Mongoose connection error: ${err}`);
    });

    /**
     * 断开连接
     */
    mongoose.connection.on('disconnected', () => {
        console.log(`Mongoose connection disconnected!`);
    });
    return mongoose;
};
