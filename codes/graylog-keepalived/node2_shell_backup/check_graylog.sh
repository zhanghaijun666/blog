#!/bin/bash
# 检测的服务名称
SERVICE_NAME="graylog"

# 获取当前服务的 PID
CURRENT_PID=`ps -ef | grep '/bin/graylog-server' | grep -v grep | awk '{print $2}'`

# 如果获取到的 PID 为空，则服务可能已经停止，返回 1
if [ -z "${CURRENT_PID}" ]; then
    exit 1
fi

# 如果上一次记录的 PID 和当前 PID 不同，则返回 1
if [ "${CURRENT_PID}" != "$(cat /var/run/${SERVICE_NAME}.pid)" ]; then
    echo "${CURRENT_PID}" > /var/run/${SERVICE_NAME}.pid
    exit 1
fi

# 记录当前 PID 到文件中
echo "${CURRENT_PID}" > /var/run/${SERVICE_NAME}.pid

# 如果上述条件都不满足，则返回 0，表示服务正常
exit 0                   

