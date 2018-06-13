# 数据库设计文档

## 应用管理集合 syestems 该bbs可能不止通天塔使用，每个应用需要使用再这里添加
    字段:
        1. id             唯一标识
        2. name           使用的应用名称
        3. createErpNO    分配人
        4. createTime     分配时间

## 用户集合 user - 主要记录分配的管理员(超级管理员??)

    字段:
        1. id             唯一标识
        2. erpNO          用户erp
        3. role           角色判断(1: 管理员 需要其他角色重新约定)
        4. createTime     分配时间
        5. createErpNO    分配人
        6. systemId       属于哪个应用

## 问题集合  questions

    字段:
        1. id             唯一标志
        2. title          问题摘要(可为空)
        3. description    问题描述
        4. createTime     创建时间
        5. updateTime     最后更新时间
        6. createErpNO    问题创建人
        7. top            置顶标志
        8. seeNum         访问量(可作为判断热度的依据)

## 评论集合   answers

    字段:
        1. id             唯一标志
        2. questionId     对应的问题的Id
        3. createTime     创建时间
        4. updateTime     更新时间
        5. createErpNO    创建人erp
        6. support        点赞数
        7. approve        该评论是发文章所赞成的
        8. content        评论的内容

## 标签集合   tags

    字段:
        1. id             唯一标识
        2. name           标签名称
        3. createTime     创建时间
        4. updateTime     更新时间
        5. createErpNO    创建人erp

## mongodb 权限
1、数据库用户角色：read、readWrite; 
2、数据库管理角色：dbAdmin、dbOwner、userAdmin； 
3、集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager； 
4、备份恢复角色：backup、restore； 
5、所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase 
6、超级用户角色：root // 这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase） 
7、内部角色：__system

read:允许用户读取指定数据库 
readWrite:允许用户读写指定数据库 
dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile 
userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户 
clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。 
readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限 
readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限 
userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限 
dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。 
root：只在admin数据库中可用。超级账号，超级权限

http://mongoosejs.com/docs/connections.html