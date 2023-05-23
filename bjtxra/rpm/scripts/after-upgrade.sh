#!/bin/bash
if [ "$CLOUDSERVER_DEBUG" = "DEBUG" ]; then
  set -x
fi

upgrade_init(){
  local common_install_file=/opt/cloudserver/installer/functions.sh
  if [ -f $common_install_file ]; then
    . $common_install_file
  else
    echo "功能库文件[$common_install_file]不存在"
    exit 100
  fi
}

upgrade_main(){
  upgrade_actions
  info "升级正常结束，建议重新启动操作系统"
}
upgrade_init
upgrade_main $@
