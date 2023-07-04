#!/bin/bash
set -e

function fun_print() {
	#printf "%+35s %s\n" `echo -e "$1 \033[1;32m$2\033[0m"`
	echo -e "$1 \033[1;32m\t$2\033[0m"
}

format_file_size() {
  local size=$1
  # 数值单位
  units=("B" "KB" "MB" "GB" "TB")
  # 循环计算大小并更新单位
  index=0
  while ((size > 1024)) && ((index < ${#units[@]} - 1)); do
    size=$((size / 1024))
    index=$((index + 1))
  done
  # 格式化输出
  echo "$(printf "%.2f %s" "$(bc <<< "scale=2; $size/1")" "${units[$index]}")"
}

info_cpu() {
	local cpu_leisure=$(top -b -n 1 | grep Cpu | awk '{print $8}' | cut -f 1 -d "%")
	fun_print "物理Cpu个数:" "$(sudo cat /proc/cpuinfo | grep "physical id" | uniq | wc -l)"
	fun_print "系统Cpu核数:" "$(sudo cat /proc/cpuinfo | grep "cpu cores" | uniq | awk '{print $4}')"
	fun_print "空闲CPU百分比:" "$cpu_leisure%"
  local cpu_use=$(printf "%.2f" $(echo "scale=2; 100-$cpu_leisure" | bc))
	if [ $(echo "${cpu_use} >= 80" | bc) -eq 1 ]; then
		echo -e "\033[1;31mCPU利用率过高，当前Cpu利用率: $cpu_use% \033[0m"
	fi
}

info_memory() {
	fun_print "内存总量:" "$(free -h | grep "Mem" | awk '{print $2}')"
	fun_print "内存空闲:" "$(free -h | grep "Mem" | awk '{print $4}')"
	fun_print "交换分区使用:" "$(free -h | grep "Swap" | awk '{print $3}')"

	local mem_total_kb=$(free -m | grep "Mem" | awk '{print $2}')
	local mem_used_kb=$(free -m | grep "Mem" | awk '{print $3}')
	local mem_percentage=$(echo "scale=2; $mem_used_kb/$mem_total_kb*100/1" | bc)
	if [ $(echo "${mem_percentage} > 80" | bc) -eq 1 ]; then
		echo -e "\033[1;31m内存利用率过高，当前内存利用率: ${mem_percentage}%\033[0m"
	fi
}

info_disk() {
  disk_info=$(lsblk -b)

  fun_print "硬盘数量:" "$(echo "$disk_info" | grep -c 'disk')"
  fun_print "总空间大小:" "$(format_file_size "$(echo "$disk_info" | grep  'disk' | awk '{ sum += $4 } END { print sum }')")"
  fun_print "分区数量:" "$(echo "$disk_info" | grep -c 'part')"
  # 获取分区信息并输出表头（汉字）
  printf "+------------------+--------+--------+--------+--------+\n"
  printf "| %-20s | %-8s | %-8s | %-8s | %-8s |\n" "文件系统" "总大小" "已使用" "空闲" "使用率"
  printf "+------------------+--------+--------+--------+--------+\n"
  # 使用df命令获取分区信息，并循环处理每个分区
  df -h | awk '$1 ~ /^\/dev/ { printf "| %-16s | %-6s | %-6s | %-6s | %-6s |\n", $1, $2, $3, $4, $5 }'
  # 输出表格底部
  printf "+------------------+--------+--------+--------+--------+\n"
}
