import { defineClientAppEnhance } from '@vuepress/client'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  // 统计
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    // var _hmt = _hmt || [];
    //   (function() {
    //     var hm = document.createElement("script");
    //     hm.src = "https://hm.baidu.com/hm.js?562e4deb07df6b3921feca881c66f20a";
    //     var s = document.getElementsByTagName("script")[0]; 
    //     s.parentNode.insertBefore(hm, s);
    //   })();

    // router.afterEach(function (to) {
    //   _hmt.push(['_trackPageview', to.fullPath])
    // })

    router.beforeEach((to, from, next) => {
      if (typeof _hmt !== "undefined") {
        if (to.path) {
          _hmt.push(["_trackPageview", to.fullPath]);
        }
      }

      next();
    });
  }
})