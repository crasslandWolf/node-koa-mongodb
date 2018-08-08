/**
 * @Author: jinzhengkun
 * @Date: 2018-06-13 16:56:50
 * @Last Modified by: jinzhengkun
 * @Last Modified time: 2018-08-08 15:28:55
 */
import * as koa from 'koa';
import * as koaBody from 'koa-body';
import * as helmet from 'koa-helmet';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';

import * as config from './config';
import * as mongoose from './mongodb';
import router from './route';
import interceptor from './middleWares/interceptor';

const app = new koa();

mongoose.connect();

// app.use(async (ctx, next) => {
//   ctx.body = 'hello world';
//   await next();
// });

app.use(interceptor);
app.use(helmet());
app.use(koaBody({
    multipart: true
}));

app
    .use(router.routes())
    .use(router.allowedMethods());
const options = {
  key: fs.readFileSync(__dirname + '/keys/server-key.pem'),
  ca: [fs.readFileSync(__dirname + '/keys/ca-cert.pem')],
  cert: fs.readFileSync(__dirname + '/keys/server-cert.pem')
};

http.createServer(app.callback()).listen(config.APP.HTTP_PORT, () => {
  console.log(`node-Koa Run！http port at ${config.APP.HTTP_PORT}`);
});
https.createServer(options, app.callback()).listen(config.APP.HTTPS_PORT, () => {
  console.log(`node-Koa Run！https port at ${config.APP.HTTPS_PORT}`);
});
