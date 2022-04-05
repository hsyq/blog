// const _ = require('lodash')
// const { generateSiebar } = require('./header')
// const { generateSidebar: generateESidebar} = require('../data/engineering')

module.exports = {
  base: '/',
  title: '昆吾',
  description: '拣尽寒枝不肯栖，寂寞沙洲冷',
  head: [
    // ['link', { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' }],
    // 设置 Google 的 Search Console
    // ['meta', { name: 'google-site-verification', content: '_rNB9Nt0ukzWmMfhXSSxCHUAeeMs24OiuhGm4QjdwXA' }]
  ],
  // shouldPrefetch: () => false,
  // bundler: '@vuepress/bundler-vite',
  themeConfig: {
    repo: 'hsyq/blog',
    nav: [
      { text: '主页', link: '/' },
      // { text: '周刊', link: '/weekly/' },
      { text: '前端工程化', link: '/engineering/' },
      { text: 'Vue3', link: '/vue3/' },
      {
        text: 'Node',
        items: [
          { text: 'Koa.js', link: '/koa/' },
          { text: 'Nest.js', link: '/nest/' },
          { text: '开发案例', link: '/' },
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
      // {
      //   text: '更多面试题',
      //   items: [
      //     { text: 'DevOps', link: '/devops/' },
      //     { text: '开放式问题', link: '/open/' },
      //     { text: '大厂内推', link: '/infer/ali-ascp.md' },
      //   ]
      // },
      // { text: '面试路线图', link: '/roadmap/code.html' },
      // { text: '面经大全', link: '/interview.html' },
    ],

    // lastUpdated: 'Last Updated',
    // displayAllHeaders: true
  }
}