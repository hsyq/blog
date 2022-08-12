# Docker

## 简介





## 安装

### 以Centos为例



```bash
```

## 使用官方安装脚本自动安装

安装命令如下：

```
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

也可以使用国内 daocloud 一键安装命令：

```
curl -sSL https://get.daocloud.io/docker | sh
```



### 配置镜像加速服务

国内从 DockerHub 拉取镜像有时会遇到困难，此时可以配置镜像加速器。Docker 官方和国内很多云服务商都提供了国内加速器服务，例如：

科大镜像：https://docker.mirrors.ustc.edu.cn/
网易：https://hub-mirror.c.163.com/
阿里云：https://<你的ID>.mirror.aliyuncs.com
七牛云加速器：https://reg-mirror.qiniu.com
当配置某一个加速器地址之后，若发现拉取不到镜像，请切换到另一个加速器地址。国内各大云服务商均提供了 Docker 镜像加速服务，建议根据运行 Docker 的云平台选择对应的镜像加速服务。

阿里云镜像获取地址：https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors，登陆后，左侧菜单选中镜像加速器就可以看到你的专属地址了：





CentOS7
对于使用 systemd 的系统，请在 /etc/docker/daemon.json 中写入如下内容（如果文件不存在请新建该文件）：

{"registry-mirrors":["https://reg-mirror.qiniu.com/"]}
之后重新启动服务：

$ sudo systemctl daemon-reload
$ sudo systemctl restart docker







## 镜像操作







## 容器操作



运行镜像时，如果docker发现本地没有相关的镜像，也会去仓库中下载一个回来。



## Docker安装Nginx











## Docker安装Mysql





```bash
docker pull nginx
```



 

```bash
docker run -d --name nginx -p 80:80 nginx
```



 

```bash
docker run --name nginx -v /www/vue:/usr/share/nginx/html:ro -d nginx
```





**默认数据卷的映射是双向的，通过指定ro****，只有宿主机能影响容器，容器中的目录只读，不能写操作，不能影响宿主机。**





通过数据卷，指定宿主机的配置文件给nginx容器使用：

```bash
docker run –name nginx -d -p 8081:80 -v /opt/nginx/nginx.conf:/etc/nginx/nginx.conf nginx
```

 





## Docker安装MongoDB











## Docker安装Redis











## Docker安装ElasticSearch









## Dockerfile











## Docker Compose











## Docker命令总结

容器生命周期管理
run
start/stop/restart
kill
rm
pause/unpause
create
exec
容器操作
ps
inspect
top
attach
events
logs
wait
export
port
容器rootfs命令
commit
cp
diff
镜像仓库
login
pull
push
search
本地镜像管理
images
rmi
tag
build
history
save
load
import
info|version
info
version



## Docker 资源汇总

Docker 资源
Docker 官方主页: https://www.docker.com
Docker 官方博客: https://blog.docker.com/
Docker 官方文档: https://docs.docker.com/
Docker Store: https://store.docker.com
Docker Cloud: https://cloud.docker.com
Docker Hub: https://hub.docker.com
Docker 的源代码仓库: https://github.com/moby/moby
Docker 发布版本历史: https://docs.docker.com/release-notes/
Docker 常见问题: https://docs.docker.com/engine/faq/
Docker 远端应用 API: https://docs.docker.com/develop/sdk/
Docker 国内镜像
阿里云的加速器：https://help.aliyun.com/document_detail/60750.html

网易加速器：http://hub-mirror.c.163.com

官方中国加速器：https://registry.docker-cn.com

ustc 的镜像：https://docker.mirrors.ustc.edu.cn

daocloud：https://www.daocloud.io/mirror#accelerator-doc（注册后使用）

如果有更好的资源，欢迎通过下面的笔记来分享。

