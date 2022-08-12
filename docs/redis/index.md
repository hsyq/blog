# Redis

## 简介





### 特点





### 应用场景

1.

2.

3.







## 安装

### Linux

以centos为例，下载源码，解压后编译即可使用。



一、安装gcc依赖

由于 redis 是用 C 语言开发，安装之前必先确认是否安装 gcc 环境（gcc -v），如果没有安装，执行以下命令进行安装

yum install -y gcc 



二、下载并解压安装包

wget http://download.redis.io/releases/redis-7.0.0.tar.gz

tar -zxvf redis-7.0.0.tar.gz



三、cd切换到redis解压目录下，执行编译

cd redis

make



四、安装并指定安装目录

make install PREFIX=/usr/local/redis



此时/usr/local/redis下生成了一个bin目录

可执行的命令，都在bin目录下。






五、启动服务

5.1前台启动

cd /usr/local/redis/bin/

 ./redis-server



5.2后台启动

从 redis 的源码目录中复制 redis.conf 到 redis 的安装目录

[root@localhost bin]# cp /usr/local/redis/redis.conf /usr/local/redis/bin/



修改 redis.conf 文件，把 daemonize no 改为 daemonize yes

[root@localhost bin]# vi redis.conf



后台启动

[root@localhost bin]# ./redis-server redis.conf





六、设置开机启动

添加开机启动服务

[root@localhost bin]# vi /etc/systemd/system/redis.service

复制粘贴以下内容：

