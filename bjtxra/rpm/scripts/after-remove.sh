#!/bin/bash
if [ "$CLOUDSERVER_DEBUG" = "DEBUG" ]; then
  set -x
fi
rm -rf /opt/libreoffice/program/libfreetype.so.6 /opt/cloudserver/openresty/nginx/conf/dhparams.pem /opt/cloudserver/openresty/nginx/conf/ nogroup.conf
systemctl stop cloudserver cloudserver-redis cloudserver-mysql cloudserver-nginx  cloudserver-office cloudserver-solr 2>/dev/null
systemctl disable cloudserver cloudserver-redis cloudserver-mysql cloudserver-nginx  cloudserver-office cloudserver-solr 2>/dev/null
systemctl daemon-reload
systemctl reset-failed
rm -rf /opt/cloudserver/openresty/nginx/{client_body,fastcgi,proxy,scgi,uwsgi}_temp
