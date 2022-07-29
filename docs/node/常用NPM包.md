# 常用npm包介绍



## 脚手架类

用于创建各种类型的工程。

- webpack

- webpack-cli

- webpack-dev-server

- vue-cli

- create-react-app

- create-vite

- dva-cli@0.9.2

- egg-init@1.15.0

- koa-generator

- express-generator






## 系统工具

- rimraf

- http-server






## 其他







### dotenv

帮助我们识别项目中的`.env`这类文件。

我们可以通过这类文件来区分不同的环境，比如：

.env

.env.development

.env.production

.env.test

在这写文件中写一些全局的配置，在项目中，dotenv会自动将它们挂载到`process.env`这个全局对象上。



```bash
pnpm add dotenv
```



Dotenv 是一个零依赖的模块，它能将环境变量中的变量从 .env 文件加载到 process.env 中

根目录下创建 .env 文件

```undefined
HOST=localhost
PORT=3000
```



根目录下 index.js 下引入 dotenv 并使用

```jsx
require('dotenv').config({ path: '.env' })

// 使用
console.log(process.env.HOST) // localhost
console.log(process.env.PORT) // 3000
```

使用 dotenv 可以让我们免于在各个文件中引入配置文件，

也可以很好的解决敏感信息的泄漏，

利于后期代码维护，

快用起来吧！









supertest

chalk

dotnet

iconv-lite



## 包管理工具

npm 

yarn@1.13.0

pnpm

cnpm@6.0.0





create-react-app@2.1.2



eslint




hs

i5ting_toc

tsc

tsserver

nrm

cross-env

verdaccio

ts-node

commitizen



### cross-env



优点：

当设置环境变量为 `NODE_ENV=production` 时，易造成 Windows 命令的阻塞。（除了 Windows 上的 Bash，因其使用本机 Bash）

`cross-env` 使用单个命令，而不用担心环境变量的设置。像运行在 `POSIX系统` 上一样进行设置，`cross-env` 可以进行正确的设置。


作者：Samantha_Kim
链接：https://juejin.cn/post/6882748670890999822
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



pnpm add--save-dev cross-env



## 二、用法

```json
// package.json
"scripts": {
	"build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
}
```









## 开发用到的轮子

### 通用的

axios

dayjs

lodash：

echarts：

validatorjs：

1. 函数库：lodash.js ,是一个一致性、模块化、高性能的JavaScript实用工具库。这个函数库可以在原生JS中使用，也可以在React和Vue中使用。几乎你开发中所有的函数，这个库都给你写好。你需要作的就是熟练和恰到好处的使用。

   网址：https://www.lodashjs.com/

2. 函数库：Day.js , 它是一个极简的JavaScript库，可以为你很好的验证、操作和显示日期和时间。

   网址：https://dayjs.fenxianglu.cn/

3. timeago.js，它是显示几小时之前，很多随时更新的网站和应用，为了显示出及时性，不再显示具体发布的时间，而是改为几分钟或者几小时前发布的。这样显着时效性更好。这个插件的作用就是这个。如果需要，请收藏好。

   网址：https://github.com/hustcc/timeago.js

4. echarts 数据可视化： 我们公司的所有数据可视化插件都使用的这个组件库，可以满足企业级开发的需求。这个也算是国内最好的可视化开发组件库了。

   网址：https://echarts.apache.org/zh/index.html

5. Markdown编辑器： Markdown ，作为程序员，编写Markdown格式的文档已经是必会技能了，所以如果是为程序员开发的应用和网站，一定要支持Markdown功能。我在选择Markdown编辑器时踩了很多坑，最终才找到了这款好用的组件。

   网址：https://pandao.github.io/editor.md/

6. 表单验证：validator.js ，这个组件我想大部分人都用过，因为无论时用户端，还是管理端前台开发验证都时必须的，无论是公司，还是个人。我都一直在使用这个验证插件。

   网址:https://github.com/validatorjs/validator.js







### Vue的

- elementui

- element-plus

- ant-design

- ant-design-vue

- vant

- viewui




vue-lazyload





