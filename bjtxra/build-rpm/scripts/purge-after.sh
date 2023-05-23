#!/bin/bash
if [ "$CLOUDSERVER_DEBUG" = "DEBUG" ]; then
  set -x
fi
rm -rf /opt/cloudserver/{mysql,java,app,log,run,redis,openresty,tmp,bin,etc,lib} /opt/lool
rm -rf /opt/cloudserver/openresty/nginx/{client_body,fastcgi,proxy,scgi,uwsgi}_temp
