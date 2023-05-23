#!/bin/bash
if [ "$CLOUDSERVER_DEBUG" = "DEBUG" ]; then
  set -x
fi

install_init(){
  local common_install_file=/opt/cloudserver/installer/functions.sh
  if [ -f $common_install_file ]; then
    . $common_install_file
  else
    echo "功能库文件[$common_install_file]不存在"
    exit 100
  fi
}

install_main(){
  install_runtime
  install_check_process
  init_mysql 123456
  init_redis
  init_nginx
  init_office
  init_solr
  install_service
  install_command
  info "安装正常结束，建议重新启动操作系统"
}
install_init
install_main $@
