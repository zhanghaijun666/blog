#!/bin/bash
set -e
##======================================
## Use: Monitor system resources
## Author: zhanghaijun
## Create Time: 2023/07/03
##======================================

source ./_check.sh

echo -e "\033[1;35m############ CPU资源 ###### `date "+%Y-%m-%d %H:%M:%S"`\033[0m"
info_cpu
echo -e "\033[1;35m############ 内存资源 ###### `date "+%Y-%m-%d %H:%M:%S"`\033[0m"
info_memory
echo -e "\033[1;35m############ 磁盘空间 ###### `date "+%Y-%m-%d %H:%M:%S"`\033[0m"
info_disk
