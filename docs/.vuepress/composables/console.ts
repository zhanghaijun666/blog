import { onMounted } from 'vue';

declare const BLOG_VERSION: string;

export const setupConsole = () => {
  onMounted(() => {
    console.info('博客版本：', BLOG_VERSION);
  });
};