[Vue UI组件库](https://jspang.com/article/81#toc32)

目前公司大部分的前端开发使用的是Vue框架，所以好的Vue UI组件库也必须推荐一下。而且Vue在国内也是最流行的前端框架。

1. Element ： 国内最流行的Vue UI组件库，文档完整，支持在Vue3下使用。而且Element还提供了Element-React版本和Element-Angular版本。也就是说你掌握一套UI，可以在主流的前端开发框架中使用，如果你只学一套UI组件库，学这个就没错了。

   网址：https://element.eleme.io/#/zh-CN

2. vant ：有赞公司旗下的开源组件库，适用于移动端开发。组件齐全，使用简单，UI设计也非常漂亮。

   网址：[youzan.github.io/vant/#/zh-C…](http://youzan.github.io/vant/#/zh-C…)

3. View UI： 我刚接触Vue开发使用，第一个项目中使用的UI组件库，UI设计的非常精美，有免费版和专业版（也就是收费版）。从收费版出了以后，我使用的就少了。

   网址：[www.iviewui.com/](http://www.iviewui.com/)

[动画库](https://jspang.com/article/81#toc33)

如果想页面制作的好看，动画效果一定是少不了的。所以必须推荐动画插件。

- Animate.css 纯css的动画库，所以无论你前端使用什么框架，都可以非常方便的使用它，内置了超多的动画效果，并且预览起来也非常方便。

  网址：https://animate.style/

我是真的很喜欢这个动画库，我参与的90%的项目中都使用到了这个动画库。

[常用效果组件](https://jspang.com/article/81#toc34)

所有介绍了一些UI组件库，组件库的组件大而全，但精细程度有时候是不够的，所以有时候我们还需要一些小而精的专属组件。

1. 轮播图组件：swiper，这个提供的轮播图效果太多了，中文文档齐全，还有交流QQ群。支持原生、JQuery、Vue、React、Angular等，任何前端开发场景中使用。而且还有PC端和移动端。比较讨厌的是官网有很多弹出广告，但也能理解，为了生存吗。

   网址：https://www.swiper.com.cn/

2. 滚动插件：mescroll.js , 移动端的滚动经常会出现不流畅，延迟等问题。我也尝试着去使用了很多大神些的滚动插件，多方比较，我选定了这款插件。他是基于H5的，不依赖来与其它前端框架，侵入性很小，实用性很大。如果你在滚动中遇到了问题，可以使用这个插件来解决。

   网址：http://www.mescroll.com/api.html

[工具类轮子](https://jspang.com/article/81#toc35)

开发中除了界面的制作，也需要一些工具类的轮子，下面就介绍一下我开发中使用的一些工具类轮子。

1. 

因为我平时的开发，大多使用Vue进行，所以再躲分享几个关于Vue的常用工具组件。

1. Vue拖拽组件 ：vue-draggable, 用于现在开发的应用都需要有移动端，所以拖拽操作越来越多了，它是我目前看到的基于Vue的最好拖拽组件。

   网址：https://www.itxst.com/vue-draggable/tutorial.html

2. Vue生成二维码：vue-qr 如果你需要生成二维码，用这个组件绝对没错，公司的项目一直在使用，可以方便快捷的生成任何形式的二维码。包括彩色和自定义样式。

   网址：https://www.npmjs.com/package/vue-qr

3. Vue图片剪裁 ： vue-cropper 无论开发任何应用，都需要用户上传图片。但又为了保持页面的一致性，所以要对上传的图片，安装设计规范，进行裁切。这时候你就可以使用这个组件了。

   网址：https://github.com/xyxiao001/vue-cropper

4. 图片懒加载：vue-lazyload 其实很多UI组件库已经有这个图片懒加载的给功能了，但是还是单独提出来一下，因为它不会和其它Vue组件库冲突，而且功能更多。

   网址：https://www.npmjs.com/package/vue-lazyload

5. Vue上传组件：vue-simple-upload 上传也是我们绕不开的开发需求，所以你必须拥有一个完全好用的上传组件。它非常好用，但缺点是没有官方网站，只有一个Github地址。

   网址：https://github.com/saivarunk/vue-simple-upload





### React的

1. Ant Design ：文档齐全，社区生态良好，有手机版，还有PC版。可以用来快速创建手机/后台/内部应用的UI组件库。我的博客，就是那这个组件库制作的。

   网址：https://ant.design/

2. React Bootstrap : BootStrap我在JQuery时代就开始使用，现在已经推出了React Bootstrap， 虽然UI设计上没什么出彩，但是快速完成个人小项目已经足够了。

   网址：https://react-bootstrap.github.io/

3. MATERIAL-UI：实现了Google的Material Design 全新设计语言的React组件库。在Github上有超过5万star，最受欢迎的React组件库之一。现在也叫做Mui。

   网址：[material-ui.com/](http://material-ui.com/) or https://mui.com/zh/





## 提升开发体验的

- nodemon








## 部署的

- pm2

- super













## 开发脚手架用到的

- commander












## 自己开发一个npm包？

可以看看这些文章：

