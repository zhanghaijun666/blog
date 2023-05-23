# 端口  
端口    对应文件                                说明：
8985   app/solr/bin/solr                      查询服务器端口
16060  app/cloud/conf/config.json             云盘http端口
6060   app/cloud/conf/config.json             云盘https端口
6021   app/cloud/conf/config.json             云盘ftp端口
443    app/cloud/etc/nginx.conf               云盘对外https端口 安装之后改 /etc/nginx/conf.d/bedrock.conf，同时需要改app/cloud/conf/config.json：configWebsite改成可以访问地址
80     app/cloud/etc/nginx.conf               云盘对外http端口  安装之后改 /etc/nginx/conf.d/bedrock.conf

修改端口需要检查app/cloud/conf/config.json,app/cloud/etc/nginx.conf，/etc/nginx/conf.d/bedrock.conf是否使用，使用就改掉。

# 脚本
bin/install.sh   安装nginx配置
bin/start.sh     启动网盘和查询服务器，首次启动需要初始化数据库，花费时间较多
bin/stop.sh      停止网盘和查询服务器

