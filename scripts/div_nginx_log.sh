#!/bin/bash
###### Nginx 日志切割
## 每天0:00执行切割日志归档脚本
## 0 0 * * * root bash /usr/local/docker/nginx_docker/div_nginx_log.sh
##################
# 指定日志和切割后日志备份的目录
YEAR=$(date +%Y)
MONTH=$(date +%m)
DAY=$(date +%d)
YESTERDAY=$(date -d "yesterday" +%Y-%m-%d)
LOGS_PATH=/usr/local/docker/nginx_docker/logs
LOGS_BAK_PATH=/usr/local/docker/nginx_docker/logs-bak

# 得到1级目录名
if [[ $(($DAY)) -eq 1 ]]
  then
    if [[ $(($MONTH)) -eq 1 ]]
      then
        LOGS_BAK_PATH=$LOGS_BAK_PATH/$((${YEAR}-1))-12
    else
      if [[ $(($MONTH)) -gt 10 ]]
        then
          LOGS_BAK_PATH=$LOGS_BAK_PATH/${YEAR}-$((${MONTH}-1))
      else
          LOGS_BAK_PATH=$LOGS_BAK_PATH/${YEAR}-0$((${MONTH}-1))
      fi
    fi
else
    LOGS_BAK_PATH=$LOGS_BAK_PATH/${YEAR}-${MONTH}
fi

# 创建目录
mkdir -p $LOGS_BAK_PATH/${YESTERDAY}

# 复制当前的日志文件到备份的目录
cp ${LOGS_PATH}/access.log ${LOGS_BAK_PATH}/${YESTERDAY}/access_${YESTERDAY}.log
cp ${LOGS_PATH}/error.log ${LOGS_BAK_PATH}/${YESTERDAY}/error_${YESTERDAY}.log

# 清空日志
> ${LOGS_PATH}/access.log
> ${LOGS_PATH}/error.log
