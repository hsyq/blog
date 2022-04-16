// const _ = require('lodash')
// const { generateSiebar } = require('./header')
// const { generateSidebar: generateESidebar} = require('../data/engineering')

module.exports = {
  // 部署应用的基础路径
  base: '/',
  // 网站的标题，它将会被用作所有页面标题的前缀，同时，默认主题下，它将显示在导航栏（navbar）上
  title: '昆吾-前端知识分享',
  // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中
  description: '前端技术博客，分享前端学习路上的资料。专注web前端开发、前端工程化，做最有价值的前端技术学习网站。',

  // 额外的需要被注入到当前页面的HTML<head>中的标签，是一个数组
  // 每个标签都可以以[tagName, { attrName: attrValue }, innerHTML?] 的格式指定
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: '前端知识分享' }],

    // 设置 Baidu 的 Search Console
    ['meta', { name: 'baidu-site-verification', content: 'code-WKuN3yvILD' }],

    // 设置百度统计
    [
      'script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?562e4deb07df6b3921feca881c66f20a";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      `
    ],

    // [
    //   'script', {}, `
    //   setTimeout(function(){
    //     var main = document.querySelector('main');
    //     main.style.textAlign = 'center';
    //     var a = document.createElement("a");
    //     a.textContent = "津ICP备2022002959号";
    //     a.setAttribute('target', '_blank');
    //     a.setAttribute('src', 'https://beian.miit.gov.cn');
    //     main.appendChild(a);
    //     a.style.cursor = 'pointer';
    //     a.addEventListener('click', function(e){
    //       location.href = 'https://beian.miit.gov.cn';
    //     }, false); 
    //   }, 300);
    //   `
    // ],
  ],

  // 指定用于 dev server 的主机名，默认值是 0.0.0.0
  // host: '0.0.0.0',

  // 指定 dev server 的端口
  // port: 8080,

  // dest: '',

  // 提供多语言支持的语言配置。具体细节请查看 多语言支持。
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  // 一个函数，用来控制对于哪些文件，是需要生成 <link rel="prefetch"> 资源提示的
  // shouldPrefetch: () => false,

  // 指定使用的自定义主题名
  // theme: '',

  // 为当前的主题提供一些配置，这些选项依赖于你正在使用的主题
  // 默认使用的主题是vuepress-theme-default，https://vuepress.vuejs.org/zh/theme/default-theme-config.html
  themeConfig: {
    // 加导航栏 Logo ，Logo 可以被放置在公共文件目录，即.vuepress/public
    logo: '/hero.webp',


    // 自动在每个页面的导航栏生成生成一个GitHub链接，以及在页面的底部生成一个"Edit this page"链接
    // 会自动解析为一个完整的GitLab URL
    repo: 'hsyq/blog',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '查看仓库',
    // 以下为可选的  编辑链接 选项，用来生成一个编辑页面的连接
    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'hsyq/blog',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'main',
    // 是否显示编辑链接默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助改善此页面！',

    // 是否启用搜索框，默认为true
    search: true,
    // 调整默认搜索框显示的搜索结果数量，默认为10
    searchMaxSuggestions: 10,

    // 默认是关闭的，如果给定一个字符串，它将会作为前缀显示（默认值是：Last Updated）
    // lastUpdated 是基于 git 的, 所以你只能在一个基于 git 的项目中启用它。
    // 此外，由于使用的时间戳来自git commit，因此它将仅在给定页的第一次提交之后显示，并且仅在该页面后续提交更改时更新。
    lastUpdated: '上次更新', // string | boolean

    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: true,

    // 设置导航栏链接
    nav: [
      { text: '主页', link: '/' },

      { text: '前端工程化', link: '/engineering/' },
      { text: 'Vue3', link: '/vue3/' },

      {
        text: 'Node',
        // 提供了一个 items 数组而不是一个单一的 link 时，它将显示为一个 下拉列表 ：
        items: [
          { text: 'Koa.js', link: '/koa/' },
          { text: 'Nest.js', link: '/nest/' },
          // 通过嵌套的 items 来在 下拉列表 中设置分组
          {
            text: '开发案例', items: [
              { text: '接口服务器案例', link: '/demo/' },
            ]
          },
        ]
      },

      {
        text: '数据库',
        items: [
          { text: 'Mysql', link: '/mysql/' },
          { text: 'MongoDB', link: '/mongodb/' },
          { text: '开发案例', link: '/' },
        ]
      },

      { text: '前端面试', link: '/fe-interview/' },

      {
        text: '博客',
        items: [
          { text: 'Github', link: 'https://github.com/hsyq' },
          { text: '语雀', link: 'https://www.yuque.com/kunwu-mi1a0' },
          { text: '掘金', link: 'https://juejin.cn/user/3878732751440253/posts' }
        ]
      }
    ],

    // 基本的配置
    sidebar: {
      // 通过对象，为每个页面设置一个侧边栏
      // 设置主页的侧边栏
      // {
      //   title: '欢迎学习', // 必要的
      //   path: '/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      //   collapsable: false, // 不折叠
      //   sidebarDepth: 1,    // 可选的, 默认值是 1
      //   // initialOpenGroupIndex: -1, // 可选的, 默认值是 0
      //   children: [
      //     { title: "学前必读", path: "/" }
      //   ]
      // },

      // 设置 engineering的侧边栏
      '/engineering/': [
        {
          title: "工程化",
          children: [
            "/engineering/1.Webpack核心概念",
            "/engineering/2.基本配置",
          ],
        },
      ],
      // 设置vue3的侧边栏
      '/vue3/': [{
        title: "Vue3",
        children: [
          "/vue3/1.响应式原理",
          "/vue3/2.computed",
        ],
      },],

      // node导航栏不需要设置侧边栏，应该给它的子项设置侧边栏
      '/koa/': [{
        title: "Koa",
        children: [
          "/koa/1.基本使用",
        ],
      },],
      '/nest/': [{
        title: "Nest",
        children: [
          "/koa/1.基本使用",
        ],
      },],

      // 设置mysql的侧边栏
      '/Mysql/': [{
        title: "Mysql",
        children: [
          "/vue3/1.响应式原理",
          "/vue3/2.computed",
        ],
      },],
    },

    // 默认情况下，侧边栏会自动地显示由当前页面的标题（headers）组成的链接，并按照页面本身的结构进行嵌套，你可以通过 themeConfig.sidebarDepth 来修改它的行为。
    // 默认的深度是 1，它将提取到 h2 的标题；设置成 0 将会禁用标题（headers）链接；同时，最大的深度为 2，它将同时提取 h2 和 h3 标题。
    sidebarDepth: 1,

    // 默认情况下，侧边栏只会显示由当前活动页面的标题（headers）组成的链接
    // 设置为true，表示显示所有页面的标题链接
    displayAllHeaders: true

  },

  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          return new Date(timestamp).toLocaleDateString();
        }
      }
    ],
    [
      'sitemap',
      {
        hostname: 'https://kunwu.tech'
      }
    ]
  ]
}