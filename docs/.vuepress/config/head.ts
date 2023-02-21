import { HeadTags } from "vuepress/config";

export default <HeadTags>[
  ["link", { rel: "shortcut icon", href: "/favicon.ico" }],
  ['meta', {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;'
  }],
  ['meta', { name: 'keywords', content: '希望是火，失望是烟，人生就是一边生火一边冒烟' }],
  ['meta', { name: 'theme-color', content: '#11a8cd' }],
];
