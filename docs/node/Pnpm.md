# Pnpm



![image-20220514183345822](https://cdn.jsdelivr.net/gh/hsyq/assets/imgs/2022-05/202205141833865.png)



官网：https://pnpm.io/

官网中文版：https://pnpm.io/zh/

中文官网：https://www.pnpm.cn/



Pnpm，即Permance npm，性能更强的npm。

关于为什么它的性能更强，有一篇文章推荐阅读，[《Pnpm: 最先进的包管理工具》](https://zhuanlan.zhihu.com/p/404784010)。



## 特点

快速：pnpm 是同类工具速度的将近 2 倍

高效：node_modules 中的所有文件均链接自单一存储位置 

支持单体仓库：pnpm 内置了对单个源码仓库中包含多个软件包的支持 

权限严格：pnpm 创建的 node_modules 默认并非扁平结构，因此代码无法对任意软件包进行访问







## 安装

通过 npm 进行安装：

```bash
npm install -g pnpm
```



## 配置

pnpm 使用 [npm 的配置](https://docs.npmjs.com/misc/config) 格式，进行配置的方式与 npm 相同。 例如，

```text
pnpm config set store-dir /path/to/.pnpm-store
```



如果没有配置 store ，那么pnpm 将自动在同一磁盘上创建 store。 如果您需要 pnpm 跨越多个硬盘或文件系统，请阅读 [常见问题](https://pnpm.io/zh/faq#does-pnpm-work-across-multiple-hard-drives-or-filesystems)

此外，pnpm 使用与 npm 相同的配置进行安装。 如果您有一个私有源并且 npm 被配置使用它， pnpm 应该不需要额外的配置也能够授权请求。

除了这些选项外， pnpm 也允许您使用所有标记为作选项的参数(例如 `--filter` 或 `--workspace concurrency`) ：

```text
workspace-concurrency = 1
filter = @my-scope/*
```



### pnpm config

该命令是`npm config`命令的别名。

简写为`c`。

npm config命令介绍：https://docs.npmjs.com/cli/v8/commands/npm-config



```bash
# 查看系统的npmrc配置文件，list别名ls
pnpm config list

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
pnpm config list -l

# 查看系统npm的全部配，以json格式展示
pnpm config list --json

# 设置一个或多个配置项
pnpm config set <key>=<value> [<key>=<value> ...]

# 查看一个或多个配置项
pnpm config get [<key> [<key> ...]]

# 查看一个或多个配置项
pnpm config delete <key> [<key> ...]

# 以json格式查看全部配置
pnpm config list [--json]

# 打开一个编辑器，来编辑全局的.npmrc文件，windows会打开记事本
pnpm config edit
```



# 常用命令

### pnpm init

创建一个`package.json`。

以前的版本好像还可以带`-y`参数，现在不行了，只能：

```bash
pnpm init
```



### pnpm add <pkg>

安装软件包及其依赖的任何软件包。 默认情况下，任何新软件包都安装为生产依赖项。

demo：

| Command              | Meaning                            |
| -------------------- | ---------------------------------- |
| `pnpm add sax`       | 保存到 `dependencies`              |
| `pnpm add -D sax`    | 保存到 `devDependencies`           |
| `pnpm add -O sax`    | 保存到 `optionalDependencies`      |
| `pnpm add -g sax`    | 全局安装包                         |
| `pnpm add sax@next`  | 从 `next` 标签下安装包的下一个版本 |
| `pnpm add sax@3.0.0` | 安装指定版本 `3.0.0`               |



#### 支持的包地址

#### 从 npm 安装

`pnpm add package-name` 默认会从 [npm registry](https://www.npmjs.com/) 安装最新的 `package-name`。

如果在 workspace 中执行，该命令将首先去检查这个 worksapce 中的其他项目是否已经使用了这个指定的包。 如果是的话，就使用这个包的版本范围来进行安装。

你还可以通过以下方式安装包：

- tag: `pnpm add express@nightly`
- version: `pnpm add express@1.0.0`
- version range: `pnpm add express@2 react@">=0.1.0 <0.2.0"`



#### 从 workspace 安装

需要注意的是当我们使用 [workspace](https://pnpm.io/zh/workspaces) 安装依赖时，会从已配置的源处进行安装，当然取决于是否设置了 [`link-workspace-packages`](https://pnpm.io/zh/workspaces#link-workspace-packages)，以及是否使用了 [`workspace: range protocol`](https://pnpm.io/zh/workspaces#workspace-ranges-workspace)。



#### 从本地安装

从本地安装的两种方法:

1. 源码文件 (`.tar`, `.tar.gz`, or `.tgz`)
2. 本地目录

示例：

```sh
pnpm add ./package.tar.gz
pnpm add ./some-directory
```

当从目录安装时，会在当前项目目录中生成一个 symlink `node_modules`, 因此这里跟执行 `pnpm link` 是一致的.



#### 从远端安装 Tar 包

参数必须是一个可访问的 URL，"http://" 或者 "https://" 开头的。

示例：

```sh
pnpm add https://github.com/indexzero/forever/tarball/v0.5.6
```



#### 从 git 安装

```sh
pnpm add <git remote url>
```



通过 git clone, 从 git 作者处安装包。可以用协议准确的指定 git 作者 例如， `pnpm add github:user/repo`

您可以通过以下方式从 Git 安装:

- 来自 master 的最新提交： `pnpm add kevva/is-positive`
- 提交: `pnpm add keva/is-positive#97edff6f525f192a3f83cea194765f769ae2678`
- 分支: `pnpm add keva/is-positive#master`
- 版本范围： `pnpm add kevva/is-positive#semver:^2.0.0`



#### 配置项

--save-prod, -P[](https://pnpm.io/zh/cli/add#--save-prod--p)



将指定的软件包安装为常规的 `dependencies`。

--save-dev, -D[](https://pnpm.io/zh/cli/add#--save-dev--d)

将指定的 packages 安装为 `devDependencies`。

--save-optional, -O[](https://pnpm.io/zh/cli/add#--save-optional--o)

将指定的 packages 安装为 `optionalDependencies`。

--save-exact, -E[](https://pnpm.io/zh/cli/add#--save-exact--e)

保存的依赖会被指定为一个确切的版本, 而不是使用 pnpm 的默认 semver range operator 配置.

--save-peer[](https://pnpm.io/zh/cli/add#--save-peer)

使用 `--save-peer` 会添加一个或多个 `peerDependencies` 的 package 并安装到 dev dependencies.

--ignore-workspace-root-check[](https://pnpm.io/zh/cli/add#--ignore-workspace-root-check)

除非使用`--ignore-workspace-root-check` 或 `-w`来标记. 否则在 root workspace 包添加依赖项时会失败.

例如, `pnpm add debug -w`.

--global, -g[](https://pnpm.io/zh/cli/add#--global--g)

安装全局依赖

--workspace[](https://pnpm.io/zh/cli/add#--workspace)

仅添加在 workspace 找到的依赖项.

--filter <package_selector>



## pnpm install

和npm一样，`install` 命令的别名为 `i` 。



`pnpm install` 用于安装项目所有依赖。

在CI环境中, 如果存在需要更新的 lockfile 会安装失败.

在 [workspace](https://pnpm.io/zh/workspaces)内,  `pnpm install` 会安装项目所有依赖。如果想禁用这个行为，将 `recursive-install` 设置为 `false`。



| Command                    | Meaning                          |
| -------------------------- | -------------------------------- |
| `pnpm i --offline`         | 仅从 store 中离线下载            |
| `pnpm i --frozen-lockfile` | `pnpm-lock.yaml` is not updated  |
| `pnpm i --lockfile-only`   | Only `pnpm-lock.yaml` is updated |



### 配置项









安装一个package。

```bash
# 全局安装
pnpm install global @vue/cli

# 等同于
pnpm i -g @vue/cli

# 本地安装，安装到项目目录中的node_modules
pnpm i axios

# 安装到package.json中的dependencies字段，默认如此
pnpm i axios --save

# 或者
pnpm i axios -S

# 或者
pnpm i axios


# 安装到package.json中的devDependencies字段，需要指定参数
pnpm i axios --save-dev
# 或者
pnpm i axios -D


# 安装到package.json中的devDependencies字段，需要指定参数
pnpm i eslint --save-dev
# 或者
pnpm i eslint -D
```



无论添加依赖到哪个字段，直接通过install安装，都会一股脑儿全装上：

```bash
pnpm install 
```



如果指定安装 `dependencies`中的依赖：

```bash
pnpm install --production
pnpm install --prod
pnpm install -P
```



如何设置了 NODE_ENV 变量，值为 ``，

如果 `NODE_ENV`环境变量被设置为 production 则 pnpm 不会下载 `devDependencies` 中的任何包. 使用这个指令 pnpm 会忽略`NODE_ENV` 并用该指令替代其生产状态.







npm install --production
npm install --prod
npm install -P 不能识别



npm install --development 未测试
npm install --prod 未测试
npm install  未测试









## pnpm update

别名: `up`

`pnpm update` 根据指定的范围更新软件包的最新版本。

在不带参数的情况下使用时，将更新所有依赖关系。 您可以使用一些模式来更新特定的依赖项。





## npm remove

见名知义。

和`install`功能相反。



## pnpm link

别名: `ln`

使当前本地包可在系统范围内或其他位置访问。

```text
pnpm link <dir>
pnpm link --global
pnpm link --global <pkg>
```



## pnpm unlink

取消链接一个系统范围的`package` (相对于 [`pnpm link`](https://pnpm.io/zh/cli/link)).

如果不带参数调用，则所有已链接的依赖项都将取消链接。

这类似于 `yarn unlink`，但 pnpm 会在删除外部链接后重新安装依赖项。



## pnpm import

`pnpm import` 从另一个软件包管理器的 lock 文件生成 `pnpm-lock.yaml`。 支持的源文件：

- `package-lock.json`
- `npm-shrinkwrap.json`
- `yarn.lock`

请注意，如果您有要为其导入依赖项的工作区，那么在导入之前，您需要在 [pnpm-workspace.yaml](https://pnpm.io/zh/pnpm-workspace_yaml) 文件中声明它们。







## pnpm rebuild

别名： `rb`

重建一个`package`。



## pnpm prune

移除不需要的`packages`。

配置项[](https://pnpm.io/zh/cli/prune#配置项)

--prod[](https://pnpm.io/zh/cli/prune#--prod)

删除在 `devDependencies` 中指定的包。

--no-optional[](https://pnpm.io/zh/cli/prune#--no-optional)

删除在 `optionalDependencies` 中指定的包。

:::警告

prune 命令目前不支持在 `monorepo`中递归执行。 可以删除一个只安装 production 依赖的`monorepo` 的几个` node_modules` 文件夹，然后重新再用 `pnpm install --prod` 安装。



## pnpm fetch

将 lockfile 中列出包下载到虚拟存储中，包清单被忽略。

使用场景[](https://pnpm.io/zh/cli/fetch#使用场景)

此命令专门用于加速构建 docker 映像。

您可能已经阅读了 [官方指南](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/) 为 Node.js 应用程序编写 Dockerfile，如果您还没有阅读它，您可能想先阅读它。

从该指南中，我们可以学会如何为使用 pnpm 的项目编写优化的 Dockerfile ，这将类似于





## pnpm install-test

别名: `it`

执行 `pnpm install` 然后立即执行 `pnpm test`. 它使用参数和 [`pnpm install`](https://pnpm.io/zh/cli/install)完全相同.





### pnpm run 

和npm一样，它也是一个完整命令 `run-script`的别名。



我们经常会在`package.json`中的`scripts`定义一些脚本命令，比如：

```json

```



对于`pnpm`，可以直接执行任何定义在`scripts`中的命令，不需要加`run`，当然加上也是可以的：

```bash
pnpm run dev
pnpm run build

pnpm dev
pnpm build
```

需要注意的是，此种简写**仅适用于那些不与已有的pnpm 命令相同名字的脚本**。

比如pnpm本来有一个命令叫`pnpm create`，如果你又在`package.json`中定义了一个`create`脚本命令，那么它只会执行自己本身的命令，而忽略掉你自定义的命令。





### pnpm test

别名: `run test`, `t`, `tst`

运行在` package` 的` scripts` 对象中`test` 属性指定的任意的命令。

该属性的预期的作用是想为程序指定的运行单元测试或集成测试的命令。



## pnpm start

别名: `run start`

运行在` package` 的` scripts` 对象中`start` 属性指定的任意的命令。 如果`scripts` 对象没有指定` start` 属性，那么默认将尝试执行 `node server.js`，如果都不存在则会执行失败。

该属性的预期的作用是想为您的程序指定一个`start`命令。







## pnpm create

使用@scope/create-<pkg> 或者 create-<pkg>创建一个项目。

例如：

```bash
pnpm create react-app my-react
# 等同于执行了
create-react-app my-app

pnpm create vite
# 等同于执行了
create-vite
```



create命令后面必须加一个package的名字：

![image-20220514192237752](https://cdn.jsdelivr.net/gh/hsyq/assets/imgs/2022-05/202205141922782.png)

```bash
ERR_PNPM_MISSING_ARGS  Missing the template package name.
The correct usage is `pnpm create <name>` with <name> substituted for a package name.
```







pnpm的create命令，不像`npm create`和`yarn create`一样，后面还可以跟一些命令参数，比如：

```bash
yarn create vite my-vite-app --tempalte vue
可以执行

pnpm create vite my-vue-app --template vue
就报错了：

PS D:\demo3\egg\three> pnpm create vite my-vue-adddpp -- --template vue
 ERROR   ERROR  Unknown option: 'template'
Did you mean 'test-pattern'? Use "--config.unknown=value" to force an unknown option.
For help, run: pnpm help create
```







## 实践：使用pnpm搭建一个monorepo项目









## 推荐阅读文章



- [Pnpm: 最先进的包管理工具](https://zhuanlan.zhihu.com/p/404784010)

- [关于现代包管理器的深度思考——为什么现在我更推荐 pnpm 而不是 npm/yarn?](https://juejin.cn/post/6932046455733485575)
- [为什么推荐使用pnpm](https://zhuanlan.zhihu.com/p/419399115)