复制代码
[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/redis/bin/redis-server /usr/local/redis/bin/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target



注意：ExecStart配置成自己的路径 



设置开机启动

[root@localhost bin]# systemctl daemon-reload

[root@localhost bin]# systemctl start redis.service

[root@localhost bin]# systemctl enable redis.service

创建 redis 命令软链接

[root@localhost ~]# ln -s /usr/local/redis/bin/redis-cli /usr/bin/redis





测试 redis


服务操作命令

systemctl start redis.service   #启动redis服务

systemctl stop redis.service   #停止redis服务

systemctl restart redis.service   #重新启动服务

systemctl status redis.service   #查看服务当前状态

systemctl enable redis.service   #设置开机自启动

systemctl disable redis.service   #停止开机自启动

-----------------------------------------------------------------------------------------

下载源码包
wget http://download.redis.io/releases/redis-5.0.0.tar.gz

解压安装包
tar -zxvf redis-5.0.0.tar.gz -C /usr/local

编译安装
cd /usr/local
mv redis-5.0.0 redis
cd redis
make &&  make install

注册服务
cp /usr/local/redis/utils/redis_init_script /etc/rc.d/init.d/redis
vim /etc/rc.d/init.d/redis  //修改脚本文件
#chkconfig: 2345 80 90  //第二行加入
chkconfig --add redis  //注册服务

修改配置文件
mkdir -p /etc/redis
cp /usr/local/redis/redis.conf /etc/redis/6379.conf
vim /etc/redis/6379.conf
#注释bind 127.0.0.1（用于远程连接），将“daemonize no”修改为“daemonize yes”
#bind 127.0.0.1
设置后台运行（守护进程）：daemonize修改为yes
设置aof持久化：appendonly修改为yes
设置连接密码：去掉#，requirepass 后面的字符串则为密码

设置开启启动
systemctl enable redis
systemctl start|stop|restart redis 









```bash
wget 
```



#### 使用yum安装





卸载









### Docker（推荐）

使用docker安装redis非常方便。



由于我是在阿里云服务器上安装，所以先要在安全组中开启redis的端口：

![](https://static.kunwu.tech/images/2022-08/202208112323597.webp)



拉取和查看redis镜像：

```bash
docker pull redis
docker images redis
```



![](https://static.kunwu.tech/images/2022-08/202208112323326.webp)





启动一个redis容器：

```bash
docker run --name redis -d -p 6379:6379 redis
```

--name：指定创建的容器的名字

-d：以守护进程的方式运行

-p：指定服务运行的端口



然后进入redis内部，在内容启动redis服务：

```bash
docker exec -it 9831 bash
```

进入容器后，默认所在的目录即为redis的工作目录，通过redis-cli命令启动：

![](https://static.kunwu.tech/images/2022-08/202208112324479.webp)





现在来存入几个数据：

```bash
set name lee
set age 18
```

读取：

```bash
get name
get age
```



docker服务启动时自动启动：

docker run --name redis -p 6379:6379 -d --restart=always redis



数据持久化：

docker run --name redis -d -p 6379:6379 --restart=always redis redis-server --appendonly yes



数据持久化到宿主机：

docker run --name redis -d -p 6379:6379 -v /opt/redis:/data --restart=always redis redis-server --appendonly yes





以配置文件启动

mkdir /opt/redis/data

vim /opt/redis/redis.conf
appendonly yes









### Windows

Redis官方没有提供适合windows版本的安装包。

微软团队自己维护了一个windows版本的redis，不过早已停止维护，仓库也已经关闭。

不过Github上还有一个开发者维护的windows版本，目前最新的版本的是5.0。

下载地址：https://github.com/tporadowski/redis/releases





![](https://static.kunwu.tech/images/2022-08/202208112322615.webp)



可以下载msi安装包进行安装，或者zip压缩包，下载好直接解压即可使用。



安装好之后，来到安装目录：

![](https://static.kunwu.tech/images/2022-08/202208112322637.webp)



安装完成后，自动将redis服务设为了自动启动，并开启了持久化，即当你存储了数据，重启计算机后，redis存储的数据仍然是可访问的。



在安装时，将安装目录添加到了环境变量，需要重启才能生效。之后在任意路径下，都可以通过redis-cli命令来访问redis服务：

```bash
PS D:\> redis-cli
127.0.0.1:6379> 
```



设置redis访问密码：

在redis安装目录下，编辑`redis.windows.conf`：

在redis根目录下找到redis.windows.conf配置文件，搜索requirepass，找到注释密码行，添加密码如下：

requirepass tenny     //注意，行前不能有空格



如果访问受限，可以从我的网盘中下载：

「redis」https://www.aliyundrive.com/s/TJtTbooWaot 

提取码: vk80 



这里不再具体演示。







## redis命令

在redis安装还之后，可以看一下安装目录：





可以看到有两个命令工具：

redis-cli：连接redis服务的客户端，可以操作redis数据库
redis-server：提供数据存取服务的redis服务端程序







## redis设置用户名和密码

需要在配置文件中设置。

这里以docker环境为例，在宿主机新建redis的配置文件：

vim /opt/redis/redis.conf



```js
#redis可以被外部访问
bind 0.0.0.0

#redis持久化
appendonly yes 

#设置密码
requirepass kc$7smYo5
```



启动容器：

```bash
docker run --name redis -d -p 6379:6379 --restart=always -v /opt/redis/:/data redis redis-server /data/redis.conf
```

将宿主机中配置文件所在目录映射给容器，并且容器中的redis服务在启动时使用该配置文件启动，从而使配置文件生效。









## 可视化客户端工具

### RedisInsight

Redis官方出品。好用。

https://redis.com/redis-enterprise/redis-insight/



### RedisDesktopManager

非常优秀的一款工具。

只提供开源代码，不提供编译后的安装包。

官网：https://resp.app/

https://github.com/uglide/RedisDesktopManager



### RedisDesktopManager-Windows

[@lework](https://github.com/lework) 提供了上面RDM的编译后的安装包，并且保持了非常及时的更新频率，直接下载压缩包，解压后安装使用！

https://github.com/lework/RedisDesktopManager-Windows/releases



网盘下载：

「redis」https://www.aliyundrive.com/s/TJtTbooWaot 

提取码: vk80 



### AnotherRedisDesktopManager

开源免费。

Github下载：https://github.com/qishibo/AnotherRedisDesktopManager/releases



### Redis Assistant

中文，收费。

http://www.redisant.cn/





# Redis 数据类型

Redis支持五种数据类型：string（字符串），hash（哈希），list（列表），set（集合）及zset(sorted set：有序集合)。



## String（字符串）

string 是 redis 最基本的类型，你可以理解成与 Memcached 一模一样的类型，一个 key 对应一个 value。

string 类型是二进制安全的。意思是 redis 的 string 可以包含任何数据。比如jpg图片或者序列化的对象。

string 类型是 Redis 最基本的数据类型，string 类型的值最大能存储 512MB。



```
redis 127.0.0.1:6379> SET name "Lee"
OK
redis 127.0.0.1:6379> GET name
"Lee"
```

在以上实例中我们使用了 Redis 的 **SET** 和 **GET** 命令。键为 name，对应的值为 **Lee**。

**注意：**一个键最大能存储 512MB。

------

## Hash（哈希）

Redis hash 是一个键值(key=>value)对集合。

Redis hash 是一个 string 类型的 field 和 value 的映射表，hash 特别适合用于存储对象。



```
redis 127.0.0.1:6379> HMSET person name "Lee" age 18
"OK"
redis 127.0.0.1:6379> HGET person Lee
"Lee"
redis 127.0.0.1:6379> HGET runoob age
"18"
```



我们使用了 Redis **HMSET, HGET** 命令，**HMSET** 设置了两个 **field=>value** 对, HGET 获取对应 **field** 对应的 **value**。

每个 hash 可以存储 232 -1 键值对（40多亿）。



------

## List（列表）

Redis 列表是简单的字符串列表，按照插入顺序排序。

你可以添加一个元素到列表的头部（左边）或者尾部（右边）。



```
redis 127.0.0.1:6379> lpush skills coding
(integer) 1
redis 127.0.0.1:6379> lpush skills wrting
(integer) 2
redis 127.0.0.1:6379> lpush skills running
(integer) 3
redis 127.0.0.1:6379> lrange skills 0 10
1) "rabbitmq"
2) "mongodb"
3) "redis"
redis 127.0.0.1:6379>
```

列表最多可存储 232 - 1 元素 (4294967295, 每个列表可存储40多亿)。

------

## Set（集合）

Redis 的 Set 是 **string 类型的无序集合**。

集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。



### sadd 命令

添加一个 string 元素到 key 对应的 set 集合中，成功返回 1，如果元素已经在集合中返回 0。

```
sadd key member
```



```
redis 127.0.0.1:6379> DEL runoob
redis 127.0.0.1:6379> sadd runoob redis
(integer) 1
redis 127.0.0.1:6379> sadd runoob mongodb
(integer) 1
redis 127.0.0.1:6379> sadd runoob rabbitmq
(integer) 1
redis 127.0.0.1:6379> sadd runoob rabbitmq
(integer) 0
redis 127.0.0.1:6379> smembers runoob

1) "redis"
2) "rabbitmq"
3) "mongodb"
```

**注意：**以上实例中 rabbitmq 添加了两次，但根据集合内元素的唯一性，第二次插入的元素将被忽略。

集合中最大的成员数为 232 - 1(4294967295, 每个集合可存储40多亿个成员)。

------

## zset(sorted set：有序集合)

Redis zset 和 set 一样也是string类型元素的集合,且不允许重复的成员。



不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。

zset的成员是唯一的,但分数(score)却可以重复。

### zadd 命令

添加元素到集合，元素在集合中存在则更新对应score

```
zadd key score member 
```

### 实例

```
redis 127.0.0.1:6379> DEL runoob
redis 127.0.0.1:6379> zadd runoob 0 redis
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 mongodb
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 rabbitmq
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 rabbitmq
(integer) 0
redis 127.0.0.1:6379> ZRANGEBYSCORE runoob 0 1000
1) "mongodb"
2) "rabbitmq"
3) "redis"
```







### 各个数据类型应用场景：

| 类型                 | 简介                                                   | 特性                                                         | 场景                                                         |
| :------------------- | :----------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| String(字符串)       | 二进制安全                                             | 可以包含任何数据,比如jpg图片或者序列化的对象,一个键最大能存储512M | ---                                                          |
| Hash(字典)           | 键值对集合,即编程语言中的Map类型                       | 适合存储对象,并且可以像数据库中update一个属性一样只修改某一项属性值(Memcached中需要取出整个字符串反序列化成对象修改完再序列化存回去) | 存储、读取、修改用户属性                                     |
| List(列表)           | 链表(双向链表)                                         | 增删快,提供了操作某一段元素的API                             | 1,最新消息排行等功能(比如朋友圈的时间线) 2,消息队列          |
| Set(集合)            | 哈希表实现,元素不重复                                  | 1、添加、删除,查找的复杂度都是O(1) 2、为集合提供了求交集、并集、差集等操作 | 1、共同好友 2、利用唯一性,统计访问网站的所有独立ip 3、好友推荐时,根据tag求交集,大于某个阈值就可以推荐 |
| Sorted Set(有序集合) | 将Set中的元素增加一个权重参数score,元素按score有序排列 | 数据插入集合时,已经进行天然排序                              | 1、排行榜 2、带权重的消息队列                                |





















注意：Redis支持多个数据库，并且每个数据库的数据是隔离的不能共享，并且基于单机才有，如果是集群就没有数据库的概念。

Redis是一个字典结构的存储服务器，而实际上一个Redis实例提供了多个用来存储数据的字典，客户端可以指定将数据存储在哪个字典中。这与我们熟知的在一个关系数据库实例中可以创建多个数据库类似，所以可以将其中的每个字典都理解成一个独立的数据库。

每个数据库对外都是一个从0开始的递增数字命名，Redis默认支持16个数据库（可以通过配置文件支持更多，无上限），可以通过配置databases来修改这一数字。客户端与Redis建立连接后会自动选择0号数据库，不过可以随时使用SELECT命令更换数据库，如要选择1号数据库：

```
redis> SELECT 1
OK
redis [1] > GET foo
(nil)
```

然而这些以数字命名的数据库又与我们理解的数据库有所区别。首先Redis不支持自定义数据库的名字，每个数据库都以编号命名，开发者必须自己记录哪些数据库存储了哪些数据。另外Redis也不支持为每个数据库设置不同的访问密码，所以一个客户端要么可以访问全部数据库，要么连一个数据库也没有权限访问。最重要的一点是多个数据库之间并不是完全隔离的，比如FLUSHALL命令可以清空一个Redis实例中所有数据库中的数据。综上所述，这些数据库更像是一种命名空间，而不适宜存储不同应用程序的数据。比如可以使用0号数据库存储某个应用生产环境中的数据，使用1号数据库存储测试环境中的数据，但不适宜使用0号数据库存储A应用的数据而使用1号数据库B应用的数据，不同的应用应该使用不同的Redis实例存储数据。由于Redis非常轻量级，一个空Redis实例占用的内存只有1M左右，所以不用担心多个Redis实例会额外占用很多内存。







# Nodejs中使用Redis



## 连接redis服务



```bash
mkdir redis-demo
cd redis-demo
pnpm init
pnpm add ioredis
```



vim ndex.js

```js
const Redis = require("ioredis");

const redis = new Redis({
    host: '127.0.0.1',
    port: 6379
}); 

// ioredis支持回调函数和promise风格的处理方式

redis.set('name', 'lee' function (err, result) {
  if (err) {
    console.error(err)
  } else {
    console.log(result)
  }
});

redis.get("name", function (err, result) {
  if (err) {
    console.error(err)
  } else {
    console.log(result);
  }
});


redis.get("name").then(function (result) {
  console.log(result); 
}).catch(err => {
     console.error(err)
    
});

// 使用async函数
async function main() {
    try {
        let result = await redis.get('name')
        console.log(result)
    } catch(err) {
         console.error(err)
    }
}

main()
```



运行代码：

```bash
node index.js
```



## API



redis存储的都是string，如果要存储数字，

需要在取值后进行手动转换。



不知道ioredis库有没有实现自动转换数据类型的功能？？？

