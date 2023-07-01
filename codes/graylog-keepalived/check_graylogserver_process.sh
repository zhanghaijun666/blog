#!/bin/bash

# 进程名称
PROCESS_NAME="graylog"

# 进程状态通过读写文件来更新计数
PROCESS_STATUS_FILE="/tmp/process_status.txt"

# 告警计数通过读写文件来更新计数
ALERT_COUNT_FILE="/tmp/alert_count.txt"

# 告警次数阈值
ALERT_THRESHOLD=3

# 钉钉机器人Webhook地址
WEBHOOK_URL_graylog="https://oapi.dingtalk.com/robot/send?access_token=87ab6ee5b3045a8e896222c7b8889d14dcb6ebf94ecacd759f1b737a7cef5408"
# 发送告警
send_alert() {
    current_time=$(date "+%Y-%m-%d %H:%M:%S")
    message="{\"msgtype\":\"text\",\"text\":{\"content\":\"Node2节点(IP:192.168.31.65)的 $PROCESS_NAME 进程未运行已超过【$ALERT_COUNT】分钟，请立即处理！\n当前时间：$current_time\"}}"
    curl -s -H "Content-Type: application/json" -d "$message" "$WEBHOOK_URL_graylog" > /dev/null
}

send_alert_tips() {
    current_time=$(date "+%Y-%m-%d %H:%M:%S")
    message="{\"msgtype\":\"text\",\"text\":{\"content\":\"Node2节点(IP:192.168.242.65)的 $PROCESS_NAME 进程未运行告警已发送三次，后续不再发送提醒，请及时关注并处理！\n当前时间：$current_time\"}}"
   curl -s -H "Content-Type: application/json" -d "$message" "$WEBHOOK_URL_graylog" > /dev/null
}


# 发送恢复告警
send_recovery_alert() {
    current_time=$(date "+%Y-%m-%d %H:%M:%S")
    message="{\"msgtype\":\"text\",\"text\":{\"content\":\"Node2节点(IP:192.168.242.65)的 $PROCESS_NAME 进程已恢复正常运行！\n恢复时间：$current_time\"}}"
    curl -s -H "Content-Type: application/json" -d "$message" "$WEBHOOK_URL_graylog" > /dev/null
}

# 检测进程是否运行
check_process() {
    # 使用ps命令结合grep命令检测进程是否存在
     process_status=$(ps -ef | grep -v grep | grep "$PROCESS_NAME" | grep "server.conf")
    
    # 如果进程不存在
    if [ -z "$process_status" ]; then
        echo "--------------------------------"
		echo 当前时间:`date "+%Y-%m-%d %H:%M:%S"`
        echo "进程 $PROCESS_NAME 未运行"
        
        # 增加告警次数
        ALERT_COUNT=$(cat $ALERT_COUNT_FILE)
        ALERT_COUNT=$((ALERT_COUNT+1))
        echo $ALERT_COUNT > $ALERT_COUNT_FILE
        
       if [ $ALERT_COUNT -le $ALERT_THRESHOLD ]; then
        # 发送告警
             echo "--------------------------------"
             echo 当前时间:`date "+%Y-%m-%d %H:%M:%S"`
             echo AlertCount:$ALERT_COUNT
             echo "告警次数+1,发送(进程不运行)告警"
             send_alert
             echo "--------------------------------"
        fi
       
        # 如果告警次数超过3次，则不再发送告警
        if [ $ALERT_COUNT -eq $ALERT_THRESHOLD ]; then
            echo "--------------------------------"
            echo 当前时间:`date "+%Y-%m-%d %H:%M:%S"`
            echo AlertCount:$ALERT_COUNT
            echo "已达到告警次数上限次数3次，后续将不再发送告警"
            send_alert_tips
            echo "--------------------------------"
        fi
		
        if [ $ALERT_COUNT -gt $ALERT_THRESHOLD ]; then
            echo "--------------------------------"
            echo 当前时间:`date "+%Y-%m-%d %H:%M:%S"`
            echo AlertCount:$ALERT_COUNT
            echo "已超过告警次数上限次数3次，后续将不再发送告警"
            echo "--------------------------------"
            exit 0
        fi
        
        # 将进程状态标志设置为未运行
        echo 0 > $PROCESS_STATUS_FILE
    else
        # 进程存在
        echo "进程 $PROCESS_NAME 在运行"
        # 获取告警故障计数
        ALERT_COUNT=$(cat $ALERT_COUNT_FILE)         
        # 如果之前有告警且进程状态为未运行，发送恢复告警
        PROCESS_STATUS=$(cat $PROCESS_STATUS_FILE)
        if [ $ALERT_COUNT -gt 0 ] && [ $PROCESS_STATUS -eq 0 ]; then
             echo "--------------------------------"
             echo 当前时间:`date "+%Y-%m-%d %H:%M:%S"`
             echo "进程已恢复运行，发送恢复告警"
             send_recovery_alert
             echo "--------------------------------"
        fi
        # 进程存在，重置告警次数
        ALERT_COUNT=0
        echo $ALERT_COUNT > /tmp/alert_count.txt
        # 将进程状态标志设置为运行中
        echo 1 > $PROCESS_STATUS_FILE
    fi
}

# 执行检测进程的函数
check_process


