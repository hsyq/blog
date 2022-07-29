# Yarn



官网：https://yarnpkg.com/

中文官网：https://www.yarnpkg.cn/



Pnpm，即Permance npm，性能更强的npm。

关于为什么它的性能更强，有一篇文章推荐阅读，[《Pnpm: 最先进的包管理工具》](https://zhuanlan.zhihu.com/p/404784010)，点击直达。



## 安装

通过npm进行安装：

```bash
npm install -g yarn
```







## 常用命令

命令的用法基本和npm保持一致。

### 显示命令列表

```bash
yarn help
```

### 初始化一个新项目

```bash
yarn init
```

### 安装所有依赖项

```bash
yarn
yarn install
```

### 添加依赖项

```bash
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

### 将依赖项添加到不同的依赖类别中

```bash
yarn add [package] --dev  # dev dependencies
yarn add [package] --peer # peer dependencies
```

### 更新依赖项

```bash
yarn up [package]
yarn up [package]@[version]
yarn up [package]@[tag]
```

### 删除依赖项

```bash
yarn remove [package]
```

### 更新 Yarn 本体

```bash
yarn set version latest
yarn set version from sources
```



## CLI详细说明

参考：https://www.yarnpkg.cn/cli/install



### yarn init

创建一个`package.json`。

以前的版本好像还可以带`-y`参数，现在不行了，只能：

```bash
pnpm init
```



### <pkg>





### 



### yarn add 

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



### yarn remove

见名知义。

和`install`功能相反。



### yarn install



### npm set config



### npm get config



### yarn npm adduser



### yarn npm  login



### yarn npm publish





### yarn run







## 注意yarn create命令

这个命令是1.x的，在2.x文档找不到，应该是废除了。



https://classic.yarnpkg.com/en/docs/cli/create/

Creates new projects from any `create-*` starter kits.

`yarn create <starter-kit-package> [<args>]`

This command is a shorthand that helps you do two things at once:

- Install `create-<starter-kit-package>` globally, or update the package to the latest version if it already exists
- Run the executable located in the `bin` field of the starter kit’s `package.json`, forwarding any `<args>` to it

For example, `yarn create react-app my-app` is equivalent to:

```
$ yarn global add create-react-app
$ create-react-app my-app
```



从任何`create-\*`入门套件中创建新项目。

`yarn create <starter-kit-package> [<args>]`

这个命令是一个速记，可以帮助你一次完成两件事情：

- `create-<starter-kit-package>`全局安装，或者如果软件包已存在，则将软件包更新为最新版本

- 运行位于`bin`入门工具包领域的可执行文件`package.json`，将其转发`<args>`给它

例如，`yarn create react-app my-app`相当于：

```javascript
$ yarn global add create-react-app
$ create-react-app my-app
```







#### 参考

yarn 的 0.25 版本，增加了这个命令 yarn creat。

类似于目前各个框架自有的脚手架命令行工具。

下面是使用 yarn create 的基本语法：

```text
yarn create react-app my-app
yarn create react-native-app my-app
yarn create next-app my-app
```

使用 yarn create 你可以快速开始一个新项目，而不需要手动安装太多的全局命令。

它官方给出的实现原理也非常简单，比如，你运行 yarn create react-app，

yarn 会自动去查找并安装名为 create-react-app 的包，

然后运行这个包里面 bin 目录下提供的命令。



而对于使用了 scope 的包，比如 @ng/create-app，yarn create 命令的包查找原则是把 create- 插入到包的名字前面，而不是 scope 前面，即运行 yarn create @ng/app 的时候，yarn 会去查找 @ng/create-app。







