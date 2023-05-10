import { onMounted } from 'vue';

declare const BLOG_VERSION: string;

export const setupConsole = () => {
  onMounted(() => {
    console.info('博客版本：', BLOG_VERSION);
    console.log(` %c 学习笔记 %c ${location.origin}`, "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;")
  });
};
