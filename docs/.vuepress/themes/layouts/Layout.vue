<template>
  <Layout>
    <template #page-bottom>
      <p class="copyright">
        <!-- <img v-if="badge" :src="badge" alt /> | Copyright © 京ICP备18000331号-1 -->
        <a href="https://beian.miit.gov.cn" target="_blank">津ICP备2022002959号</a>
      </p> 
    </template>
  </Layout>
</template>

<script>
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
// import { ref,watch } from 'vue'
// import { useRoute } from 'vue-router'
export default {
  components: {
    Layout,
  },
  setup() {
    // const route = useRoute()
    // let badge = ref(`https://visitor-badge.glitch.me/badge?page_id=shengxinjing-cn.${route.path}`)
    // watch(
    //   ()=>route.path,
    //   path=>{
    //     badge.value = `https://visitor-badge.glitch.me/badge?page_id=shengxinjing-cn.${path}`
    //   },
    // )
    // return { badge }
  }
}
</script>

<style lang="css">
.my-footer {
  text-align: right;
  position: relative;
  padding-right:3px;
  height: 0;
  max-width: var(--content-width);
  margin: 0 auto;

}
.my-footer img {
  position: relative;
  top: -38px;
}
.copyright{
  text-align: center;
  line-height: 1;
  font-size:14px;
  margin:0;
}
.copyright img{
  vertical-align: middle;
}
</style>