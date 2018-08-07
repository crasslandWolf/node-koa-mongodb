/**
 * @Author: jinzhengkun
 * @Date: 2018-06-13 16:57:23
 * @Last Modified by: jinzhengkun
 * @Last Modified time: 2018-08-07 21:10:49
 */
const argv = require('yargs').argv;

import * as devConfig from './dev-config';
import * as prodConfig from './prod-config';

const defaultConfig = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

const option = {
    user: defaultConfig.MONGODB.username,
    pass: defaultConfig.MONGODB.password,
    useMongoClient: true
};

export const MONGODB = {
  url: defaultConfig.MONGODB.url,
  options: option
};

export const APP = {
    ROOT_PATH: '/babel/bbs/service',
    HTTP_PORT: defaultConfig.APP.HTTP_PORT,
    HTTPS_PORT: defaultConfig.APP.HTTPS_PORT
};
