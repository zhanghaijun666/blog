#!/bin/bash
set -e

function fun_print() {
	#printf "%+35s %s\n" `echo -e "$1 \033[1;32m$2\033[0m"`
	echo -e "$1 \033[1;32m\t$2\033[0m"
}


get_redis_mem() {
	local port=6378
	local redis_used_memory=$(redis-cli -p $port info | grep -w "used_memory")                         # 数据占用的内存(bytes)
	local redis_used_memory_human=$(redis-cli -p $port info | grep -w "used_memory_human")             # 数据占用的内存(带单位，可读性好)
	local redis_used_memory_rss=$(redis-cli -p $port info | grep -w "used_memory_rss")                 # redis占用的内存
	local redis_used_memory_peak=$(redis-cli -p $port info | grep -w "used_memory_peak")               # 占用内存峰值(bytes)
	local redis_memory_peak_human=$(redis-cli -p $port info | grep -w "used_memory_peak_human")        # 占用内存峰值(带单位，可读性好)
	local redis_used_memory_lua=$(redis-cli -p $port info | grep -w "used_memory_lua")                 # 引擎占用的内存大小(bytes)
	local redis_mem_fragmentation_ratio=$(redis-cli -p $port info | grep -w "mem_fragmentation_ratio") # 内存碎片率
	local redis_mem_allocator=$(redis-cli -p $port info | grep -w "mem_allocator")                     # redis内存分配器版本，在编译时指定的。有libc、jemalloc、tcmalloc

	echo -e "\033[1;35m#####################监控redis内存############# $time\033[0m"

	echo $redis_used_memory
	echo $redis_used_memory_human
	echo $redis_used_memory_rss
	echo $redis_used_memory_peak
	echo $redis_memory_peak_human
	echo $redis_used_memory_lua
	echo $redis_mem_fragmentation_ratio
	echo $redis_mem_allocator

	echo ""
	local used_internal_memory=$(echo ${redis_used_memory_human} | awk -F: '{print $2}')
	local used_internal_memory=${used_internal_memory%?}

	if [ "${redis_used_memory}" ] >1000; then
		if [ ${USER} != "root" ]; then
			echo -e "\033[1;31mredis数据占用内存过高，当前redis数据占用内存${used_internal_memory}\033[0m"
			echo "数据占用内存过高，当前数据占用内存${used_internal_memory}" | sudo mail -s "redis告警触发${time}" xxx@qq.com
		else
			echo -e "\033[1;31mredis数据占用内存过高，当前redis数据占用内存${used_internal_memory}\033[0m"
			echo "数据占用内存过高，当前数据占用内存${used_internal_memory}" | mail -s "redis告警触发${time}" xxx@qq.com
		fi
	fi
}
