# Linux

以centos为例。



## 常用命令



### 文件目录操作

mkdir

cp

rm

touch

cat

ls

ll





### 用户

在root用户下进行操作

adduser kunwu

此时用户kunwu有一个系统初始化的默认密码，通过passwd命令修改：

passwd kunwu



添加sudo权限

编辑/etc/sudpers，找到如下位置：

![image-20220510220529151](https://cdn.jsdelivr.net/gh/hsyq/assets/imgs/2022-05/202205102205182.png)

添加一行即可：

vim /etc/sudoers



```js
## Allow root to run any commands anywhere 
root    ALL=(ALL)       ALL
kunwu   ALL=(ALL)       ALL
```



```bash
[root@kunwu ~]# adduser kunwu
[root@kunwu ~]# passwd kunwu
Changing password for user kunwu.
New password: 
BAD PASSWORD: The password contains the user name in some form  密码包含了用户名
Retype new password: 
Sorry, passwords do not match.
New password: 
BAD PASSWORD: The password is shorter than 8 characters  密码少于8个字符
Retype new password: 
Sorry, passwords do not match.
New password: 
Retype new password: 
passwd: all authentication tokens updated successfully.
```



### unzip

1、把文件解压到当前目录下

unzip test.zip

2、如果要把文件解压到指定的目录下，需要用到-d参数。

unzip -d /temp test.zip

3、解压的时候，有时候不想覆盖已经存在的文件，那么可以加上-n参数

unzip -n test.zip
unzip -n -d /temp test.zip

4、只看一下zip压缩包中包含哪些文件，不进行解压缩

unzip -l test.zip
5、查看显示的文件列表还包含压缩比率

unzip -v test.zip
6、检查zip文件是否损坏

unzip -t test.zip
7、将压缩文件test.zip在指定目录tmp下解压缩，如果已有相同的文件存在，要求unzip命令覆盖原先的文件

unzip -o test.zip -d /tmp/





## 系统

echo

sleep

```
sleep [--help] [--version] number[smhd]
```

**参数说明**：

- --help : 显示辅助讯息
- --version : 显示版本编号
- number : 时间长度，后面可接 s、m、h 或 d
- 其中 s 为秒，m 为 分钟，h 为小时，d 为日数
