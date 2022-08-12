# Nodejs

## 安装

### Windows

推荐使用nvm作为nodejs版本管理工具，它可以方便的在多个版本之间进行切换。

下载地址：

https://github.com/coreybutler/nvm-windows/releases



安装之后，使用管理员权限打开CMD，输入

```bash
nvm -v
```

如能出现对应的版本号，则说明nvm已经安装成功。



接着，检查可用的node版本：

```bash
nvm list available
```



选择一个新版本安装即可：

```bash
nvm install 18.1.0
```



安装好之后根据提示，使用这个版本，需要注意的是，这个操作需要用到管理员权限，所以在打开cmd时，选择“以管理员身份运行”：

```bash
nvm use 18.1.0
```





