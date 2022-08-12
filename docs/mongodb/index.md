# 数据备份



# Mongodb导入本地json文件



```bash
mongoimport --db 数据库名 --collection 集合名 --file 文件路径+名称
```



- 以 JSON 对象形式导入
  `mongoimport -d 数据库名 -c 集合名 --file 文件名`
- 以 JSON 数组形式导入
  `mongoimport -d 数据库名 -c 集合名 --file 文件名 --jsonArray`



./**mongoimport**` `--db` `taobao` `--collection` `dress` `--file` `/home/test/taobao.json



--db -d 数据库名 (database)
--collection -c 集合名 (collection)
--file -f 导入文件名
--jsonArray 以 JSON 数组方式导入



2.3 注意事项
如果 mongod 开启了权限验证，那么参数还要加入以下字段：

-u 用户 (user)
-p 密码 (pwd)






- 导入文件时，集合如果不存在，会新建一个集合
