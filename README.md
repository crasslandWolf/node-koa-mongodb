# node-koa-mongodb

## 技术栈

  - node.js
  - koa
  - mongodb
  - typescript
  - gulp

## 命令

  开发命令目前做了两套:

  1. 使用 gulp 实时监听 ts 文件变化，使用 tslint 检查，然后 编译为 js, 在编译后的文件启动服务器

     优点: 实时监听 ts 文件变化，tslint 检查通过才会编译 ts 为 js，启动服务，如果检查不通过，服务还是使用之前没有报错时的代码
     缺点: 需要编译全部ts文件，耗时，开发效率不高


  2. 直接 node 'ts-node'

     优点: 通过 ts-node 直接使用 ts 源文件启动服务
     缺点: 需要单独窗口 tslint, 不能及时发现 tslint 报错，及时 tslint 报错，只要代码正确依然正常启动服务，不易发现 tslint 报错问题


## 命令行参数

  开发模式下，直接在 `config/dev.ts` 中修改修改默认配置就行
