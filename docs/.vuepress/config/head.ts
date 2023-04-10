import { HeadTags } from "vuepress/config";

// ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
// ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
// ['link', { rel: 'apple-touch-icon', href: '/icons/LatteAndCat.png' }],
// ['link', { rel: 'mask-icon', href: '/icons/LatteAndCat.svg', color: '#FF66CC' }],
// ['meta', { name: 'msapplication-TileImage', content: '/icons/LatteAndCat.png' }],
// ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
// ['script', { language: 'javascript', type: 'text/javascript', src: '/blog-docs/js/jquery.min.js' }],

export default <HeadTags>[
  ["link", { rel: "shortcut icon", href: "/favicon.ico" }],
  ['link', { rel: 'manifest', href: '/manifest.json' }],
  ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;' }],
  ["meta", { name: "referrer", content: "never" }],
  ['meta', { name: 'keywords', content: '希望是火，失望是烟，人生就是一边生火一边冒烟' }],
  ['meta', { name: 'theme-color', content: '#11a8cd' }],
];
