# NPM

当系统中安装了`node`，就会自动安装上`npm`。



`Npm`，Node Package Manager，即Node的包管理工具，已经成为了非官方的发布Node模块（包）的标准。 

2020年3月17日，[Github](https://baike.baidu.com/item/Github/10145341)宣布收购npm，GitHub现在已经保证npm将永远免费。



现代前端项目离不开node，使用node就离不开npm。

下面来看下npm的基本使用。



## 配置

### .npmrc文件

是npm的配置文件。默认在系统的用户目录下，比如windows的是在`C:\Users\kunwu\.npmrc`。

默认为空。可以往里面加一些配置项。



### 配置项

参见：https://docs.npmjs.com/cli/v8/using-npm/config

一些常用的：

#### `registry`

- Default: "https://registry.npmjs.org/"
- Type: URL

The base URL of the npm registry.



#### `cache`

- 默认值：Windows: `%LocalAppData%\npm-cache`, Posix:`~/.npm`
- 类型：路径

npm 的缓存目录的位置。看[`npm cache`](https://docs.npmjs.com/cli/v8/commands/npm-cache)



#### `editor`

- 默认值：EDITOR 或 VISUAL 环境变量，或 Windows 上的“notepad.exe”，或 Unix 系统上的“vim”
- 类型：字符串

为`npm edit`和运行的命令`npm config edit`。



### npm config

用来管理npm的配置文件`.npmrc`。

别名是`c`。

```bash
# 查看系统的npmrc配置文件，list别名ls
npm config list

# 输出
PS D:\> pnpm config list
; "user" config from C:\Users\kunwu\.npmrc

home = "https://npm.taobao.org"
registry = "https://registry.npmmirror.com/"

; node bin location = C:\nodejs\node.exe
; cwd = D:\
; HOME = C:\Users\kunwu
; Run `npm config ls -l` to show all defaults.
```



```bash
# 查看系统npm的全部配置，以 key=value格式展示
npm config list -l

# 查看系统npm的全部配，以json格式展示
npm config list --json

# 设置一个或多个配置项
npm config set <key>=<value> [<key>=<value> ...]

# 查看一个或多个配置项
npm config get [<key> [<key> ...]]

# 查看一个或多个配置项
npm config delete <key> [<key> ...]

# 以json格式查看全部配置
npm config list [--json]

# 打开一个编辑器，来编辑全局的.npmrc文件，windows会打开记事本
npm config edit
```



## 关于npm源

一般学习node的第一件事，是安装node；第二件事，就是修改npm registry，即npm仓库的源。

国内推荐使用淘宝的镜像仓库，地址是：https://npmmirror.com/。

2022年3月，以前的淘宝npm域名停止解析了，参考《[【公告】淘宝 npm 域名即将切换 && npmmirror 重构升级 && 微信交流群](https://zhuanlan.zhihu.com/p/465424728)》。

所以如果是新安装的node环境，可以直接用下面的方式进行设置。



方式1：手动设置

```bash
npm c set registry=https://registry.npmmirror.com/
```



方式2：使用一个`nrm`工具设置



先查看下现在的registry：

```bash
npm c get registry

# 输出
PS C:\> npm c get registry
https://registry.npmjs.org/
```



首先安装`nrm`：

```bash
npm i -g nrm
```



```bash
# 列出可用的npm registry地址
nrm list

PS C:\> nrm ls

  npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/

# 使用taobao的源
nrm use taobao

PS C:\> nrm use taobao

   Registry has been set to: https://registry.npmmirror.com/
```



最后查看一下本地的npm配置：

```bash
npm c get registry

PS C:\> npm c get registry
https://registry.npmmirror.com/
```



## 常用命令

### npm init

初始化一个package。

开发项目的第一步就是先执行它。



### npm install

install简写为i。

安装一个package。

```bash
# 全局安装
npm install global @vue/cli
# 等同于
npm i -g @vue/cli

# 本地安装，安装到项目目录中的node_modules
npm i axios

# 安装到package.json中的dependencies字段，默认如此
npm i axios --save
# 或者
npm i axios -S
# 或者
npm i axios

# 安装到package.json中的devDependencies字段，需要指定参数
npm i axios --save-dev
# 或者
npm i axios -D


# 安装到package.json中的devDependencies字段，需要指定参数
npm i eslint --save-dev
# 或者
npm i eslint -D
```



无论添加依赖到哪个字段，直接通过install安装，都会一股脑儿全装上：

```bash
npm install 
```



如果指定安装 `dependencies`中的依赖：

```bash
npm install --production
```



### npm uninstall

见名知义。

和`install`功能相反。





### npm run

它是`run-scripts`命令的别名。



对于npm，它简化了对`start`， `test`， `restart`和`stop`这四个常用命令的调用，使用npm执行它们：

```bash
npm start
npm test
```



其他的脚本命令仍然需要完整的写法：

```bash
npm run dev
npm run build
```





### npm set config



### npm get config





### npm adduser



### npm login



### npm publish







### 补充：npm init

The init command is transformed to a corresponding `npm exec` operation as follows:

- `npm init foo` -> `npm exec create-foo`
- `npm init @usr/foo` -> `npm exec @usr/create-foo`
- `npm init @usr` -> `npm exec @usr/create`

也就是，npm init 背后执行了npm exec。















## npx工具

它是`npm` 5.x版本自带的一个新工具，主要有两个作用：

1. 方便调用项目本地中的一个工具命令

2. 不用全局安装一个包



```bash
npx eslint
```



```bash
npx vue my-vue
```



```bash
npx -- <pkg>[@<version>] [args...]
npx --package=<pkg>[@<version>] -- <cmd> [args...]
npx -c '<cmd> [args...]'
npx --package=foo -c '<cmd> [args...]'
```













## package的版本管理



@具体版本号

@latest：npm仓库版本的默认标签，也就是正式发版的最新版本

@next：下一个未发布的npm版本

@beta：



