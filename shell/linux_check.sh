#!/bin/bash
set -e
##======================================
## Use: Monitor system resources
## Author: zhanghaijun
## Create Time: 2023/07/03
##======================================

# 获取当前脚本所在的目录
current_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$current_dir"

source ./_check.sh

echo -e "\033[1;35m############ 系统信息 ###### `date "+%Y-%m-%d %H:%M:%S"`\033[0m"
info_os
echo -e "\033[1;35m############ CPU资源 ###### `date "+%Y-%m-%d %H:%M:%S"`\033[0m"
info_cpu
echo -e "\033[1;35m############ 内存资源 ###### `date "+%Y-%m-%d %H:%M:%S"`\033[0m"
info_memory
echo -e "\033[1;35m############ 磁盘空间 ###### `date "+%Y-%m-%d %H:%M:%S"`\033[0m"
info_disk
echo -e "\033[1;35m############ 网络资源 ###### `date "+%Y-%m-%d %H:%M:%S"`\033[0m"
info_network
