/**
 * @Author: jinzhengkun
 * @Date: 2018-06-13 16:57:23
 * @Last Modified by: jinzhengkun
 * @Last Modified time: 2018-06-13 19:07:45
 */
const argv = require('yargs').argv;

import * as devConfig from './dev-config';
import * as prodConfig from './prod-config';

const defaultConfig = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

const option = {
    user: defaultConfig.MONGODB.username,
    pass: defaultConfig.MONGODB.password,
    bufferMaxEntries: 0, // 连接失败，立即返回错误，而不是等待重新连接
    poolSize: 10,
    reconnectInterval: 500, // 每 500ms 重新连接一次
    reconnectTries: Number.MAX_VALUE, // 永不停止的尝试重新连接
    autoIndex: false // 索引
};

export const MONGODB = {
  url: `mongodb://${defaultConfig.MONGODB.ip}:${defaultConfig.MONGODB.post}/babel_bbs`,
  options: option
};

export const APP = {
    ROOT_PATH: '/babel/bbs/service',
    HTTP_PORT: defaultConfig.APP.HTTP_PORT,
    HTTPS_PORT: defaultConfig.APP.HTTPS_PORT
};
