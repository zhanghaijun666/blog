# [ $(id -u) -gt 0 ] && echo "请用root用户执行此脚本！" && exit 1;

CHECK_HOME="$(cd "`dirname "$0"`"; pwd)"
RESULTFILE="$CHECK_HOME"/source-$(date +%Y%m%d%H%M%S).txt


function getSystemStatus() {
	echo ""
	echo "############################ 系统检查 ############################"
	echo " 系统：`uname -o`"
	echo " 内核：`uname -r`"
	echo " 主机名：`uname -n`"
	echo " 当前时间：`date +'%F %T'`"
	echo " 运行时间：`uptime | sed 's/.*up \([^,]*\), .*/\1/'`"
}

function getProcessStatus() {
	echo ""
	echo "############################ 进程检查 ############################"
	if [ $(ps -ef | grep defunct | grep -v grep | wc -l) -ge 1 ]; then
		echo ""
		echo "僵尸进程"
		echo "--------"
		ps -ef | head -n1
		ps -ef | grep defunct | grep -v grep
	fi
	echo ""
	echo "内存占用TOP10"
	echo "-------------"
	echo -e "PID %MEM RSS COMMAND
$(ps aux | awk '{print $2, $4, $6, $11}' | sort -k3rn | head -n 10)" | column -t
	echo ""
	echo "CPU占用TOP10"
	echo "------------"
	top b -n1 | head -17 | tail -11
}

function cpu() {
	echo ""
	echo "############################ CPU ############################"
  NUM=1
  while [ $NUM -le 3 ]; do
      util=`vmstat |awk '{if(NR==3)print 100-$15"%"}'`
      user=`vmstat |awk '{if(NR==3)print $13"%"}'`
      sys=`vmstat |awk '{if(NR==3)print $14"%"}'`
      iowait=`vmstat |awk '{if(NR==3)print $16"%"}'`
      echo "CPU - 使用率: $util , 等待磁盘IO响应使用率: $iowait"
      let NUM++
      sleep 1
  done
}

function memory() {
	echo ""
	echo "############################ 内存 ############################"
  total=`free -m |awk '{if(NR==2)printf "%.1f",$2/1024}'`
  used=`free -m |awk '{if(NR==2) printf "%.1f",($2-$NF)/1024}'`
  available=`free -m |awk '{if(NR==2) printf "%.1f",$NF/1024}'`
  echo "内存 - 总大小: ${total}G , 使用: ${used}G , 剩余: ${available}G"
}

function disk() {
	echo ""
	echo "############################ 磁盘 ############################"
  fs=$(df -h |awk '/^\/dev/{print $1}')
  for p in $fs; do
      mounted=$(df -h |awk '$1=="'$p'"{print $NF}')
      size=$(df -h |awk '$1=="'$p'"{print $2}')
      used=$(df -h |awk '$1=="'$p'"{print $3}')
      used_percent=$(df -h |awk '$1=="'$p'"{print $5}')
      echo "硬盘 - 挂载点: $mounted , 总大小: $size , 使用: $used , 使用率: $used_percent"
  done
}

getSystemStatus > $RESULTFILE
getProcessStatus >> $RESULTFILE
cpu >> $RESULTFILE
memory >> $RESULTFILE
disk >> $RESULTFILE
echo "检查结果：$RESULTFILE"
