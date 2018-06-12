import * as http from 'http'
import * as https from 'https'
import * as koa from 'koa'
import * as fs from 'fs'

const app = new koa()

app.use(async (ctx, next) => {
  ctx.body = 'hello world'
  await next()
})

// const options = {
//   key: fs.readFileSync(__dirname+'/keys/server-key.pem'),
// 	ca: [fs.readFileSync(__dirname+'/keys/ca-cert.pem')],
// 	cert: fs.readFileSync(__dirname+'/keys/server-cert.pem')
// }

http.createServer(app.callback()).listen(3000, () => {
  console.log(`node-Koa Run！http port at ${3000}`)
})
console.log('ss???11222');
// https.createServer(options, app.callback()).listen(3001, () => {
//   console.log(`node-Koa Run！https port at ${3001}`)
// })
