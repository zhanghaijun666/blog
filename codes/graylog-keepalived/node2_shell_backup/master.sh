#!/bin/bash
LOGFILE=/var/log/keepalived-state.log
date "+%Y-%m-%d %H:%M:%S" >> $LOGFILE
echo "[MASTER]" >> $LOGFILE
webhook_url="https://oapi.dingtalk.com/robot/send?access_token=87ab6ee5b3045a8e896222c7b8889d14dcb6ebf94ecacd759f1b737a7cef5408"
NodeIP=`(hostname -I)`
CURRENT_TIME=$(date "+%Y-%m-%d %H:%M:%S")
set_payload_file(){
cat  > /opt/payload_result.json << \EOF
{       
"msgtype": "actionCard",
"actionCard": {
"title":"GrayLog节点:【Node2】已切换成Master节点",
"text":"
##### GrayLog节点:【Node2】已切换成:<font color=#FF0000> 【Master】</font>节点 \n
>  ##### <font color=#67C23A> 【Master节点IP】</font> :<font color=#FF0000> templateIP </font> \n
>  ##### <font color=#67C23A> 【切换时间点】</font> :<font color=#FF0000> templateTime </font> \n
"
}
}
EOF
}
set_payload_file
sed -i "s^templateIP^$NodeIP^g" /opt/payload_result.json
sed -i "s^templateTime^$CURRENT_TIME^g" /opt/payload_result.json

response=$(curl -sS -H "Content-Type: application/json" -X POST -d @/opt/payload_result.json "${webhook_url}")
if [ $? -eq 0 ]; then
   echo "Alert sent successfully"
else
   echo "Failed to send alert: ${response}"
fi
